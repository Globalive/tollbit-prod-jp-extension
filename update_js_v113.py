#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
content-cross-frame.jsを更新（v1.1.3用）
"""

import json
import re

def update_content_script(js_path, translations_data):
    """JavaScriptファイルを更新"""

    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # TRANSLATIONSオブジェクトを生成
    translations_js = "const TRANSLATIONS = {\n"
    for key, value in sorted(translations_data['normal'].items()):
        # キーと値をエスケープ
        key_escaped = key.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        value_escaped = value.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        translations_js += f'  "{key_escaped}": "{value_escaped}",\n'
    translations_js = translations_js.rstrip(',\n') + '\n};\n'

    # PATTERN_TRANSLATIONSを生成
    pattern_js = "const PATTERN_TRANSLATIONS = [\n"
    for pattern in translations_data['patterns']:
        pattern_escaped = pattern['pattern'].replace('\\', '\\\\').replace('"', '\\"')
        replacement_escaped = pattern['replacement'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        pattern_js += f'  {{\n'
        pattern_js += f'    "pattern": "{pattern_escaped}",\n'
        pattern_js += f'    "replacement": "{replacement_escaped}"\n'
        pattern_js += f'  }},\n'
    pattern_js = pattern_js.rstrip(',\n') + '\n];\n'

    # バージョン情報を更新
    entry_count = len(translations_data['normal']) + len(translations_data['patterns'])
    version_comment = f"""/**
 * TollBit 本番環境 日本語化拡張機能
 * バージョン: 1.2.0
 *
 * 動的に生成されるiframeにも対応
 * topフレームから全てのiframeにアクセスして翻訳
 * 変数を含むテキスト（正規表現パターン）にも対応
 * 分割されたテキストにも対応（{entry_count}エントリ）
 * 末尾の句読点・スペースを除去して辞書検索
 * by以降削除対応
 * パターンマッチングロジック修正（trimmed使用）
 */"""

    # ファイル全体を置き換え
    # まずヘッダーコメントを置換
    content = re.sub(
        r'/\*\*\s*\n.*?TollBit 本番環境 日本語化拡張機能.*?\*/',
        version_comment,
        content,
        flags=re.DOTALL
    )

    # console.logを更新
    content = re.sub(
        r"console\.log\('\[TollBit日本語化\].*?\);",
        f"console.log('[TollBit日本語化] 本番環境版 v1.2.0 - パターンマッチング修正（{entry_count}エントリ）');",
        content
    )

    # TRANSLATIONSを置換
    content = re.sub(
        r'const TRANSLATIONS = \{.*?\};',
        translations_js.rstrip('\n'),
        content,
        flags=re.DOTALL
    )

    # PATTERN_TRANSLATIONSを置換
    content = re.sub(
        r'const PATTERN_TRANSLATIONS = \[.*?\];',
        pattern_js.rstrip('\n'),
        content,
        flags=re.DOTALL
    )

    # ファイルに書き込み
    with open(js_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)

    print(f'[OK] {js_path} を更新しました')
    print(f'  通常翻訳: {len(translations_data["normal"])} 個')
    print(f'  パターン翻訳: {len(translations_data["patterns"])} 個')
    print(f'  合計: {len(translations_data["normal"]) + len(translations_data["patterns"])} 個')

if __name__ == '__main__':
    # translations_data.jsonを読み込み
    with open('translations_data.json', 'r', encoding='utf-8') as f:
        translations_data = json.load(f)

    # JavaScriptファイルを更新
    update_content_script('content-cross-frame.js', translations_data)
