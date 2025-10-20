# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**TollBit 本番環境 日本語化拡張機能**は、TollBitの本番サイト（https://app.tollbit.com）を自動的に日本語化するChrome拡張機能です。

### 重要な制約
- **非公式ツール**: TollBit（運営：Novoscribe, Inc.）の公式製品ではない
- **プライベート配布のみ**: Chromeウェブストアでは公開しない
- **本番環境専用**: デモページ（navattic.com）とは別物
- **再配布禁止**: ライセンスにより第三者への配布は禁止

## プロジェクト構成

```
tollbit-prod-jp-extension/
├── manifest.json              # Chrome拡張のマニフェスト（バージョン管理）
├── content-cross-frame.js     # メインの翻訳スクリプト（1008行）
├── README.md                  # プロジェクト説明・インストール手順
├── LICENSE                    # 利用規約（Globalive独自ライセンス）
├── TollBit本番環境_日本語化拡張機能_インストール＆利用ガイド.md
└── インストールガイド.txt     # テキスト形式のガイド
```

## アーキテクチャ

### 翻訳エンジン（content-cross-frame.js）

#### 3つの翻訳辞書構造
1. **TRANSLATIONS**: 完全一致辞書（593エントリ）
   - 静的テキストの英日対訳
   - 最優先で検索

2. **PLACEHOLDER_TRANSLATIONS**: 入力フィールド用（3エントリ）
   - `placeholder`属性の翻訳専用

3. **PATTERN_TRANSLATIONS**: 正規表現パターン（15エントリ）
   - 動的な値を含むテキストに対応
   - 例: `"Updated 3 days ago"` → `"3日前に更新"`
   - 例: `"down 27.8%"` → `"27.8％減少"`

#### 翻訳処理フロー
```
1. テキストノード検出（TreeWalker API使用）
   ↓
2. 日本語が既に含まれていればスキップ（無限ループ防止）
   ↓
3. 完全一致辞書で検索（TRANSLATIONS）
   ↓
4. 末尾の句読点・スペースを除去して再検索（正規化版）
   ↓
5. 正規表現パターンマッチング（PATTERN_TRANSLATIONS）
   ↓
6. 翻訳済みノードをWeakSetに記録
```

#### クロスフレーム対応
- **all_frames: true**: manifest.jsonで全iframeに注入
- **再帰的探索**: 最大3階層までiframeを再帰処理
- **動的iframe監視**: MutationObserverで新規追加を検知
- **タイミング制御**: 段階的に9回再実行（200ms, 500ms, 1000ms... 10000ms）
- **永続監視**: 15秒間隔でトップフレームを定期的に再翻訳

#### パフォーマンス最適化
- **WeakSet**: メモリリークを防ぐため翻訳済みノード管理
- **ログ削減**: console.logは初回起動時のみ、定期監視ではコメント化
- **Cross-originエラー無視**: 異なるドメインのiframeはスキップ

## 開発ワークフロー

### バージョン更新時の必須ファイル
```bash
# 3ファイルを同時に更新する必要がある
1. manifest.json の "version"
2. content-cross-frame.js の「バージョン: X.X.X」コメント
3. README.md のバージョン履歴セクション
```

### 翻訳辞書の追加・更新

#### 完全一致辞書（TRANSLATIONS）
```javascript
// content-cross-frame.js の TRANSLATIONS オブジェクトに追加
const TRANSLATIONS = {
  "英語テキスト": "日本語翻訳",
  // 改行を含む場合は必ず \n でエスケープ
  "Multi-line\ntext": "複数行の\nテキスト",
};
```

**重要な注意事項**:
- JavaScriptオブジェクトリテラル内では実際の改行は使用できない（SyntaxError）
- 必ず `\n` でエスケープする

#### パターン辞書（PATTERN_TRANSLATIONS）
```javascript
// 正規表現パターンの追加例
const PATTERN_TRANSLATIONS = [
  {
    "pattern": "Updated (\\d+) days? ago",  // ダブルエスケープ必須
    "replacement": "$1日前に更新"
  },
];
```

**正規表現のエスケープ**:
- `\d` → `\\d` （ダブルエスケープ）
- `\.` → `\\.`
- `\s` → `\\s`

### テスト手順

#### ローカル開発モードでのテスト
```bash
# 1. Chrome拡張機能ページを開く
chrome://extensions/

# 2. デベロッパーモードを有効化

# 3. 「パッケージ化されていない拡張機能を読み込む」
# → このディレクトリを選択

# 4. 本番サイトにアクセス
https://app.tollbit.com

# 5. 翻訳を確認
# - F12で開発者ツールを開く
# - Consoleタブで "[TollBit日本語化]" のログを確認
```

