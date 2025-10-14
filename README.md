# TollBit 本番環境 日本語化拡張機能

TollBit本番サイトを日本語化するChrome拡張機能です。

## 概要

この拡張機能は以下のTollBit本番サイトを日本語化します：
- https://app.tollbit.com/* （本番環境専用）

## 特徴

- **直接DOM書き換え方式**: 本番サイトのコンテンツを確実に翻訳
- **chrome.storage不要**: 翻訳辞書をコードに直接埋め込み
- **221エントリの翻訳辞書**: デモ版と同じ翻訳辞書を使用
- **動的コンテンツ対応**: MutationObserverによるSPA対応
- **クロスフレーム対応**: 複数のiframe階層を再帰的に処理
- **軽量・高速**: シンプルな実装で確実に動作

## インストール方法

### 開発者モードでのインストール

1. Chromeで `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このディレクトリ（tollbit-prod-jp-extension）を選択

## 使い方

### 基本的な使い方

1. 拡張機能をインストール
2. TollBit本番サイト（https://app.tollbit.com）にアクセス
3. 自動的に日本語化されます

## 注意事項

### 重要：必ずお読みください

#### 非公式ツールについて

- **TollBit（運営：Novoscribe, Inc.）の公式製品ではありません**
  - 本拡張機能は、Globaliveが独自に開発したサードパーティ製品です
  - Novoscribe, Inc.により承認、後援、またはその他の形で関連付けられているものではありません

- **本番環境専用**
  - 本拡張機能は、TollBit本番サイト用に開発されています
  - デモページ（navattic.com）では動作しません

#### プライバシーとセキュリティ

- **個人情報の収集なし**
  - 本拡張機能は、個人情報を一切収集しません
  - 閲覧履歴の収集なし
  - 外部サーバーへのデータ送信なし
  - 完全にローカルで動作します

- **動作範囲の制限**
  - TollBit本番サイト（`https://app.tollbit.com/*`）でのみ動作
  - 他のウェブサイト（デモページを含む）には影響を与えません
  - DOM操作のみで、ネットワーク通信は行いません

#### 商標について

- **「TollBit」はNovoscribe, Inc.の商標です**
  - 本拡張機能の使用は、Novoscribe, Inc.の商標権を侵害するものではありません

#### サポートと責任

- **無保証**
  - 本ソフトウェアは「現状のまま」で提供されます
  - 明示的または黙示的な保証は一切ありません

- **サポート**
  - 配布元の担当者までお問い合わせください

#### 配布について

- **再配布禁止**
  - 本拡張機能のソースコード、バイナリ、またはその一部を第三者に配布することは禁止されています
  - プライベートリポジトリ専用

- **改変禁止**
  - ソースコードの改変、修正、変更は禁止されています

- **商用利用禁止**
  - 本拡張機能を販売すること、商用サービスの一部として提供することは禁止されています

## ライセンス

本拡張機能は、Globaliveが開発したプライベートソフトウェアです。

詳細は [LICENSE](LICENSE) ファイルをご確認ください。

### 要約

- ✅ 組織内使用は許可
- ❌ 再配布禁止
- ❌ 改変禁止
- ❌ 商用利用禁止
- ⚠️ 無保証・免責事項あり

## バージョン履歴

### v1.1.4 (2025-10-14) 📝 辞書更新（382エントリ）
- 📝 **新規追加エントリ（4個）**
  - "Properties" → "サイト一覧"
  - "API Access" → "APIアクセス"
  - "Updated" → "更新："
  - "55 days ago" → "$1日前"（パターン翻訳）
- 📊 翻訳辞書を382エントリに拡充（通常368個 + パターン14個）

### v1.1.3 (2025-10-14) 🐛 SyntaxError修正
- 🐛 **SyntaxError修正**: JavaScriptオブジェクトリテラル内の改行文字をエスケープ
  - 4箇所で実際の改行が含まれていた問題を `\n` に修正
  - "Customize rates further..." の翻訳（行122-123）
  - "Define Global Rates for..." の翻訳（行127-128）
  - "The Full Display Content License..." の翻訳（行293）
  - "The Summarization Content License..." の翻訳（行294）
- 🔧 manifest.json: 1.1.2 → 1.1.3（キャッシュクリア用）

