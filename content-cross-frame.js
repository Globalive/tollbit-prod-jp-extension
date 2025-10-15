/**
 * TollBit 本番環境 日本語化拡張機能
 * バージョン: 1.2.10
 *
 * 動的に生成されるiframeにも対応
 * topフレームから全てのiframeにアクセスして翻訳
 * 変数を含むテキスト（正規表現パターン）にも対応
 * 分割されたテキストにも対応（541エントリ: 通常523 + Placeholder3 + パターン15）
 * 末尾の句読点・スペースを除去して辞書検索
 * by以降削除対応
 * パターンマッチングロジック修正（trimmed使用）
 * 改行エスケープエラー修正完了
 * Placeholder文字コード修正完了（ellipsis → three dots）
 * 正規表現パターン修正完了（ダブルエスケープ適用）
 * コンソールログ削減完了（定期監視15秒間隔）
 */

(function() {
  'use strict';

  console.log('[TollBit日本語化] 本番環境版 v1.2.10 - 辞書更新完了（520エントリ）');

  // 通常の翻訳辞書（完全一致）
  const TRANSLATIONS = {
  "\"generate\" will return the list plus an answer to the query based on the documents.": "\"generate\"：リストに加えて、ドキュメントに基づくクエリへの回答を返します。",
  "\"list\" will simply return a list of documents that match the query.": "\"list\"：クエリに一致するドキュメントのリストのみを返します。",
  "\"summarize\" will return a list plus a summary of the contents of the docs.": "\"summarize\"：リストに加えて各ドキュメントの内容の要約を返します。",
  "#NAME?": "Attribute（属性）のペアを追加する",
  "), you will need to set your worker route to just": "）、ワーカーのルートを次のように設定する必要があります。",
  "*.<your_site.com>/*": "*. <your_site.com> /*",
  "+ Add Attribute Pair": "ペアを追加する",
  ", or a custom path if you only want to forward logs for certain URL patterns. Under workers, choose the worker that you just created.": "特定URLのみ転送する場合はカスタムパスを指定します。作成したワーカーを選択する。",
  ". Add a new header value with the key": "新しいヘッダー値を追加し、キー：",
  ". Clicking": "。",
  ". Follow": "こちらの",
  ". Follow the instructions for starting the inspector, and for the Agent Card URL use": "インスペクターの起動手順に従い、Agent Card URLには次を使用してください：",
  ". The endpoint url that you should be streaming to is": "ストリーミング先のエンドポイントURLは次の通りです。",
  ". These bots are not being forwarded to your Tollbit subdomain. To change a bots status": "これらのボットはTollbit サブドメインに転送されていません。設定を変更するには",
  ". To change a bots status": "。設定を変更するには、",
  "1 Day": "1日",
  "1 Month": "1か月",
  "1 Week": "1週間",
  "1 Year": "1年",
  "1. CloudFlare Enterprise": "1. CloudFlareエンタープライズ",
  "1. Create a Stream with DataStream 2": "1. DataStream 2 を使用してストリームを作成",
  "1. Create a new Logging Configuration": "1. 新しいログ設定を作成する",
  "1. Put this text string into a TXT DNS record for your top level domain.": "1. このテキスト文字列をトップレベルドメインのTXT DNSレコードに追加してください。",
  "1. Verify Domain Ownership": "1. ドメイン所有権を確認する",
  "1000?per page": "1000件ごとの表示",
  "1M": "1ヶ月",
  "1W": "1週間",
  "2. Choose Data Parameters": "2. データパラメータを選択",
  "2. Configure Analytics Integration": "2. アナリティクス統合を設定する",
  "2. Configure your logs to be sent to our logging endpoint": "2. ログを当社のログエンドポイントに送信するよう設定します。",
  "2. Create new Worker": "2. 新しいワーカーを作成",
  "2. Create your": "2. 次のサブドメインを作成し、",
  "2D": "2日",
  "3 Months": "3か月",
  "3. Edit worker code": "3. ワーカーコードを編集",
  "3. Ensure that your Requests are Authenticated": "3. リクエストが認証されていることを確認する",
  "3. Stream to Endpoint": "3. エンドポイントにストリームを送信",
  "3M": "3ヶ月",
  "4. Link worker to CloudFlare HTTP Logs": "4. CloudFlare HTTPログにワーカーをリンク",
  "6 Months": "6か月",
  "6M": "6ヶ月",
  ": The values here are \"list\", \"summarize\", and \"generate\".": "：ここで使用できる値は「list」「summarize」「generate」です。",
  ": This is optional. NLWeb streams results back via SSE by default. If you want to disable streaming, set the “streaming” query param equal to “false”.": "：これは任意項目です。NLWebはデフォルトでSSEを介して結果をストリーム配信します。ストリーミングを無効にするには、“streaming”クエリパラメータを“false”に設定してください。",
  ": This is required, and is the natural language query that you want to ask the website to get content back and your query answered based on that content.": "：これは必須項目です。ウェブサイトに自然言語で質問し、コンテンツを取得してその内容に基づいて回答を得るためのクエリです。",
  "A Full Display License allows AI to access your content for the purpose of display. This includes generating text for a website, voice assistant, or other digital platform.": "完全表示ライセンスは表示目的でAI事業社があなたのコンテンツにアクセスすることを許可します。ウェブサイトや音声アシスタントなどでテキストを生成することが含まれます。",
  "A Summarization License allows AI to access your content for the purpose of summarization. They can extract a few relevant sentences to compile a new text piece on a website, in an app, or on other digital platforms.": "要約ライセンスは、要約目的でAI事業社があなたのコンテンツにアクセスすることを許可します。ウェブサイトやアプリなどで新しいテキストを作成するために関連する文を抽出することができます。",
  "A detailed ledger of recent transactions for your property.": "サイトに関する最近のトランザクションの詳細です。",
  "A snapshot of your website's AI bot traffic, excluding robots.txt visits and traffic forwarded to your TollBit subdomain.": "robots.txt訪問とTollBitサブドメインへ転送されたトラフィックを除いた、あなたのウェブサイトへのAIボットトラフィックのスナップショットです。",
  "A summary of all transactions for your property. You can view them by cumulative growth over time or by the month to month spend.": "あなたのサイトに関するすべてのトランザクションの概要です。累積の実績、または月次の実績を期間別に表示できます。",
  "A2A": "A2A (Agent2Agent)",
  "AI Agents": "AIエージェント",
  "AI Bot Traffic": "AIボットトラフィック",
  "AI Bot scrapes ordered by total request count.": "AIボットの総クローリング数（降順）",
  "AI Bot scrapes ordered by total request.": "AIボットクローリング数（降順）",
  "AI Bots": "AIボット",
  "AI Platform": "AIプラットフォーム",
  "AI bot scrapes": "AIボットのクロール数",
  "AI bots made": "AIボットのクロールは",
  "AI companies brought": "AI事業社は前期間とくらべて、",
  "AI companies sending the most traffic to your site.": "あなたのサイトにリファラルをもたらす上位AI事業社",
  "API Access": "APIアクセス",
  "Access": "アクセス",
  "Account": "アカウント",
  "Action": "アクション",
  "Actions": "操作",
  "Activate": "有効化",
  "Activate the Rates You Need": "必要な価格設定を有効化しましょう",
  "Activate the Rates You Need / Set Up Each Type Below": "必要な価格を有効化 / 各タイプを以下で設定",
  "Active devices": "アクティブなデバイス",
  "Add": "追加",
  "Add Bot Rate": "ボット価格を追加",
  "Add Directory Rate": "ディレクトリごとの価格を追加",
  "Add Page Rate": "ページ単位の価格を追加",
  "Add Property": "サイトを追加",
  "Add Rate": "価格を追加",
  "Add TXT records to your DNS settings": "DNS設定にTXTレコードを追加してください",
  "Add Time Rate": "時間ごとの価格を追加",
  "Add URL Paths and Prefixes as individual lines. Any URL requested that contains these lines as prefixes will be blocked.": "URLパスやプレフィックスを 1 行ずつ追加してください。これらの行をプレフィックスとして含む URLへのリクエストはすべてブロックされます。",
  "Add a Bot Rate": "ボットごとの価格を追加",
  "Add and select a property to get started monetizing your content.": "コンテンツの収益化を始めるには、サイトを追加して選択してください。",
  "Add email address": "メールアドレスを追加",
  "Add filter": "フィルターを追加",
  "Add rates": "価格設定を追加",
  "Add rates to your content based on the website structure.": "サイトの構造に基づいて、コンテンツに価格を設定してください。",
  "Add user agents to block or allow.": "ブロックまたは許可するユーザーエージェントを追加します。",
  "Agent2Agent (A2A) protocol": "Agent2Agent (A2A)プロトコル",
  "Agent2Agent is an open standard for AI agents to collaborate securely without sharing internal logic. It allows AI agents to discover capabilities, negotiate interactions, and work together seamlessly over HTTP.": "Agent2Agentは、AIエージェント同士が内部ロジックを共有せずに安全にコラボレーションするためのオープンスタンダードです。AIエージェントが機能を発見し、相互作用を交渉し、HTTP上でシームレスに動作することを可能にします。",
  "All": "全て",
  "All AI User Agents": "全てのAIユーザーエージェント",
  "All Bots": "すべてのボット",
  "Allow for your logs to be streamed.": "ログのストリーミングを許可します。",
  "Allowed": "許可済み",
  "Analytics": "アナリティクス",
  "Analytics Integration": "アナリティクスのインテグレーション",
  "Analytics for bots that are": "あなたのサイトに来ているボットの分析情報です。これらのボットは次の対象ドメインに対してアクセスが",
  "Analytics for bots that are being forwarded to your Tollbit subdomain. These bots are": "あなたのTollbit サブドメインに転送されているボットの分析情報です。これらのボットは次の対象ドメインに対してアクセスが",
  "Analytics setup verification pending": "アナリティクス設定の確認を保留中",
  "Analyze the response of your content sites from the perspective of a bot": "ボットの視点からあなたのコンテンツサイトのレスポンスを分析",
  "Article Filters": "記事フィルター",
  "Attribute": "Attribute（属性）",
  "Authentication your requests": "リクエストの認証設定",
  "Base URL recieved the request.": "ベースURLがリクエストを受信しました。",
  "Before continuing...": "続行する前に...",
  "Before you can access analytics we need to properly integrate TollBit with your website": "アナリティクスにアクセスする前に、TollBitをあなたのウェブサイトに正しくインテグレーションする必要があります",
  "Before you can publish your rates, receive transactions, or get analytics, we need to verify that you own": "価格設定を行ったり、トランザクションを受け取ったり、アナリティクス機能を利用したりする前に、あなたがこのドメインを所有していることを確認する必要があります。",
  "Benchmarking": "ベンチマーク",
  "Block All Bots": "すべてのボットをブロック",
  "Block List": "ブロックリスト",
  "Block User Agents": "ユーザーエージェントをブロック",
  "Block specific bots from accessing your property.": "特定のボットがあなたのサイトにアクセスするのをブロックします。",
  "Blocked": "ブロック済み",
  "Bot": "ボット",
  "Bot Activity": "ボットアクティビティ",
  "Bot Forwarding": "ボットの転送",
  "Bot Paywall": "ボットペイウォール",
  "Bot Status": "ボットステータス",
  "Bot View": "ボットビュー",
  "Bots that are allowed to access and scrape to your main site.": "メインサイトへのアクセスやスクレイピングが許可されているボットです。",
  "Bots that are not allowed to access or scrape your main site. They are forwarded to your Tollbit subdomain.": "メインサイトへのアクセスやクローリングが許可されていないボットです。これらはあなたのTollbitサブドメインへ転送されます。",
  "Breakdown by AI platform:": "AIプラットフォーム別の内訳",
  "Breakdown by bot": "ボット別内訳",
  "By clicking Activate, you agree to the": "「有効化」をクリックすることで、",
  "By working with TollBit, we're creating": "TollBitと協力することで、我々は",
  "CDN services routed the request to TollBit.": "CDNがその受信したリクエストをTollBitに転送しました。",
  "Calculation: (This bot's hits ÷ Your total AI traffic) x 100 = Bot traffic %": "計算式：（このボットのトラフィック数 ÷ あなたのサイトでのAIトラフィックの総数） × 100 ＝ ボットトラフィックの割合（％）",
  "Check to make sure your logs are streaming to": "ログが正しく送信されていることを確認してください。",
  "Choose Data Parameters": "データパラメータを選択",
  "Choose a page and a bot user agent to simulate what a bot sees": "ページとボットのユーザーエージェントを選択して、ボットが実際に見る内容をシミュレーションする。",
  "Choose which bots are hitting your subdomain or have permission to crawl": "どのボットがあなたのサブドメインにアクセスしているか、またはクロール許可があるかを選択",
  "Choose your CDN Provider:": "CDNプロバイダーを選択してください：",
  "Click \"Create application\", and then \"Create Worker\". This will take you to a screen where you can name your worker and see the initial code that it will be running. Set the name to something TollBit related, and click deploy. We will be modifying the worker code shortly.": "「Create application」をクリックし、その後「Create Worker」をクリックします。ワーカー名を設定してデプロイします。すぐにコードを編集します。",
  "Clickthrough Rate": "クリック率",
  "Clickthrough Rates": "クリック率",
  "CloudFlare Enterprise": "CloudFlareエンタープライズ",
  "Connect your CDN platform": "CDNプラットフォームを接続してください",
  "Connected accounts": "接続済みアカウント",
  "Consider your current RPM as a benchmark when setting this rate": "この価格を設定する際は、現在のRPM（1000PVあたりの売上）をベンチマークとして検討してください。",
  "Consider your syndication rates as a benchmark when setting this rate": "この料金を設定する際は、既存のコンテンツ配信（シンジケーション）価格を基準として検討してください。",
  "Content Controls": "コンテンツコントロール",
  "Content Retrieval": "コンテンツの取得",
  "Content to request": "要求するコンテンツ",
  "Continue": "続行",
  "Crawler": "クローラー",
  "Create Property": "サイトを追加",
  "Create Time Pricing": "時間変動型の価格設定を作成",
  "Create an Article Filter": "記事フィルターを作成",
  "Create new worker": "新しいワーカーを作成",
  "Create stream": "ストリームを作成",
  "Cumulative Growth": "累積の実績",
  "Current Directory": "現在のディレクトリ",
  "Custom Rate": "カスタム価格",
  "Customize rates further for specific subdirectories, pages, or bots in the Advanced Settings. Global Rates are the default unless more customized rates are defined.": "「高度な設定」で、特定のサブディレクトリ、ページ、またはボットごとに価格をさらにカスタマイズできます。統一価格がデフォルト（初期設定）として適用されますが、より細かく設定された価格があればそちらが優先されます。",
  "Data includes only fully processed days. Recent days or days before your property joined may not appear.": "データには、処理が完了した日だけが含まれています。最近の日付や、あなたのサイトが追加される参加する前の期間は表示されない場合があります。",
  "Day": "日",
  "Deactivate": "無効化",
  "Define Global Rates across your subdirectories and pages at the property level. If a custom rate conflicts with a global rate, the custom rate will be used.": "サブディレクトリやページ全体に統一価格を設定します。カスタム価格が統一価格と矛盾する場合はカスタム価格が使用されます。",
  "Define Global Rates for your content across all subdirectories and pages. These rates apply for each use and do not allow your content to be used for training or creating generative AI models.": "すべてのサブディレクトリやページに対して適用される「統一価格」を定義してください。\nこの価格はクローリングごとに適用され、あなたのコンテンツが生成AIモデルの学習や生成目的に使用されることは許可されません。",
  "Define how the rate of a page should change over time.": "最終更新から特定の時間が経過した場合の、特別な価格設定を行う",
  "Define how the rate should change over time": "時間とともに価格がどのように変化するかを定義",
  "Delete": "削除",
  "Delete account": "アカウントを削除",
  "Destination Success": "転送先での受信成功",
  "Destination Success - The request is received at TollBit": "転送成功 - リクエストがTollBitで受信されました",
  "Determine how the price of content changes after it is uploaded": "コンテンツがアップロードされた後の経過時間に応じて価格がどのように変化するかを設定します。",
  "Different http response status codes over time. Quickly monitor the health of your site.": "HTTPレスポンスステータスコード別の時系列推移。サイトの健康状態を簡単にモニターできます。",
  "Directory": "ディレクトリ",
  "Domain": "ドメイン",
  "Domain Verification": "ドメイン認証",
  "Download as CSV": "CSVとしてダウンロード",
  "Edit worker code": "ワーカーコードを編集",
  "Element Filter": "要素フィルター",
  "Email addresses": "メールアドレス",
  "Enable": "有効にする",
  "Enable A2A": "A2Aを有効化",
  "Enable NLWeb": "NLWebを有効化",
  "Enter or paste one or more email addressess, separated by spaces or commas.": "メールアドレスを入力ください。コンマもしくはスペース区切りで複数の入力・登録も可能です。",
  "Exclude entire articles from AI access if the page contains matching HTML patterns": "ページに一致するHTMLパターンが含まれている場合、AIアクセスから記事全体を除外",
  "Exclude specific HTML elements from AI access": "特定のHTML要素へのAIアクセスを除外",
  "Fastly API Key": "Fastly APIキー",
  "Finally, set the URL to": "最後に、URLを次のように設定します。",
  "Finally, you can": "最後に、",
  "Find the HTTP logging endpoint and click \"Create endpoint\". You can set the name to anything descriptive (e.g. tollbit-prod). Keep the placement option as the default selection. Make sure your log placement option as the default selection. Make sure your log format is exactly as follows, without extra trailing spaces or newlines:": "HTTPロギングエンドポイントを見つけ、「Create endpoint」をクリックします。名前は任意のわかりやすいものに設定できます（例：tollbit-prod）。配置オプションはデフォルトのままにしてください。余分な空白や改行のない、以下のフォーマットに正確に合わせてください。",
  "Fine grain control over access rates for specific pages.": "特定のページに対する価格を細かく制御します。",
  "Follow these steps to set up an integration into our platform if you use Akamai.": "Akamaiを使用している場合、次の手順で当社プラットフォームへのインテグレーションを設定します。",
  "Follow these steps to set up an integration into our platform if you use CloudFlare.": "CloudFlareを使用している場合、次の手順でプラットフォームインテグレーションを設定します。",
  "Follow these steps to set up an integration into our platform if you use Fastly.": "Fastlyを使用している場合、次の手順で当社プラットフォームへのインテグレーションを設定します。",
  "For every": "合計、",
  "Forwarded to TollBit": "TollBitへ転送されました",
  "Forwarded to TollBit - CDN services routed the request to TollBit.": "TollBitへ転送 - CDNがリクエストをTollBitに転送しました。",
  "Full Display License": "全文表示ライセンス",
  "General": "一般",
  "Get Started with A2A": "A2Aを始める",
  "Get Started with Fastly Integration": "Fastlyとのインテグレーションを始める",
  "Get Started with NLWeb": "NLWebを始める",
  "Go into Advanced Options and set the \"Custom header name\" field to \"TollbitKey\". You must set the customer header value to your secret key. Your secret key can be accessed below": "「Advanced Options」を開き、「Custom header name」を「TollbitKey」に設定します。カスタムヘッダーの値をあなたのシークレットキーに設定する必要があります。あなたの秘密鍵は以下で確認できます。",
  "Go to \"Websites\" on the left pane and choose the website that you would like to forward logs for, and click into it. On the left panel, click into \"Worker Routes\", and then click \"Add route\". Set the route to": "左ペインの「Websites」で対象サイトを選び、「Worker Routes」で「Add route」をクリックし、ルートを設定します。",
  "Go to your": "正しいドメインを選択し、「Edit Configuration」をクリックして現在の設定をクローンしてください。",
  "Here's an example query for your HTTP ask endpoint:": "実際にエンドポイントに送信するクエリの例は以下のとおりです。",
  "Home": "ホーム",
  "Host": "ホスト",
  "Hour": "時間",
  "How many human visitors AI platforms are sending you.": "AIプラットフォームがあなたにどれだけの人間の訪問者を送っているか（リファラルリンク経由のユーザー数）",
  "How many human visits your site received each day from AI referrals": "AIプラットフォーム上からのリファラル経由であなたのサイトに訪れたユーザー数",
  "How often AI bot scrapes result in a human visit.": "1回のリファラルは何回のAIボットによるクローリングによってもたらされるか",
  "How the most accessed pages break down by user agent category.": "最もアクセスされたページがユーザーエージェントカテゴリー別にどのように分布しているか",
  "How the traffic looks over time for all AI user agents.": "すべてのAIユーザーエージェントにおけるトラフィックの時系列推移",
  "How your AI traffic compares to others on TollBit": "TollBit内で、あなたのサイトのAIトラフィックが他と比較してどの位置にあるか",
  "Human": "人間",
  "If you already have an existing worker that is intercepting requests for your site, or you already set up a worker in the": "すでに",
  "If you are not on Enterprise, read on to set up a worker to forward logs.": "エンタープライズプランでない場合は、ログ転送用のワーカーを設定します。",
  "If you are on the Enterprise plan, you should have access to CloudFlare's": "エンタープライズプランの場合、CloudFlareの機能にアクセスできます。",
  "If your main site does not use the": "メインサイトが",
  "Important query parameters:": "重要なクエリパラメーター:",
  "In Progress": "進行中",
  "In the": "次に、",
  "Independently manage the access rates for specific AI bots and User Agents.": "特定のAIボットやユーザーエージェントごとに価格を個別に管理します。",
  "Integrations": "インテグレーション",
  "Invite Team": "メンバーを招待する",
  "Invite Users": "ユーザーを招待",
  "Invite your team to join your organization": "チーム（メンバー）をあなたの組織に追加しましょう。",
  "It's": "USA TODAYおよび200以上の地域メディアにおいて、",
  "Joined": "参加日",
  "Last month": "先月",
  "Last six months": "過去6ヶ月",
  "Last three months": "過去3ヶ月",
  "Last week": "先週",
  "Leave organization": "組織を離れる",
  "Link worker": "ワーカーをリンク",
  "Log into your": "まず、",
  "Logout": "ログアウト",
  "Logs": "ログ",
  "Main site": "メインサイト",
  "Manage Bot Blocking": "ボットブロックの管理",
  "Manage URL Path Blocking": "URLパスブロックを管理",
  "Manage your A2A settings.": "A2A設定を管理",
  "Manage your NLWeb settings.": "NLWeb設定を管理",
  "Manage your TollBit Account.": "アカウントを管理",
  "Manage your account info.": "アカウント情報を管理",
  "Manage your analytics settings": "アナリティクス設定を管理",
  "Manage your organization": "組織を管理",
  "Manage your profile": "プロフィールを管理",
  "Manage your secret keys.": "秘密鍵を管理します。",
  "Members": "メンバー",
  "Monthly Spend": "月次の実績",
  "Most-scraped pages": "最もクローリングされているページ",
  "NLWeb": "NLWeb",
  "NLWeb is a protocol that aims to simplify the creation of natural language interfaces for websites": "NLWebは、ウェブサイト向けの自然言語インターフェース作成を簡素化することを目的としたプロトコルです。",
  "NLWeb is a protocol that aims to simplify the creation of natural language interfaces for websites. There are two main endpoints in the NLWeb protocol, an HTTP": "NLWebはウェブサイト向けの自然言語インターフェース構築を簡素化することを目的としたプロトコルです。NLWebプロトコルには2つの主要なエンドポイント（HTTPなど）があります。",
  "Name:": "名前：",
  "Navigate to your DNS provider and create a new NS record for the subdomain. If your main website were www.example.com or example.com, the subdomain must be tollbit.example.com. Point the NS records at the following domains:": "メインサイトが www.example.com または example.com の場合、サブドメインは tollbit.example.com である必要があります。NSレコードを以下のドメインに向けてください：",
  "Need help?": "お困りの場合は、以下までご連絡ください。",
  "New logging configuration": "新しいログ設定",
  "Next": "次へ",
  "No Page Rates": "ページ単位の価格設定はありません",
  "No Subdirectory information found": "サブディレクトリ情報が見つかりません",
  "No Time Rates": "時間変動価格は設定されていません",
  "No data": "データなし",
  "No user agents selected": "ユーザーエージェントが選択されていません",
  "Not Activated": "無効",
  "Note:": "注：",
  "Once this set up is complete, it may take 24-48 hours for your analytics to populate": "設定が完了すると、データの反映が開始されます。アナリティクスデータが反映されるまでに24~48時間かかる場合があります。",
  "Once you are ready to publish these changes, click the \"Activate\" button. Keep in mind that if you have other unpublished changes in Fastly, this may also publish those as well.": "これらの変更を公開する準備ができたら、「Activate（有効化）」ボタンをクリックしてください。なお、Fastlyで他に未公開の変更がある場合、それらも同時に公開される可能性があることに注意してください。",
  "Once you are ready, click \"Save\", and you are all set!": "準備ができたら「Save」をクリックします。これで完了です。",
  "Once your worker has finished deploying, click \"Edit code\".": "ワーカーのデプロイが完了したら、「Edit code」をクリックします。",
  "One small update you may need to make is adding the": "小さな更新として追加する必要があるものは、",
  "One-Click Activation for A2A at your TollBit Subdomain": "TollBitサブドメインでA2Aをワンクリックで有効化",
  "One-Click Activation for NLWeb at your TollBit Subdomain": "TollBitサブドメインでNLWebをワンクリックで有効化",
  "OpenAI (ChatGPT)": "OpenAI (ChatGPT)",
  "Operator": "運営者",
  "Org": "組織",
  "Organization": "組織",
  "Organization Home": "組織のホームへ戻る",
  "Organization Profile": "組織プロフィール",
  "Other Bots": "その他のボット",
  "Our logging endpoint": "当社のログエンドポイント",
  "Overview": "概要",
  "Page": "ページ",
  "Page Path": "ページパス",
  "Partially Forwarded": "一部転送済み",
  "Password": "パスワード",
  "Paste it into the \"Custom header value\" field with no trailing spaces. Keep all the other settings as default, scroll to the bottom, and save.": "末尾に空白を入れずに、「Custom header value」フィールドに貼り付けてください。その他の設定はすべてデフォルトのままにし、下までスクロールして保存します。",
  "Path Prefix": "パスのプレフィックス（接頭語）",
  "Pending": "保留中",
  "Percentile": "パーセンタイル",
  "Percentile Metrics": "パーセンタイル指標",
  "Percentile Metrics: How your AI traffic compares to others on TollBit": "パーセンタイル指標: TollBit内で、あなたのサイトのAIトラフィックが他と比較してどの位置にあるか",
  "Perplexity": "Perplexity",
  "Prevent all access to URLs begining with a custom Prefix.": "特定のプレフィックス（接頭辞）で始まるURLへのすべてのアクセスを禁止します。",
  "Prevent all access to URLs beginning with a custom Prefix": "指定したプレフィックスで始まるURLへのすべてのアクセスを禁止する",
  "Previous": "前へ",
  "Price after content upload": "時間経過による価格設定",
  "Price per 1,000 pages": "1,000ページあたりの価格",
  "Price per User Agent": "ユーザーエージェントごとの価格",
  "Profile": "プロフィール",
  "Profile details": "プロフィール詳細",
  "Properties": "サイト一覧",
  "Property Name": "サイト名",
  "Property setup": "プロパティ設定",
  "Property:": "サイト：",
  "Rate Limit": "レート制限",
  "Rates": "価格設定を追加",
  "Reach out to": "この方法での取り込みを有効にする場合は",
  "Read the docs →": "ドキュメントを確認する",
  "Recent AI Bot Activity": "最近のAIボットアクティビティ",
  "Recent Transactions": "最近のトランザクション",
  "Referers": "リファラルの数",
  "Referral Metrics": "リファラル指標",
  "Referral traffic": "リファラルトラフィック合計",
  "Referral traffic by day": "日別のリファラルトラフィック",
  "Regenerate Key": "鍵を再生成",
  "Request Activity": "リクエストアクティビティ",
  "Request Received": "リクエストの受信",
  "Request Received - Base URL received the request.": "リクエスト受信 - ベースURLがリクエストを受信しました。",
  "Retry domain verification": "ドメイン認証を再実行する",
  "Robots.txt violations": "robots.txtの違反",
  "Role": "役割",
  "Run a test to see data...": "データを確認するためにテストを実行...",
  "SEO Agents": "SEOエージェント",
  "Sample Agent Card": "サンプルエージェントカード",
  "Save": "保存",
  "Save Changes": "変更を保存",
  "Scrape-to-referral ratio": "クローリング数とリファラ数の比較",
  "Scrapes": "クローリング数",
  "Search": "検索",
  "Search for a page...": "ページを検索...",
  "Secret Key": "秘密鍵",
  "Secret Keys": "秘密鍵",
  "Security": "セキュリティ",
  "See the docs": "詳細はこちらのドキュメントを参照し、",
  "See who is accessing your data.": "誰があなたのデータにアクセスしているか、確認しましょう。",
  "Select License": "ライセンスの種別を選択",
  "Select User Agent": "ユーザーエージェントを選択",
  "Select none for authentication for now, as we will be setting up custom authentication. To do so, go to \"Custom header\". For the content type, you can select": "認証は一旦「なし」を選択します。後でカスタム認証を設定します。「Custom header」に進んでください。Content-Typeには次のものを選択ください。",
  "Send invitations": "招待を送信",
  "Service ID": "サービスID",
  "Set Global Rates For Your Content": "コンテンツの統一価格を設定",
  "Set Up Analytics": "アナリティクスをセットアップする",
  "Set Up Each Type Below": "以下の4タイプの設定が可能",
  "Set a flat rate for all content within a directory": "ディレクトリ内のすべてのコンテンツに対して一定価格を設定",
  "Set a flat rate for all the content within a page directory of your site.": "サイト内の特定ディレクトリ配下のすべてのコンテンツに対して、特別な価格設定を行う",
  "Set a rate for a specific page": "特定のページの価格を設定",
  "Set a rate for a specific page on your website.": "特定のページに対して、特別な価格設定を行う",
  "Set include/exclude filters for articles, sections, tags, images, links, and embeds to control what AI bots and agentic apps can access.": "AIボットやエージェンティックアプリがアクセスできる内容を制御するため、記事、セクション、タグ、画像、リンク、埋め込みのインクルード/エクスクルードフィルターを設定します。",
  "Set password": "パスワードを設定",
  "Set special rates for any specific bots that accesses your platform.": "特定のボットに対して、特別な価格設定を行う",
  "Set special rates for specific bots": "特定のボット用に特別な価格を設定",
  "Set up TollBit subdomain ? create NS records for content delivery": "TollBitサブドメインを設定し、コンテンツ配信用のNSレコードを作成してください",
  "Set up property to access analytics": "アナリティクスにアクセスするためのサイトの設定を行う",
  "Settings": "設定",
  "Show Advanced Settings": "高度な設定を表示",
  "Show Custom License Rates": "カスタムライセンス価格を表示",
  "Shows how much of your AI traffic comes from this bot compared to other publishers.": "他のパブリッシャーと比較して、あなたのAIトラフィックのうちどれだけがこのボットから来ているかを示します。",
  "Shows what percentage of your AI traffic comes from this specific bot compared to other publishers.": "他のサイトと比較して、あなたのサイトでは、AIトラフィックのうちどのくらいの割合がこの特定のボットから来ているかを示しています。",
  "Simulate a Bot Request": "ボットリクエストをシミュレーション",
  "Specific Page Access": "ページ単位の価格設定",
  "Starting Price per 1,000 pages": "開始価格",
  "Status Codes": "ステータスコード",
  "Status Traffic": "ステータストラフィック",
  "Step": "ステップ",
  "Stream to Endpoint": "エンドポイントにストリームを送信",
  "Subdirectories": "ディレクトリ",
  "Summarization License": "要約用ライセンス",
  "Summarization License Options": "要約ライセンスオプション",
  "Tag": "タグ",
  "Technical Steps Required": "技術的な手順が必要です",
  "Test": "テスト",
  "Test Bot Requests": "ボットリクエストをテスト",
  "Test bot forwarding →": "ボットの転送を試してみる",
  "Test how content controls affect what bots see when they scrape.": "コンテンツ制御がボットのクローリング結果にどのように影響するかをテストします。",
  "Test your property against sample requests to check forwarding and content filters.": "サンプルリクエストに対してサイトをテストし、転送とコンテンツフィルターを確認します。",
  "Test your property's bot forwarding functionality based on popular bot user agents.": "一般的なボットユーザーエージェントに基づいて、あなたのサイトのボット転送機能をテストします。",
  "The Agent2Agent (A2A) protocol is an open standard designed to let AI agents collaborate securely without sharing their internal logic or data. It enables agents to discover each other's capabilities, negotiate how to interact, and work together on tasks over http(s). For more A2A details, please review the": "Agent2Agent（A2A）プロトコルは、AIエージェント同士が内部ロジックやデータを共有せずに安全に協調できるよう設計されたオープンスタンダードです。エージェントは互いの機能を発見し、通信方法を交渉し、HTTP(S)上でタスクを協力して実行できます。詳細は以下をご覧ください。",
  "The Full Display Content License means that purchasing Developers will be granted a non-exclusive, non-transferable, non-assignable, non-sublicensable, and revocable (pursuant to the Content Access Terms linked below) right and license for the Term to access, index, and process the Publisher Data to summarize, cite, and display ground inferences based upon Provider Data to end users, including displaying the full text of Provider Data to end users.": "全文表示コンテンツライセンスとは、購入したAI事業社に対し、非独占的・譲渡不可・再許諾不可・取消可能（下記リンク先の「コンテンツアクセス規約」に従う）な権利およびライセンスを、契約期間中に付与するものです。\nこれにより、AI事業社はサイトのコンテンツデータを要約・引用・処理し、提供データの全文をエンドユーザーに表示することも可能です。",
  "The Summarization Content License means that purchasing Developers will be granted a non-exclusive, non-transferable, non-assignable, non-sublicensable, and revocable (pursuant to the Content Access Terms linked below) right and license for the Term to access, index, and process the Publisher Data solely to summarize, cite, and display ground inferences based upon Provider Data to end users, provided Developer is prohibited from displaying the full text of the Provider Data to end users.": "要約用ライセンスとは、購入したAI事業社に対し、非独占的・譲渡不可・再許諾不可・取消可能（下記リンク先の「コンテンツアクセス規約」に従う）な権利およびライセンスを、契約期間中に付与するものです。\nAI事業社はこれにより、サイトのコンテンツにアクセス・インデックス化・処理して、要約・引用・根拠に基づく推論結果をエンドユーザーに表示することができます。\nただし、提供データの全文をエンドユーザーに表示することは禁止されています。",
  "The requests is recieved at TollBit.": "転送されたリクエストはTollBitで正しく受信されました。",
  "There may be an issue with your bot paywall setup. Some bots are making it through to your main site.": "ボットのペイウォール設定に問題がある可能性があります。いくつかのボットがメインサイトに到達してしまっています。",
  "These are the secret keys to be used from your backend code. They are sensitive and should be deleted if leaked.": "これはAPIを利用する際に使用する秘密鍵です。機密情報のため、流出した場合は削除してください。",
  "This device": "このデバイス",
  "This rate will be used for all sub directories and pages.": "この価格は、すべてのサブディレクトリおよびページに適用されます。",
  "Time": "時間",
  "To ensure we are in control of who accesses our content, and to": "私たちは、自社コンテンツへのアクセスをどのAIボットが行っているのかを管理できるようにするため、さらに",
  "To forward your logs to us, follow the steps outlined": "ログを当社に転送するには、次のドキュメントの手順に従ってください：",
  "To test your MCP endpoint, download the": "MCPエンドポイントをテストするには、次の",
  "To validate and test your A2A server, you can use the": "A2Aサーバーの検証とテストには次のリンクからインスペクターをダウンロードし、ご利用ください。",
  "TollBit": "TollBitは、AIボットに対して ペイウォールを提示 することで、",
  "TollBit subdomain": "TollBit サブドメイン",
  "TollBit's bot blocking is easily compatible with Fastly customers. By adding your API key and Service ID, the Bot Blocking controls are a simple toggle function.": "TollBitのボットブロックはFastlyのお客様と簡単に互換性があります。APIキーとサービスIDを追加することで、ボットブロックコントロールを簡単に切り替えられます。",
  "TollBit's traffic data has helped TIME negotiate": "TollBitのトラフィックデータは、TIMEがOpenAIやPerplexityなどの",
  "Top 5 Pages": "上位5ページ",
  "Top AI bots scraping your website": "あなたのウェブサイトをクロールしているAIボットの上位",
  "Top Pages": "人気ページ",
  "Top referrers": "リファラルをもたらす上位AI事業社",
  "Total AI Bot Scrapes": "AIボットのクローリング総数",
  "Total AI Bot scrapes": "AIボットの総クローリング数",
  "Total AI referrals": "総リファラル数",
  "Total Transactions": "総トランザクション数",
  "Total number of referrals by bot type": "ボットタイプ別のリファラル獲得数",
  "Total referral traffic": "リファラルトラフィック合計",
  "Total referrals": "リファラル獲得数の合計",
  "Total scrapes": "総クロール数",
  "Transactions": "トランザクション",
  "Update profile": "プロフィールを更新",
  "Updated": "更新：",
  "User": "ユーザー",
  "User Agent": "ユーザーエージェント",
  "Users in this organization": "この組織のユーザー",
  "Value": "Value（値）",
  "Verification pending. Continue onto the next step while this occurs. It may take up to 24 hours.": "認証は保留中です。この間に次のステップに進んでください。最大で24時間かかる場合があります。",
  "Verify": "確認する",
  "Verify Property": "サイトを確認する",
  "Verify Your Domain": "ドメインを認証する",
  "Verify log streaming": "ログの送信を確認する",
  "View a sample of logs for the graph above.": "上記グラフのログサンプルを表示",
  "View the docs": "ドキュメントを確認し、",
  "Visit this URL below to see how other agents can discover your schema.": "他のエージェントがあなたのスキーマをどのように発見できるかを見るには、以下のURLを確認してください。",
  "We provide a way for you to forward logs to our platform so that we can provide analytics on bot traffic and more.": "ボットトラフィックなどのアナリティクスを提供できるよう、ログを当社プラットフォームに転送する方法を提供します。",
  "We see firsthand the surge in AI-driven traffic. TollBit": "私たちは、AIによって急増するトラフィックを直接目の当たりにしています。TollBitは、",
  "When choosing data parameters, make sure to parameters that cover at least everything in following sample log JSON. Also, please ensure that your log format is JSON.": "データパラメータを選択する際は、次のサンプルログJSONに含まれるすべての項目をカバーするようにしてください。また、ログ形式はJSONであることを確認してください。",
  "Which bots are being forwarded or not.": "どのボットが転送されているか。ボットが転送されるかどうかを変更するには、",
  "You can use the a2a-inspector to validate and test your Agent2Agent implementation.": "a2a-inspectorを使用してあなたのAgent2Agent実装を検証およびテストできます。",
  "You have more AI traffic from this bot than": "あなたのサイトは、このボットからのAIトラフィックが多く、他の",
  "You have more AI traffic than": "あなたのサイトはTollBit内の全サイトを100としたうち、上位",
  "You must be proxying traffic through CloudFlare in order have the worker seconds your logs over to us. Most websites are already doing this, but if you are not certain, you can check by going into your site's DNS page and ensuring that your main site's DNS settings have proxy status as `Proxied`.": "CloudFlare経由でトラフィックをプロキシする必要があります。ほとんどのサイトはすでにそうしていますが、DNSページで「Proxied」か確認できます。",
  "You receive more traffic from AI bots than": "あなたのサイトはTollBit内の全サイトを100としたうち、上位",
  "You receive more traffic from this bot than 100% of other publishers.": "TollBit内の全サイトの中で、このボットに最もアクセス（クロール）されていることを意味します。",
  "You will need to first create a stream by going to your": "まず、あなたの環境にアクセスしてストリームを作成する必要があります。",
  "Your A2A server will be hosted at": "あなたのA2Aサーバーは次の場所にホストされます",
  "Your NLWeb ask endpoint will be hosted at": "あなたのNLWebに関するリクエストの送信先エンドポイントは次の場所にホストされます。",
  "Your agent card is always available at": "あなたのエージェントカードは常に以下で利用可能です",
  "Your homepage": "あなたのサイトを",
  "Your most frequently scraped content.": "あなたのコンテンツの中で最も頻繁にクロールされたもの",
  "Your site ranks in the": "あなたのサイトはTollBit内の全サイトを100としたうち、上位",
  "Your subdomain is not active.": "あなたのサブドメインは有効化されていません。",
  "Your website's pages AI bots visited the most.": "あなたのサイトで、AIボットが最も多く訪れたページ",
  "a fair and transparent licensing model": "公正で透明性のあるライセンスモデル",
  "a2a-inspector": "a2aインスペクター",
  "across USA TODAY and our 200+ local publications. We're encouraged by the work TollBit is doing to help defend our intellectual property and protect the value of original reporting.": "TollBitが知的財産を守り、独占的な報道の価値を保護するために取り組んでいる活動に、私たちは大いに助けられています。",
  "allowed": "許可されております。",
  "and go to the \"Workers & Pages\" section on the left bar.": "にログインし、左のバーの「Workers & Pages」セクションに進みます。",
  "and made up": "本サイト内に占めるAIボットのうち",
  "and pick the correct domain. Click \"Edit Configuration\", and clone your current configuration. This saves a new configuration version as a draft, and allows you to rollback if necessary. This should bring you to a new screen. On the sidebar, scroll down until you see Logging and click on that. Then, click \"Create Endpoint\"": "これにより新しい設定バージョンが下書きとして保存され、必要に応じてロールバックが可能になります。新しい画面が表示されます。サイドバーで「Logging」が見えるまでスクロールし、それをクリックします。次に「Create Endpoint」をクリックします。",
  "and the value as your secret key. Your secret key can be accessed below": "を設定します。値にはあなたの秘密鍵を設定します。秘密鍵は以下で確認できます。",
  "and your mcp endpoint will be hosted at": "そしてあなたのMCPエンドポイントは次の場所にホストされます。",
  "by presenting AI bots with a paywall where publishers can monetize the data that is being scraped.": "を実現しています。",
  "content licensing deals with AI companies": "AI企業とのコンテンツライセンス契約",
  "create an article filter": "記事フィルターを作成",
  "create an element filter": "要素フィルターを作成",
  "decreased to": "は減少傾向に向かっていて、その数、",
  "endpoint and an MCP compatible": "エンドポイントおよびMCP互換の",
  "endpoint. This allows developers and agents to seamlessly interact with your content via natural language.": "エンドポイント。これにより、開発者やエージェントが自然言語を通じてあなたのコンテンツとシームレスにやり取りできるようになります。",
  "feature. You may already be pushing logs to an S3, R2 or GCP bucket. If this is the case, we are able to ingest your logs from where they are already being stored.": "すでにログをS3、R2、またはGCPバケットに送信しているかもしれません。その場合、そこからログを取り込むことができます。",
  "file, delete everything and copy the following code over exactly, making sure to replace": "において、すべてを削除し、次のコードを正確にコピーして置き換えます。",
  "for your CDN provider .": "を参照し、設定ください。",
  "for your CDN provider to change if a bot is forwarded or not.": "適宜設定してください。",
  "for your CDN provider.": "を参照し、設定ください。",
  "from Anthropic and follow along with our demo": "ダウンロードし、デモに従ってください。",
  "from previous": "前期間との比較",
  "from the last month.": "しています。",
  "from the last six months.": "しています。",
  "from the last three months.": "しています。",
  "from the previous period": "（前期間比）",
  "from the previous week.": "しています。",
  "gets redirected to": "→",
  "gets redirected to your main site (": "メインサイトにリダイレクトされる場合（",
  "gives us the capabilities to protect our content,": "私たちがコンテンツを保護することを可能にしてくれ、",
  "here": "こちら",
  "in Cloudflare's documentation to add this header. You will want to select \"Response Header\" as the field type and type in": "（CloudFlareのドキュメント）に従い、このヘッダーを追加します。「Response Header」をフィールドタイプとして選択し入力します。",
  "including OpenAI and the search engine Perplexity.": "を交渉する際に有用でした。",
  "increased to": "は増加傾向に向かっていて、その数、",
  "initiated": "は",
  "license terms": "コンテンツアクセス規約",
  "message and allow you to communicate with the server using the A2A protocol using the chat feature of the inspector.": "このメッセージが表示されると、インスペクターのチャット機能を使ってA2Aプロトコルでサーバーと通信できます。",
  "mode ? one of the supported modes. Use mode \"list\" for classification or to retrieve a list of objects, mode \"summarize\" to condense or compress content, or mode \"generate\" to generate new content": "モードとは、 サポートされているモードの1つ。分類またはオブジェクトのリストを取得するには「リスト」モード、コンテンツを要約または圧縮するには「要約」モード、新しいコンテンツを生成するには「生成」モードを使用します。",
  "monitor AI bot traffic, manage it on our terms, and monetize AI access.": "さらに、AIによるアクセスを収益化することを可能にしてくれます。",
  "not allowed": "許可されておりません。",
  "of AI traffic": "を占める",
  "of other publishers": "サイトよりも多いです。",
  "of other publishers on TollBit": "に位置しています。例えばこの数値が95%だった場合、あなたのサイトのAIボットのトラフィック量はTollBitで観測しているサイトの中の上位5位には入っている、という意味になります。",
  "of other publishers.": "に位置しています。例えばこの数値が95%だった場合、あなたのサイトのAIボットのトラフィック量はTollBitで観測しているサイトの中の上位5位には入っている、という意味になります。",
  "of your AI bot scrapes.": "を占めています。",
  "official MCP inspector": "Anthropicの公式MCPインスペクターを",
  "on how to create your stream.": "ストリームの作成を行ってください。",
  "over the last": "をもたらし、",
  "per page": "ページごとの表示",
  "percentile": "パーセンタイル",
  "query ? the question or query being asked to your site": "クエリとは、あなたのサイトに投げられる質問やクエリを指します。",
  "referrals": "リファラル",
  "requests": "回",
  "response header to the logs. Follow": "のレスポンスヘッダーをログに追加することです。",
  "review and activate": "レビューして有効化",
  "scrapes": "クロール",
  "scrapes you get 1 AI referral": "回のクローリングにつき、1回のリファラルを獲得",
  "section, you will need to integrate this logging code with that worker. If you just have a bot deterrence worker set up, see that section to get a code snippet that also pushes logs.": "そのセクションのいて、もしあなたのサイトでリクエストを受け取る既存のワーカーがすでにある場合、または以前にワーカーを設定している場合には、そのワーカーを利用します。このロギングコードをそのワーカーに統合する必要があります。Bot抑止ワーカーがある場合は、ログも送信するコードスニペットを参照します。",
  "see the docs": "こちらのドキュメント",
  "should produce an": "をクリックすると、次のメッセージが表示されます：",
  "shown above.": "に同意したものとみなされます。",
  "six months": "過去6ヶ月で",
  "streaming ? boolean for if the query is a streaming query": "ストリーミングとは、クエリがストリーミングクエリかどうかを示すTRUE or NOTの値です。",
  "subdomain": "サブドメイン",
  "subdomain and add these NS records to it.": "さらに、DNSプロバイダにアクセスし、サブドメイン用の新しいNSレコードを作成してください。",
  "subdomain and all traffic to": "を利用していない場合、サブドメインおよびすべてのトラフィックが",
  "takes bot blocking one step further": "パブリッシャーがスクレイピングされるデータを収益化できる仕組み",
  "that ensures our communities remain a trusted source of human expertise while positioning VerticalScope to unlock a new revenue stream.": "を構築できています。これにより、私たちのコミュニティが人間の専門知識に基づく信頼できる情報源であり続けると同時に、VerticalScopeが新たな収益源を開拓できるようになります。",
  "these instructions": "手順に従って、",
  "these steps": "これらの手順",
  "three months": "過去3ヶ月で",
  "times": "回",
  "to access": "対象ドメイン：",
  "to enable ingestion this way.": "までご連絡ください。",
  "to mirror your traffic to the TollBit subdomain.": "トラフィックをTollBitサブドメインにミラーリングしましょう。",
  "to our leading online business publications, we turned to TollBit.": "主要なオンラインビジネスのコンテンツにおいてTollBitを導入しました。",
  "to your website,": "あなたのサイトに訪問してきており、前期間と比較して、",
  "to your website.": "あなたのサイトに訪れてきています。",
  "unlock new revenue from AI traffic": "AIトラフィックから新たな収益を生み出すために、",
  "vital to preserve the integrity of our journalism": "私たちのジャーナリズムの健全性を守ることは極めて重要です。",
  "was scraped the most.": "最もクローリングしているAIボット",
  "was the top referrer with": "が最も多くのリファラル数をもたらし、その回数は",
  "week": "過去1週で",
  "with your secret key. Your secret key can be accessed below": "には以下の秘密鍵を入力ください。",
  "your stream!": "以上で完了となります。"
};

  // Placeholder翻訳（入力フィールド用）
  

  // パターンベース翻訳（正規表現）
  // Placeholder翻訳（入力フィールド用）
  // Placeholder翻訳（入力フィールド用）
  // Placeholder翻訳（入力フィールド用）
  const PLACEHOLDER_TRANSLATIONS = {
  "Enter URL prefixes, starting with /. E.g. '/articles/hidden/": "URL のプレフィックスを「/」から始めて入力してください。例：/articles/hidden/",
  "Run a test to see data...": "データを見るためにはテストを実施してみましょう。",
  "Search for a page...": "ページを検索..."
};

  

  

  

  // パターンベース翻訳（正規表現）
  const PATTERN_TRANSLATIONS = [
  {
    "pattern": "Updated (\\d+) days? ago",
    "replacement": "$1日前に更新"
  },
  {
    "pattern": "Members \\((\\d+)\\)",
    "replacement": "メンバー ($1)"
  },
  {
    "pattern": "AI bots made ([\\d.]+[KMB]?) requests to your website, (?:down|up) ([\\d.]+)% from the previous week",
    "replacement": "AIボットがあなたのウェブサイトに$1万件のリクエストを行いました。前週比で$1%減少しています。"
  },
  {
    "pattern": "You receive more traffic from AI bots than (\\d+)% of other publishers",
    "replacement": "あなたは他のサイトの$1%より多く、AIボットからのトラフィックがあります。"
  },
  {
    "pattern": "Top (\\d+) Bots",
    "replacement": "上位5ボット"
  },
  {
    "pattern": "Breakdown the top (\\d+) most active bot agents accessing your content\\.",
    "replacement": "あなたのコンテンツにアクセスしている最も活発なボットエージェント上位5の内訳"
  },
  {
    "pattern": "\\$([\\d.]+)",
    "replacement": "$0.00"
  },
  {
    "pattern": "down ([\\d.]+)%",
    "replacement": "$1％減少"
  },
  {
    "pattern": "up ([\\d.]+)%",
    "replacement": "$1％増加"
  },
  {
    "pattern": "You receive more traffic from this bot than (\\d+)% of other publishers\\.",
    "replacement": "あなたはこのボットから他の$1%のサイトより多くのトラフィックを受け取っています。"
  },
  {
    "pattern": "only (\\d+)% of websites were scraped more by",
    "replacement": "$1％に位置しています。"
  },
  {
    "pattern": "no websites were scraped more by",
    "replacement": "どのサイトよりも多く、このAIボットにクロールされています。"
  },
  {
    "pattern": "You receive more traffic from this bot than (\\d+)% of other publishers\\.",
    "replacement": "あなたのサイトは、このボットから他のサイトの$1％よりも多くのボットトラフィックを受け取っています。"
  },
  {
    "pattern": "(\\d+)(?:st|nd|rd|th)",
    "replacement": "$1%"
  },
  {
    "pattern": "(\\d+) days? ago",
    "replacement": "$1 日前"
  }
];
  // 翻訳済みノードを追跡（全フレーム共通）
  const translatedNodes = new WeakSet();
  let totalTranslations = 0;

  /**
   * テキストを正規化（末尾の句読点とスペースを除去）
   */
  function normalizeText(text) {
    return text.replace(/[.,!?;:\s]+$/, '');
  }

  /**
   * テキストノードを翻訳
   */
  function translateTextNode(node) {
    if (!node || node.nodeType !== 3) return false;

    const text = node.nodeValue;
    if (!text) return false;

    const trimmed = text.trim();
    if (!trimmed || trimmed.length === 0) return false;

    // 既に日本語に翻訳済みならスキップ（無限ループ防止）
    const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(trimmed);
    if (hasJapanese) {
      return false; // 日本語が含まれていれば翻訳済みとみなす
    }

    // 既翻訳ノードチェック
    if (translatedNodes.has(node)) {
      return false;
    }

    // テキストを正規化（末尾の句読点・スペース除去）
    const normalized = normalizeText(trimmed);

    // 1. 完全一致の辞書検索（優先）
    // まず正規化せずに検索
    if (TRANSLATIONS[trimmed]) {
      const japanese = TRANSLATIONS[trimmed];
      node.nodeValue = node.nodeValue.replace(trimmed, japanese);
      translatedNodes.add(node);
      totalTranslations++;
      // console.log(`[翻訳] "${trimmed.substring(0, 30)}..." → "${japanese.substring(0, 30)}..."`);
      return true;
    }

    // 正規化版で検索
    if (normalized !== trimmed && TRANSLATIONS[normalized]) {
      const japanese = TRANSLATIONS[normalized];
      node.nodeValue = node.nodeValue.replace(trimmed, japanese);
      translatedNodes.add(node);
      totalTranslations++;
      // console.log(`[翻訳(正規化)] "${trimmed}" → "${japanese}"`);
      return true;
    }

    // 2. パターンマッチング（正規表現）
    for (const patternObj of PATTERN_TRANSLATIONS) {
      try {
        const regex = new RegExp(patternObj.pattern, 'i');
        if (regex.test(trimmed)) {
          // trimmedに対してreplaceを実行（normalizedではない）
          const japanese = trimmed.replace(regex, patternObj.replacement);
          node.nodeValue = node.nodeValue.replace(trimmed, japanese);
          translatedNodes.add(node);
          totalTranslations++;
          // console.log(`[パターン翻訳] "${trimmed}" → "${japanese}"`);
          return true;
        }
      } catch (e) {
        console.error(`[パターンエラー] ${patternObj.pattern}:`, e);
      }
    }

    return false;
  }


  /**
   * Placeholder属性を翻訳
   */
  function translatePlaceholders(doc) {
    if (!doc) return 0;

    let count = 0;
    try {
      const elementsWithPlaceholder = doc.querySelectorAll('[placeholder]');
      elementsWithPlaceholder.forEach(element => {
        const placeholder = element.getAttribute('placeholder');
        if (placeholder && PLACEHOLDER_TRANSLATIONS[placeholder]) {
          element.setAttribute('placeholder', PLACEHOLDER_TRANSLATIONS[placeholder]);
          count++;
          // console.log(`[Placeholder翻訳] "${placeholder}" → "${PLACEHOLDER_TRANSLATIONS[placeholder]}"`);
        }
      });
    } catch (e) {
      console.error('[Placeholder翻訳エラー]:', e);
    }

    return count;
  }
  /**
   * ドキュメントを翻訳（再帰的）
   */
  function translateDocument(doc, label = 'document') {
    if (!doc || !doc.body) return 0;

    let count = 0;

    try {
      // Placeholder属性を翻訳
      count += translatePlaceholders(doc);

      // TreeWalkerで全テキストノードを処理
      const walker = doc.createTreeWalker(
        doc.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      let node;
      while (node = walker.nextNode()) {
        if (translateTextNode(node)) {
          count++;
        }
      }

      // 翻訳完了（ログ削減のためコメント化）
      // if (count > 0) {
      //   console.log(`[翻訳完了] ${label}: ${count}個`);
      // }
    } catch (e) {
      console.error(`[翻訳エラー] ${label}:`, e);
    }

    return count;
  }

  /**
   * 全iframeを翻訳（再帰的）
   */
  function translateAllFrames(doc = document, depth = 0, label = 'top') {
    if (depth > 3) return; // 無限再帰防止

    // 現在のドキュメントを翻訳
    translateDocument(doc, label);

    // 全iframeを処理
    try {
      const iframes = doc.querySelectorAll('iframe');

      iframes.forEach((iframe, index) => {
        try {
          // contentDocumentにアクセス可能かチェック
          if (iframe.contentDocument) {
            const iframeLabel = `${label}/iframe-${index}`;

            // iframeのドキュメントを翻訳（再帰的）
            setTimeout(() => {
              translateAllFrames(iframe.contentDocument, depth + 1, iframeLabel);
            }, 100);
          }
        } catch (e) {
          // Cross-origin iframeは静かにスキップ
        }
      });
    } catch (e) {
      console.error('[iframe検索エラー]:', e);
    }
  }

  /**
   * MutationObserverでiframe追加を監視
   */
  function setupIframeObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          // iframeが追加された
          if (node.nodeName === 'IFRAME') {
            setTimeout(() => {
              if (node.contentDocument) {
                translateAllFrames(node.contentDocument, 0, 'dynamic-iframe');
              }
            }, 500);
          }
          // 他の要素が追加された場合、その中のiframeもチェック
          else if (node.querySelectorAll) {
            const iframes = node.querySelectorAll('iframe');
            if (iframes.length > 0) {
              setTimeout(() => {
                translateAllFrames(document, 0, 'top-after-mutation');
              }, 500);
            }
          }
        });
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  /**
   * MutationObserverでテキスト変更を監視
   */
  function setupTextObserver(doc = document) {
    const observer = new MutationObserver((mutations) => {
      // 通常の翻訳
      translateDocument(doc, 'on-mutation');
    });

    observer.observe(doc.body || doc.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  /**
   * 段階的翻訳実行
   */
  function setupTranslation() {
    translateAllFrames(document, 0, 'top');

    // 段階的に再実行（iframeの遅延読み込みに対応）
    const timings = [
      200, 500, 1000, 1500, 2000, 3000,
      5000, 8000, 10000
    ];

    timings.forEach((ms, i) => {
      setTimeout(() => {
        translateAllFrames(document, 0, `top-${ms}ms`);
      }, ms);
    });

    // MutationObserver セットアップ
    setTimeout(() => {
      setupIframeObserver();
      setupTextObserver(document);
    }, 1000);

    // 永続的な定期監視（15秒間隔）
    setInterval(() => {
      translateAllFrames(document, 0, 'top-periodic');
    }, 15000);
  }

  /**
   * 起動（全フレームで実行）
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (window === window.top) {
        setupTranslation();
      } else {
        // iframe内では自身のみを翻訳
        translateDocument(document, 'iframe-init');
        setupTextObserver(document);

        // iframe内でも定期監視
        setInterval(() => {
          translateDocument(document, 'iframe-periodic');
        }, 2000);
      }
    });
  } else {
    if (window === window.top) {
      setupTranslation();
    } else {
      translateDocument(document, 'iframe-init');
      setupTextObserver(document);

      setInterval(() => {
        translateDocument(document, 'iframe-periodic');
      }, 2000);
    }
  }

  if (window === window.top) {
    window.addEventListener('load', () => {
      translateAllFrames(document, 0, 'top-on-load');
    });
  }

})();
