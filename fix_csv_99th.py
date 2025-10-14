#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CSVのRow 292（99th）を修正
通常翻訳 → パターン翻訳へ
"""
import csv
import shutil
from datetime import datetime

csv_path = r'C:\Users\hi-te\Downloads\tollbit_dashboard_text_translated_UTF8.csv'

# バックアップ
backup_path = csv_path.replace('.csv', f'_backup_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv')
shutil.copy2(csv_path, backup_path)
print(f'Backup created: {backup_path}')

# CSVを読み込み
rows = []
with open(csv_path, 'r', encoding='utf-8', newline='') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames

    for i, row in enumerate(reader, start=1):
        # Row 292: 99th を検出
        if row['Text'] == '99th':
            print(f'\n[Row {i}] Found 99th entry:')
            print(f'  Before:')
            print(f'    Text: {row["Text"]}')
            print(f'    Japanese: {row["Japanese"]}')
            print(f'    Flag: "{row["変数フラグ"]}"')
            print(f'    Element: "{row["変数となる要素"]}"')

            # 変数フラグを設定
            row['変数フラグ'] = '1'
            row['変数となる要素'] = '数字'

            print(f'  After:')
            print(f'    Flag: "{row["変数フラグ"]}"')
            print(f'    Element: "{row["変数となる要素"]}"')

        rows.append(row)

# CSVに書き戻し
with open(csv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f'\nCSV file updated: {csv_path}')
print(f'Total rows: {len(rows)}')