### v1.1.2 (2025-10-14) 🚀 大幅更新（378エントリ）
- 📝 **新規追加エントリ（56個）**
  - トランザクション関連：
    * "Transactions" → "トランザクション"
    * "Total Transactions" → "合計トランザクション数"
    * "Cumulative Growth" → "累積成長"
    * "Monthly Spend" → "月間支出"
    * "1 Day", "1 Week", "1 Month" → 期間選択オプション
  - コンテンツフィルタ作成：
    * "create an element filter" → "要素フィルタを作成"
    * "create an article filter" → "記事フィルタを作成"
    * "Tag", "Attribute", "Value" → タグ、属性、値
  - サブドメイン管理：
    * "Your subdomain is not active." → "あなたのサブドメインは有効化されていません。"
    * "Reach out to team@tollbit.com to activate your subdomain." → "サブドメインを有効化するには、team@tollbit.com にお問い合わせください。"
  - パス設定関連：
    * "Path Prefix" → "パスプレフィックス"
    * "Rate Limit" → "レート制限"
    * "Add Bot Rate" → "ボットの価格を追加"
  - テスト機能：
    * "Test your property's bot forwarding functionality based on popular bot user agents." → "人気のあるボットのユーザーエージェントに基づいて、あなたのサイトのボット転送機能をテストできます。"
  - NLWeb詳細設定：
    * "NLWeb is a protocol that aims to simplify..." → 詳細な説明文
    * エンドポイントとクエリパラメータの説明文
  - A2Aプロトコル説明：
    * "Agent2Agent (A2A) protocol is an open standard..." → 詳細な説明文
    * インスペクターの使い方に関する説明文
- 📊 翻訳辞書を378エントリに拡充（通常365個 + パターン13個）

### v1.1.1 (2025-10-14) ➕ 追加更新（322エントリ）
- 📝 **新規追加エントリ（20個）**
  - 価格設定関連：
    * "Price per User Agent" → "ユーザーエージェントごとの価格"
    * "Independently manage the access rates for specific AI bots and User Agents." → "特定のAIボットやユーザーエージェントごとに価格を個別に管理します。"
    * "Add a Bot Rate" → "ボットごとの価格を追加"
    * "Add Rate" → "価格を追加"
  - ボットブロック管理：
    * "Manage Bot Blocking" → "ボットブロックの管理"
    * "Block specific bots from accessing your property." → "特定のボットがあなたのサイトにアクセスするのをブロックします。"
    * "Add user agents to block or allow." → "ブロックまたは許可するユーザーエージェントを追加します。"
    * "Block User Agents" → "ユーザーエージェントをブロック"
    * "No user agents selected" → "ユーザーエージェントが選択されていません"
    * "Block List" → "ブロックリスト"
  - ページ単位の価格設定：
    * "Specific Page Access" → "特定ページへのアクセス設定"
    * "Fine grain control over access rates for specific pages." → "特定のページに対する価格を細かく制御します。"
    * "No Page Rates" → "ページ単位の価格設定はありません"
    * "Add Page Rate" → "ページ単位の価格を追加"
    * "Page Path" → "ページパス"
  - 時間変動価格：
    * "Determine how the price of content changes after it is uploaded" → "コンテンツがアップロードされた後の経過時間に応じて価格がどのように変化するかを設定します。"
    * "No Time Rates" → "時間変動価格は設定されていません"
    * "Add Time Rate" → "時間ごとの価格を追加"
    * "Starting Price per 1,000 pages" → "開始価格"
    * "Create Time Pricing" → "時間変動型の価格設定を作成"
- 📊 翻訳辞書を322エントリに拡充（通常309個 + パターン13個）

