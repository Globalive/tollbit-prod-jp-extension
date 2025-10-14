#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
改行文字エスケープのテスト（TDD）
"""

import json

def test_escape_for_javascript():
    """JavaScriptの文字列リテラル用エスケープのテスト"""

    # テストケース1: 改行を含むJSON文字列
    json_data = {
        "key_with_newline": "これは1行目。\nこれは2行目。"
    }

    # JSONとして保存・読み込み
    with open('test_temp.json', 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)

    with open('test_temp.json', 'r', encoding='utf-8') as f:
        loaded_data = json.load(f)

    value = loaded_data["key_with_newline"]
    print(f"Loaded value: {repr(value)}")
    print(f"Contains actual newline char: {chr(10) in value}")

    # エスケープ処理（現在のコード）
    value_escaped_old = value.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    print(f"\nOld escape method: {repr(value_escaped_old)}")

    # 正しいJavaScript文字列
    js_string_old = f'  "{value_escaped_old}"'
    print(f"JavaScript string (old): {js_string_old}")

    # エスケープ処理（修正版）
    value_escaped_new = (value
        .replace('\\', '\\\\')  # バックスラッシュを先にエスケープ
        .replace('\n', '\\n')   # 改行文字を\\nに
        .replace('\r', '\\r')   # キャリッジリターンも
        .replace('\t', '\\t')   # タブも
        .replace('"', '\\"')    # ダブルクォート
    )
    print(f"\nNew escape method: {repr(value_escaped_new)}")

    # 正しいJavaScript文字列
    js_string_new = f'  "{value_escaped_new}"'
    print(f"JavaScript string (new): {js_string_new}")

    # テスト: JavaScriptとして評価可能か（構文チェック）
    # 実際のJavaScriptの文字列リテラルとして正しいか
    expected_js = '  "これは1行目。\\nこれは2行目。"'
    assert js_string_new == expected_js, f"Expected: {expected_js}, Got: {js_string_new}"

    print("\n✅ Test PASSED!")

    # クリーンアップ
    import os
    os.remove('test_temp.json')

if __name__ == '__main__':
    test_escape_for_javascript()
