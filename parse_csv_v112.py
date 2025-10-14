#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CSV翻訳辞書をパースしてJavaScript形式に変換
v1.1.2用
"""

import csv
import json
import re

def parse_csv(csv_path):
    """CSVファイルをパースして辞書とパターンに分類"""
    normal_translations = {}
    pattern_translations = []

    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            text = row['Text'].strip()
            japanese = row['Japanese'].strip()
            var_flag = row['変数フラグ'].strip()
            var_element = row['変数となる要素'].strip()

            # 空行をスキップ
            if not text or not japanese:
                continue

            # 変数フラグが1の場合はパターン翻訳
            if var_flag == '1' and var_element:
                pattern = create_pattern(text, var_element)
                replacement = create_replacement(japanese, var_element, text)

                pattern_translations.append({
                    'pattern': pattern,
                    'replacement': replacement,
                    'original_text': text,
                    'original_japanese': japanese,
                    'var_element': var_element
                })
            else:
                # 通常の翻訳
                normal_translations[text] = japanese

    return normal_translations, pattern_translations

def create_pattern(text, var_element):
    """英語テキストから正規表現パターンを生成"""

    # 「by以降削除」パターン
    if 'by以降' in var_element and '削除' in var_element:
        if ' by ' in text:
            # by以降（by含む）を削除
            base_pattern = text.split(' by ')[0]
            # 数字を正規表現に変換
            base_pattern = re.sub(r'\b\d+\b', r'(\\d+)', base_pattern)
            return base_pattern  # by以降は削除するのでパターンに含めない

    if var_element == '数字':
        pattern = text

        # 数字+単位（K, M, B）のパターン
        pattern = re.sub(r'\d+\.?\d*[KMB]\b', r'([\\d.]+[KMB])', pattern)

        # パーセント付き数字
        pattern = re.sub(r'\d+\.?\d*%', r'([\\d.]+)%', pattern)

        # 金額（ドル記号付き）
        pattern = re.sub(r'\$\d+\.?\d*', r'\\$([\\d.]+)', pattern)

        # 括弧内の数字
        pattern = re.sub(r'\((\d+)\)', r'\\((\\d+)\\)', pattern)

        # 単独の数字（1桁以上）
        pattern = re.sub(r'\b\d+\b', r'(\\d+)', pattern)

        # 複数形対応（days? など）
        if 'day' in pattern and 'days' in text:
            pattern = pattern.replace('days', 'days?')
        if 'Bot' in pattern and 'Bots' in text:
            pattern = pattern.replace('Bots', 'Bots?')

        return pattern

    return text

def create_replacement(japanese, var_element, original_text):
    """日本語翻訳から置換文字列を生成"""

    # 既に$1, $2などが含まれている場合はそのまま返す
    if '$1' in japanese or '$2' in japanese or '$3' in japanese:
        return japanese

    if 'by以降' in var_element and '削除' in var_element:
        # by以降は削除するので、数字だけを変数に置き換え
        replacement = japanese
        match_count = 0

        def replacer(match):
            nonlocal match_count
            match_count += 1
            return f'${match_count}'

        replacement = re.sub(r'[\d]+', replacer, replacement)
        return replacement

    if var_element == '数字':
        replacement = japanese

        # 日本語内の数字部分を $1, $2 などに置き換え
        match_count = 0

        def replacer(match):
            nonlocal match_count
            match_count += 1
            return f'${match_count}'

        # 連続する数字とドット、カンマを置き換え
        replacement = re.sub(r'[\d.,]+', replacer, replacement)

        # $ 記号が先頭にある場合は $$ にエスケープ
        if japanese.startswith('$'):
            replacement = '$' + replacement

        return replacement

    return japanese

if __name__ == '__main__':
    csv_path = r'C:\Users\hi-te\Downloads\tollbit_dashboard_text_translated_UTF8.csv'

    print('CSVファイルをパース中...')
    normal_translations, pattern_translations = parse_csv(csv_path)

    print(f'通常翻訳: {len(normal_translations)} 個')
    print(f'パターン翻訳: {len(pattern_translations)} 個')
    print(f'合計: {len(normal_translations) + len(pattern_translations)} 個')

    # 結果を一時ファイルに保存
    with open('translations_data.json', 'w', encoding='utf-8') as f:
        json.dump({
            'normal': normal_translations,
            'patterns': pattern_translations
        }, f, ensure_ascii=False, indent=2)

    print('[OK] translations_data.json に保存しました')