### v1.1.0 (2025-10-14) 🚀 大幅更新（302エントリ）
- 📝 **新規追加エントリ（26個）**
  - 「Activate」→「有効化」、「Deactivate」→「無効化」
  - 「Shows what percentage of your AI traffic comes from this specific bot compared to other publishers.」→「他のサイトと比較して、あなたのサイトでは、AIトラフィックのうちどのくらいの割合がこの特定のボットから来ているかを示しています。」
  - 「Calculation: (This bot's hits ÷ Your total AI traffic) x 100 = Bot traffic %」→「計算式：（このボットのトラフィック数 ÷ あなたのサイトでのAIトラフィックの総数） × 100 ＝ ボットトラフィックの割合（％）」
  - 「You have more AI traffic from this bot than」→「あなたのサイトは、このボットからのAIトラフィックが多く、他の」
  - 「of other publishers」→「サイトよりも多いです。」
  - 「99th」→「$1%の」（パーセンタイル表示）
  - 「Add rates to your content based on the website structure.」→「サイトの構造に基づいて、コンテンツに価格を設定してください。」
  - ライセンス関連の詳細説明文（要約用ライセンス、全文表示ライセンス）
  - 価格設定関連の詳細説明文（統一価格、カスタム価格、高度な設定）
  - 「Read the docs →」→「ドキュメントを確認する」
  - 「Current Directory」→「現在のディレクトリ」
  - 「Subdirectories」→「ディレクトリ」
  - その他、設定画面の詳細テキスト
- 📊 翻訳辞書を302エントリに拡充（通常289個 + パターン13個）
- 🐛 小さな翻訳修正
  - 「Full Display License」→「全文表示ライセンス」（「完全表示ライセンス」から変更）

### v1.0.9 (2025-10-14) 🔧 by以降削除対応（276エントリ）
- 🔧 **by以降削除パターンの実装**
  - 「only 2% of websites were scraped more by [bot-name]」→ ボット名削除、「$1％に位置しています。」に翻訳
  - 「no websites were scraped more by [bot-name]」→ ボット名削除、「どのサイトよりも多く、このAIボットにクロールされています。」に翻訳
  - パターンを `only (\d+)% of websites were scraped more` に変更（`by .*?` を削除）
  - パターンを `no websites were scraped more` に変更（`by .*?` を削除）
- 📝 新規追加エントリ（3個）
  - 「per page」→「ページごとの表示」
  - 「decreased to」→「は減少傾向に向かっていて、その数、」
  - 「increased to」→「は増加傾向に向かっていて、その数、」
- 📊 翻訳の改善
  - 「AI Bot scrapes ordered by total request count.」→「AIボットの総クローリング数（降順）」に変更
  - 「Total AI Bot scrapes」→「AIボットの総クローリング数」に変更
- 📊 翻訳辞書を276エントリに拡充（通常263個 + パターン13個）
- 🐛 重複パターン削除（「You receive more traffic from this bot than 98% of other publishers.」を削除）

### v1.0.8 (2025-10-14) ✅ パターン翻訳修正完了（273エントリ）
- 🔧 **重要な修正：欠落していたパターンを追加**
  - 「down ([\\d.]+)%」→ $1％減少
  - 「up ([\\d.]+)%」→ $1％増加
  - 「only X% of websites were scraped more by [bot-name]」→ ボット名保持
  - 「no websites were scraped more by [bot-name]」→ ボット名保持
  - 「You receive more traffic from this bot than X% of other publishers.」→ 変数対応
- 📝 v1.0.7で追加したつもりだったが、実際にはJavaScriptファイルに反映されていなかった
- 🎯 これで`down 27.8%`が正しく「27.8％減少」と翻訳される

### v1.0.7 (2025-10-14) 🐛 パターン翻訳修正（273エントリ）
- 🔧 増減率パターンの修正
  - 「down 27.8%」→ `$1％減少` に修正（正しく変数置換されるように）
  - 「up 27.8%」→ `$1％増加` に修正（正しく変数置換されるように）
- 📝 新規追加エントリ（7個）
  - 期間表示: 「times」「three months」「six months」「week」
  - データ注意書き: 「Data includes only fully processed days...」
  - 特別なケース: 「You receive more traffic from this bot than 100% of other publishers.」
  - パターン: 「You receive more traffic from this bot than 97% of other publishers.」
- 📊 翻訳辞書を273エントリに拡充（通常261個 + パターン12個）

### v1.0.6 (2025-10-14) 🚀 翻訳辞書大幅更新（266エントリ）
- 📝 翻訳辞書を266エントリに大幅拡充（通常255個 + パターン11個）
- 🆕 新規追加エントリ（51個）
  - ナビゲーション: 「Home」「Organization Home」「Property:」「Logout」
  - 期間指定: 「2D」「Last month」「Last three months」「Last six months」
  - 分割テキスト: 「AI bots made」「to your website,」「from previous」など
  - 詳細メトリクス: 「percentile」「of AI traffic」「initiated」「and made up」
  - ページ分析: 「Most-scraped pages」「Top 5 Pages」「Your homepage」「was scraped the most.」
  - リファラル: 「Referral traffic」「AI companies brought」「over the last」「from the previous period」
  - スクレイプ比率: 「Scrape-to-referral ratio」「For every」「scrapes you get 1 AI referral」
  - 上位事業者: 「Top referrers」「was the top referrer with」
- 🔄 新規パターン翻訳（4個）
  - 「down 27.8%」→ 変数対応の減少率パターン
  - 「up 27.8%」→ 変数対応の増加率パターン
  - 「only 2% of websites were scraped more by [bot-name]」→ ボット名を保持したまま翻訳
  - 「no websites were scraped more by [bot-name]」→ ボット名を保持したまま翻訳
- 📊 翻訳の改善
  - 「You have more AI traffic than」「You receive more traffic from AI bots than」を明確に区別
  - 「of other publishers on TollBit」と「of other publishers.」を分離
  - より自然な日本語表現に改善

### v1.0.5 (2025-10-14) 📚 翻訳辞書更新（215エントリ）
- 📝 翻訳辞書を215エントリに拡充（通常208個 + パターン7個）
- 🆕 新規追加エントリ（11個）
  - Bot Paywall関連: 「Blocked」「Allowed」「Partially Forwarded」
  - 説明文: 「Bots that are not allowed...」「Bots that are allowed...」「There may be an issue...」
  - Analytics: 「AI Bot scrapes ordered by total request count.」「Total AI Bot scrapes」「scrapes」
  - Metrics: 「How many human visits...」「Percentile Metrics」
- 📊 翻訳の詳細化
  - 「of other publishers on TollBit」の説明をより詳しく更新

### v1.0.4 (2025-10-14) 📝 末尾句読点対応
- 🔤 末尾の句読点・スペースを除去して辞書検索
  - 「How many human visitors AI platforms are sending you.」→「How many human visitors AI platforms are sending you」として検索
  - 辞書に句読点なしで登録されていても、末尾に句読点がある文を翻訳可能
- ⚡ 処理順序の最適化
  1. 完全一致（句読点込み）
  2. 正規化版（句読点除去）で検索
  3. パターンマッチング

### v1.0.3 (2025-10-14) 🔄 分割テキスト対応
- 📝 翻訳辞書を203エントリに拡充（通常196個 + パターン7個）
- 🧩 複数のテキストノードに分割された文章にも対応
  - 「You have more AI traffic than」「98%」「of other publishers on TollBit」が分割されていても翻訳可能
  - 「Which bots are being forwarded or not.」「See the docs」「for your CDN provider...」など
- 📊 新規追加エントリ（22個）
  - リファラル関連: 「Referers」「Total referrals」「referrals」
  - ベンチマーク: 「You have more AI traffic than」「of other publishers on TollBit」
  - メンバー招待: 「Invite your team」「Send invitations」
  - その他: 「1W」「1M」「3M」「6M」「Main site」「subdomain」など

### v1.0.2 (2025-10-14) 🎨 翻訳辞書大幅更新
- 📝 管理画面UI向けの翻訳辞書を181エントリに拡充（通常174個 + パターン7個）
- 🔢 変数を含むテキストの翻訳に対応（正規表現パターンマッチング実装）
- 🎯 本番環境の管理画面（Settings, Analytics, Rates等）を完全日本語化

### v1.0.1 (2025-10-14) 🔧 URL修正
- 🎯 動作対象をhttps://app.tollbit.com/* に変更（サブドメイン対応）

### v1.0.0 (2025-10-14) 🎉 初回リリース
- 🚀 TollBit本番環境用の日本語化拡張機能を作成
- 📝 デモ版（v3.6.9）の翻訳辞書（221エントリ）を使用
- 🎯 https://app.tollbit.com/* でのみ動作
- 📦 プライベートリポジトリとして管理

## 関連リンク

- **GitHubリポジトリ**: https://github.com/Globalive/tollbit-prod-jp-extension
- **TollBit本番サイト**: https://app.tollbit.com
- **デモ版拡張機能**: https://github.com/Globalive/tollbit-jp-extension