#### キャッシュクリア（重要）
```bash
# コード変更後は必ずキャッシュクリア
1. chrome://extensions/ で「更新」ボタンをクリック
2. 本番サイトで Ctrl+Shift+R（Windows）/ Cmd+Shift+R（Mac）
```

### Git管理のベストプラクティス

#### コミットメッセージの命名規則
```bash
# 辞書更新
git commit -m "辞書更新: 593→600エントリに拡張（+7エントリ）"

# バグ修正
git commit -m "🐛 SyntaxError修正: 改行文字をエスケープ"

# ドキュメント更新
git commit -m "📝 ドキュメント更新: v1.2.10対応"

# リファクタリング
git commit -m "🔧 パフォーマンス改善: コンソールログ削減"

# 不要ファイル削除
git commit -m "🧹 リポジトリクリーンアップ（16ファイル削除）"
```

#### ブランチ戦略
- **master**: 本番用（常に安定版）
- フィーチャーブランチは使用しない（小規模プロジェクトのため）

## トラブルシューティング

### 翻訳が適用されない
**原因**: タイミング問題（iframe遅延読み込み）
**対策**: content-cross-frame.js の段階的再実行タイミングを調整
```javascript
const timings = [
  200, 500, 1000, 1500, 2000, 3000,
  5000, 8000, 10000  // 必要に応じて追加
];
```

### SyntaxError: Unexpected token
**原因**: 翻訳辞書内の改行文字が正しくエスケープされていない
**対策**:
```javascript
// ❌ 間違い
"Multi-line
text": "翻訳"

// ✅ 正しい
"Multi-line\ntext": "翻訳"
```

### 正規表現パターンが動作しない
**原因**: エスケープ不足
**対策**: `\d` を `\\d` にダブルエスケープ

### Chrome起動時に警告が出る
**原因**: デベロッパーモードの拡張機能に対する標準的な警告
**対策**: 警告を無視してOK（「キャンセル」をクリック）

## 配布方法

### GitHub経由（推奨）
```bash
# masterブランチのzipファイルを配布
https://github.com/Globalive/tollbit-prod-jp-extension/archive/refs/heads/master.zip
```

### 配布時の注意事項
1. **ライセンスファイルを同梱**すること
2. **インストールガイドを同梱**すること
3. **再配布禁止**を明記すること
4. **非公式ツール**であることを説明すること

## セキュリティとプライバシー

### データ収集なし
- 外部サーバーへの通信は一切行わない
- ローカルで完結する翻訳処理のみ
- ユーザー情報・閲覧履歴は収集しない

### 動作範囲の制限
- manifest.jsonの`matches`で厳密に制限
- `https://app.tollbit.com/*` のみで動作
- 他のウェブサイトには影響を与えない

### パーミッション
```json
// manifest.jsonで必要なパーミッション
{
  "content_scripts": [{
    "matches": ["https://app.tollbit.com/*"],
    "js": ["content-cross-frame.js"],
    "run_at": "document_end",
    "all_frames": true  // iframe対応のため必須
  }]
}
```

## よくある開発タスク

### 新しい翻訳エントリを追加する
```bash
# 1. content-cross-frame.js の TRANSLATIONS を編集
# 2. エントリ数をカウント（通常 + Placeholder + パターン）
# 3. バージョン番号を更新（3ファイル）
# 4. README.md のバージョン履歴に記載
# 5. コミット: "辞書更新: XXX→YYYエントリに拡張"
```

### パフォーマンスの測定
```javascript
// content-cross-frame.js 内で totalTranslations を確認
console.log(`[翻訳統計] 合計: ${totalTranslations}個`);
```

### 翻訳漏れを検出する
```javascript
// 開発者ツールのConsoleで実行
document.querySelectorAll('*').forEach(el => {
  const text = el.textContent?.trim();
  if (text && /^[A-Za-z\s]+$/.test(text) && text.length > 5) {
    console.log(text);
  }
});
```

## 関連プロジェクト

- **デモ版拡張機能**: https://github.com/Globalive/tollbit-jp-extension
  - Navatticデモページ用（別物）
  - 翻訳辞書の一部が共通

## 技術スタック

- **Manifest Version**: 3（Chrome拡張の最新仕様）
- **JavaScript**: ES6+（クラスは不使用、関数ベース）
- **APIs**:
  - TreeWalker API（DOM走査）
  - MutationObserver API（動的コンテンツ監視）
  - WeakSet（メモリ管理）
