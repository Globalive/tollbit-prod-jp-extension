#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CSVのRow 52を修正（$1%減少 → $2%減少）
"""
import csv
import shutil
from datetime import datetime

csv_path = r'C:\Users\hi-te\Downloads\tollbit_dashboard_text_translated_UTF8.csv'

# バックアップ
backup_path = csv_path.replace('.csv', f'_backup_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv')
shutil.copy2(csv_path, backup_path)
print(f'バックアップ作成: {backup_path}')

# CSVを読み込み
rows = []
with open(csv_path, 'r', encoding='utf-8', newline='') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames

    for i, row in enumerate(reader, start=1):
        # Row 52を検出
        if (row['Text'] == 'AI bots made 1.1M requests to your website, down 27.8% from the previous week' and
            '$1%減少' in row['Japanese']):

            print(f'\n[Row {i}] 修正対象を検出:')
            print(f'  Before: {row["Japanese"]}')

            # $1%減少 → $2%減少
            row['Japanese'] = row['Japanese'].replace('$1%減少', '$2%減少')

            print(f'  After:  {row["Japanese"]}')

        rows.append(row)

# CSVに書き戻し
with open(csv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f'\n✓ CSVファイルを更新しました: {csv_path}')
print(f'  Total rows: {len(rows)}')
