/**
 * TollBit 本番環境 日本語化拡張機能
 * バージョン: 1.1.0
 *
 * 動的に生成されるiframeにも対応
 * topフレームから全てのiframeにアクセスして翻訳
 * 変数を含むテキスト（正規表現パターン）にも対応
 * 分割されたテキストにも対応（302エントリ）
 * 末尾の句読点・スペースを除去して辞書検索
 * by以降削除対応
 */

(function() {
  'use strict';

  console.log('[TollBit日本語化] 本番環境版 v1.1.0 - 大幅更新（302エントリ）');

  // 通常の翻訳辞書（完全一致）
  const TRANSLATIONS = {
  "Home": "ホーム",
  "Add and select a property to get started monetizing your content.": "コンテンツの収益化を始めるには、サイトを追加して選択してください。",
  "Users in this organization": "この組織のユーザー",
  "Invite Users": "ユーザーを招待",
  "Add rates": "価格設定を追加",
  "Add Property": "サイトを追加",
  "Access": "アクセス",
  "Manage your secret keys.": "秘密鍵を管理します。",
  "Secret Keys": "秘密鍵",
  "These are the secret keys to be used from your backend code. They are sensitive and should be deleted if leaked.": "これはAPIを利用する際に使用する秘密鍵です。機密情報のため、流出した場合は削除してください。",
  "Secret Key": "秘密鍵",
  "Regenerate Key": "鍵を再生成",
  "Manage your TollBit Account.": "アカウントを管理",
  "Settings": "設定",
  "User": "ユーザー",
  "Manage your profile": "プロフィールを管理",
  "Org": "組織",
  "Manage your organization": "組織を管理",
  "Analytics": "アナリティクス",
  "Manage your analytics settings": "アナリティクス設定を管理",
  "Account": "アカウント",
  "Manage your account info.": "アカウント情報を管理",
  "Profile": "プロフィール",
  "Security": "セキュリティ",
  "Profile details": "プロフィール詳細",
  "Email addresses": "メールアドレス",
  "Add email address": "メールアドレスを追加",
  "Connected accounts": "接続済みアカウント",
  "Update profile": "プロフィールを更新",
  "Password": "パスワード",
  "Set password": "パスワードを設定",
  "Active devices": "アクティブなデバイス",
  "This device": "このデバイス",
  "Delete account": "アカウントを削除",
  "Organization": "組織",
  "General": "一般",
  "Organization Profile": "組織プロフィール",
  "Leave organization": "組織を離れる",
  "Members": "メンバー",
  "Search": "検索",
  "Joined": "参加日",
  "Role": "役割",
  "Actions": "操作",
  "Overview": "概要",
  "Last week": "先週",
  "A snapshot of your website's AI bot traffic, excluding robots.txt visits and traffic forwarded to your TollBit subdomain.": "robots.txt訪問とTollBitサブドメインへ転送されたトラフィックを除いた、あなたのウェブサイトへのAIボットトラフィックのスナップショットです。",
  "Top AI bots scraping your website": "あなたのウェブサイトをクロールしているAIボットの上位",
  "Referral Metrics": "リファラル指標",
  "Clickthrough Rates": "クリック率",
  "How many human visitors AI platforms are sending you.": "AIプラットフォームがあなたにどれだけの人間の訪問者を送っているか（リファラルリンク経由のユーザー数）",
  "AI Platform": "AIプラットフォーム",
  "Referers": "リファラルの数",
  "Scrapes": "クローリング数",
  "Clickthrough Rate": "クリック率",
  "OpenAI (ChatGPT)": "OpenAI (ChatGPT)",
  "Perplexity": "Perplexity",
  "Referral traffic by day": "日別のリファラルトラフィック",
  "Total referral traffic": "リファラルトラフィック合計",
  "Benchmarking": "ベンチマーク",
  "Percentile Metrics: How your AI traffic compares to others on TollBit": "パーセンタイル指標: TollBit内で、あなたのサイトのAIトラフィックが他と比較してどの位置にあるか",
  "Breakdown by bot": "ボット別内訳",
  "Status Traffic": "ステータストラフィック",
  "Status Codes": "ステータスコード",
  "Different http response status codes over time. Quickly monitor the health of your site.": "HTTPレスポンスステータスコード別の時系列推移。サイトの健康状態を簡単にモニターできます。",
  "Bot Activity": "ボットアクティビティ",
  "Bot Status": "ボットステータス",
  "Which bots are being forwarded or not.": "どのボットが転送されているか。ボットが転送されるかどうかを変更するには、",
  "See the docs": "詳細はこちらのドキュメントを参照し、",
  "for your CDN provider to change if a bot is forwarded or not.": "適宜設定してください。",
  "Total AI Bot Scrapes": "AIボットのクローリング総数",
  "AI Bot scrapes ordered by total request.": "AIボットクローリング数（降順）",
  "All Bots": "すべてのボット",
  "AI Agents": "AIエージェント",
  "SEO Agents": "SEOエージェント",
  "Recent AI Bot Activity": "最近のAIボットアクティビティ",
  "How the traffic looks over time for all AI user agents.": "すべてのAIユーザーエージェントにおけるトラフィックの時系列推移",
  "AI Bot Traffic": "AIボットトラフィック",
  "Top Pages": "人気ページ",
  "How the most accessed pages break down by user agent category.": "最もアクセスされたページがユーザーエージェントカテゴリー別にどのように分布しているか",
  "Page": "ページ",
  "Human": "人間",
  "AI Bots": "AIボット",
  "Other Bots": "その他のボット",
  "Search for a page...": "ページを検索...",
  "Logs": "ログ",
  "View a sample of logs for the graph above.": "上記グラフのログサンプルを表示",
  "Day": "日",
  "Hour": "時間",
  "Host": "ホスト",
  "User Agent": "ユーザーエージェント",
  "Download as CSV": "CSVとしてダウンロード",
  "Rates": "価格設定を追加",
  "Set Global Rates For Your Content": "コンテンツの統一価格を設定",
  "Define Global Rates across your subdirectories and pages at the property level. If a custom rate conflicts with a global rate, the custom rate will be used.": "サブディレクトリやページ全体に統一価格を設定します。カスタム価格が統一価格と矛盾する場合はカスタム価格が使用されます。",
  "Summarization License": "要約用ライセンス",
  "Not Activated": "無効",
  "A Summarization License allows AI to access your content for the purpose of summarization. They can extract a few relevant sentences to compile a new text piece on a website, in an app, or on other digital platforms.": "要約ライセンスは、要約目的でAI事業社があなたのコンテンツにアクセスすることを許可します。ウェブサイトやアプリなどで新しいテキストを作成するために関連する文を抽出することができます。",
  "Price per 1,000 pages": "1,000ページあたりの価格",
  "Activate": "有効化",
  "Deactivate": "無効化",
  "Full Display License": "全文表示ライセンス",
  "A Full Display License allows AI to access your content for the purpose of display. This includes generating text for a website, voice assistant, or other digital platform.": "完全表示ライセンスは表示目的でAI事業社があなたのコンテンツにアクセスすることを許可します。ウェブサイトや音声アシスタントなどでテキストを生成することが含まれます。",
  "Consider your current RPM as a benchmark when setting this rate": "この価格を設定する際は、現在のRPM（1000PVあたりの売上）をベンチマークとして検討してください。",
  "Show Custom License Rates": "カスタムライセンス価格を表示",
  "Show Advanced Settings": "高度な設定を表示",
  "Summarization License Options": "要約ライセンスオプション",
  "Activate the Rates You Need / Set Up Each Type Below": "必要な価格を有効化 / 各タイプを以下で設定",
  "Bot": "ボット",
  "Time": "時間",
  "Directory": "ディレクトリ",
  "Set special rates for specific bots": "特定のボット用に特別な価格を設定",
  "Set a rate for a specific page": "特定のページの価格を設定",
  "Define how the rate should change over time": "時間とともに価格がどのように変化するかを定義",
  "Set a flat rate for all content within a directory": "ディレクトリ内のすべてのコンテンツに対して一定価格を設定",
  "Custom Rate": "カスタム価格",
  "Add": "追加",
  "No Subdirectory information found": "サブディレクトリ情報が見つかりません",
  "Manage URL Path Blocking": "URLパスブロックを管理",
  "Prevent all access to URLs beginning with a custom Prefix": "指定したプレフィックスで始まるURLへのすべてのアクセスを禁止する",
  "Enable": "有効にする",
  "Recent Transactions": "最近のトランザクション",
  "A detailed ledger of recent transactions for your property.": "サイトに関する最近のトランザクションの詳細です。",
  "No data": "データなし",
  "Content Controls": "コンテンツコントロール",
  "Set include/exclude filters for articles, sections, tags, images, links, and embeds to control what AI bots and agentic apps can access.": "AIボットやエージェンティックアプリがアクセスできる内容を制御するため、記事、セクション、タグ、画像、リンク、埋め込みのインクルード/エクスクルードフィルターを設定します。",
  "Element Filter": "要素フィルター",
  "Exclude specific HTML elements from AI access": "特定のHTML要素へのAIアクセスを除外",
  "Article Filters": "記事フィルター",
  "Exclude entire articles from AI access if the page contains matching HTML patterns": "ページに一致するHTMLパターンが含まれている場合、AIアクセスから記事全体を除外",
  "Add filter": "フィルターを追加",
  "Test Bot Requests": "ボットリクエストをテスト",
  "Test your property against sample requests to check forwarding and content filters.": "サンプルリクエストに対してサイトをテストし、転送とコンテンツフィルターを確認します。",
  "Bot Forwarding": "ボットの転送",
  "Content Retrieval": "コンテンツの取得",
  "Simulate a Bot Request": "ボットリクエストをシミュレーション",
  "Choose a page and a bot user agent to simulate what a bot sees": "ページとボットのユーザーエージェントを選択して、ボットが実際に見る内容をシミュレーションする。",
  "Content to request": "要求するコンテンツ",
  "Select User Agent": "ユーザーエージェントを選択",
  "Test": "テスト",
  "Bot View": "ボットビュー",
  "Analyze the response of your content sites from the perspective of a bot": "ボットの視点からあなたのコンテンツサイトのレスポンスを分析",
  "Request Activity": "リクエストアクティビティ",
  "Request Received - Base URL received the request.": "リクエスト受信 - ベースURLがリクエストを受信しました。",
  "Forwarded to TollBit - CDN services routed the request to TollBit.": "TollBitへ転送 - CDNがリクエストをTollBitに転送しました。",
  "Destination Success - The request is received at TollBit": "転送成功 - リクエストがTollBitで受信されました",
  "NLWeb": "NLWeb",
  "One-Click Activation for NLWeb at your TollBit Subdomain": "TollBitサブドメインでNLWebをワンクリックで有効化",
  "NLWeb is a protocol that aims to simplify the creation of natural language interfaces for websites": "NLWebは、ウェブサイト向けの自然言語インターフェース作成を簡素化することを目的としたプロトコルです。",
  "Important query parameters:": "重要なクエリパラメーター:",
  "query ? the question or query being asked to your site": "クエリとは、あなたのサイトに投げられる質問やクエリを指します。",
  "streaming ? boolean for if the query is a streaming query": "ストリーミングとは、クエリがストリーミングクエリかどうかを示すTRUE or NOTの値です。",
  "mode ? one of the supported modes. Use mode \"list\" for classification or to retrieve a list of objects, mode \"summarize\" to condense or compress content, or mode \"generate\" to generate new content": "モードとは、 サポートされているモードの1つ。分類またはオブジェクトのリストを取得するには「リスト」モード、コンテンツを要約または圧縮するには「要約」モード、新しいコンテンツを生成するには「生成」モードを使用します。",
  "Get Started with NLWeb": "NLWebを始める",
  "Enable NLWeb": "NLWebを有効化",
  "Save": "保存",
  "A2A": "A2A (Agent2Agent)",
  "Agent2Agent (A2A) protocol": "Agent2Agent (A2A)プロトコル",
  "Agent2Agent is an open standard for AI agents to collaborate securely without sharing internal logic. It allows AI agents to discover capabilities, negotiate interactions, and work together seamlessly over HTTP.": "Agent2Agentは、AIエージェント同士が内部ロジックを共有せずに安全にコラボレーションするためのオープンスタンダードです。AIエージェントが機能を発見し、相互作用を交渉し、HTTP上でシームレスに動作することを可能にします。",
  "Your agent card is always available at": "あなたのエージェントカードは常に以下で利用可能です",
  "Visit this URL below to see how other agents can discover your schema.": "他のエージェントがあなたのスキーマをどのように発見できるかを見るには、以下のURLを確認してください。",
  "You can use the a2a-inspector to validate and test your Agent2Agent implementation.": "a2a-inspectorを使用してあなたのAgent2Agent実装を検証およびテストできます。",
  "Sample Agent Card": "サンプルエージェントカード",
  "Get Started with A2A": "A2Aを始める",
  "Enable A2A": "A2Aを有効化",
  "Integrations": "インテグレーション",
  "TollBit's bot blocking is easily compatible with Fastly customers. By adding your API key and Service ID, the Bot Blocking controls are a simple toggle function.": "TollBitのボットブロックはFastlyのお客様と簡単に互換性があります。APIキーとサービスIDを追加することで、ボットブロックコントロールを簡単に切り替えられます。",
  "Get Started with Fastly Integration": "Fastlyとのインテグレーションを始める",
  "Fastly API Key": "Fastly APIキー",
  "Service ID": "サービスID",
  "Allow for your logs to be streamed.": "ログのストリーミングを許可します。",
  "Bot Paywall": "ボットペイウォール",
  "Choose which bots are hitting your subdomain or have permission to crawl": "どのボットがあなたのサブドメインにアクセスしているか、またはクロール許可があるかを選択",
  "Block All Bots": "すべてのボットをブロック",
  "Save Changes": "変更を保存",
  "Crawler": "クローラー",
  "Operator": "運営者",
  "Robots.txt violations": "robots.txtの違反",
  "Action": "アクション",
  "Invite your team to join your organization": "チーム（メンバー）をあなたの組織に追加しましょう。",
  "Enter or paste one or more email addressess, separated by spaces or commas.": "メールアドレスを入力ください。コンマもしくはスペース区切りで複数の入力・登録も可能です。",
  "Send invitations": "招待を送信",
  "Invite Team": "メンバーを招待する",
  "Total number of referrals by bot type": "ボットタイプ別のリファラル獲得数",
  "Total referrals": "リファラル獲得数の合計",
  "referrals": "リファラル",
  "How your AI traffic compares to others on TollBit": "TollBit内で、あなたのサイトのAIトラフィックが他と比較してどの位置にあるか",
  "You have more AI traffic than": "あなたのサイトはTollBit内の全サイトを100としたうち、上位",
  "of other publishers on TollBit": "に位置しています。例えばこの数値が95%だった場合、あなたのサイトのAIボットのトラフィック量はTollBitで観測しているサイトの中の上位5位には入っている、という意味になります。",
  "Previous": "前へ",
  "Next": "次へ",
  "1000?per page": "1000件ごとの表示",
  "1W": "1週間",
  "1M": "1ヶ月",
  "3M": "3ヶ月",
  "6M": "6ヶ月",
  "Main site": "メインサイト",
  "subdomain": "サブドメイン",
  "All": "全て",
  "TollBit subdomain": "TollBit サブドメイン",
  "Blocked": "ブロック済み",
  "Allowed": "許可済み",
  "Partially Forwarded": "一部転送済み",
  "Bots that are not allowed to access or scrape your main site. They are forwarded to your Tollbit subdomain.": "メインサイトへのアクセスやクローリングが許可されていないボットです。これらはあなたのTollbitサブドメインへ転送されます。",
  "Bots that are allowed to access and scrape to your main site.": "メインサイトへのアクセスやスクレイピングが許可されているボットです。",
  "There may be an issue with your bot paywall setup. Some bots are making it through to your main site.": "ボットのペイウォール設定に問題がある可能性があります。いくつかのボットがメインサイトに到達してしまっています。",
  "AI Bot scrapes ordered by total request count.": "AIボットの総クローリング数（降順）",
  "Total AI Bot scrapes": "AIボットの総クローリング数",
  "scrapes": "クロール",
  "How many human visits your site received each day from AI referrals": "AIプラットフォーム上からのリファラル経由であなたのサイトに訪れたユーザー数",
  "Percentile Metrics": "パーセンタイル指標",
  "2D": "2日",
  "All AI User Agents": "全てのAIユーザーエージェント",
  "Organization Home": "組織のホームへ戻る",
  "Property:": "サイト：",
  "Logout": "ログアウト",
  "AI bot scrapes": "AIボットのクロール数",
  "percentile": "パーセンタイル",
  "from previous": "前期間との比較",
  "AI bots made": "AIボットのクロールは",
  "to your website,": "あなたのサイトに訪問してきており、前期間と比較して、",
  "from the previous week.": "しています。",
  "from the last month.": "しています。",
  "from the last three months.": "しています。",
  "from the last six months.": "しています。",
  "Last month": "先月",
  "Last three months": "過去3ヶ月",
  "Last six months": "過去6ヶ月",
  "You receive more traffic from AI bots than": "あなたのサイトはTollBit内の全サイトを100としたうち、上位",
  "of other publishers.": "に位置しています。例えばこの数値が95%だった場合、あなたのサイトのAIボットのトラフィック量はTollBitで観測しているサイトの中の上位5位には入っている、という意味になります。",
  "of AI traffic": "を占める",
  "Shows how much of your AI traffic comes from this bot compared to other publishers.": "他のパブリッシャーと比較して、あなたのAIトラフィックのうちどれだけがこのボットから来ているかを示します。",
  "initiated": "は",
  "and made up": "本サイト内に占めるAIボットのうち",
  "of your AI bot scrapes.": "を占めています。",
  "Your site ranks in the": "あなたのサイトはTollBit内の全サイトを100としたうち、上位",
  "Most-scraped pages": "最もクローリングされているページ",
  "Your website's pages AI bots visited the most.": "あなたのサイトで、AIボットが最も多く訪れたページ",
  "Top 5 Pages": "上位5ページ",
  "Your most frequently scraped content.": "あなたのコンテンツの中で最も頻繁にクロールされたもの",
  "Your homepage": "あなたのサイトを",
  "was scraped the most.": "最もクローリングしているAIボット",
  "Breakdown by AI platform:": "AIプラットフォーム別の内訳",
  "Referral traffic": "リファラルトラフィック合計",
  "AI companies brought": "AI事業社は前期間とくらべて、",
  "over the last": "をもたらし、",
  "from the previous period": "（前期間比）",
  "was the top referrer with": "が最も多くのリファラル数をもたらし、その回数は",
  "Scrape-to-referral ratio": "クローリング数とリファラ数の比較",
  "How often AI bot scrapes result in a human visit.": "1回のリファラルは何回のAIボットによるクローリングによってもたらされるか",
  "Total AI referrals": "総リファラル数",
  "Total scrapes": "総クロール数",
  "For every": "合計、",
  "scrapes you get 1 AI referral": "回のクローリングにつき、1回のリファラルを獲得",
  "Top referrers": "リファラルをもたらす上位AI事業社",
  "AI companies sending the most traffic to your site.": "あなたのサイトにリファラルをもたらす上位AI事業社",
  "times": "回",
  "three months": "過去3ヶ月で",
  "six months": "過去6ヶ月で",
  "week": "過去1週で",
  "Data includes only fully processed days. Recent days or days before your property joined may not appear.": "データには、処理が完了した日だけが含まれています。最近の日付や、あなたのサイトが追加される参加する前の期間は表示されない場合があります。",
  "You receive more traffic from this bot than 100% of other publishers.": "TollBit内の全サイトの中で、このボットに最もアクセス（クロール）されていることを意味します。",
  "per page": "ページごとの表示",
  "decreased to": "は減少傾向に向かっていて、その数、",
  "increased to": "は増加傾向に向かっていて、その数、",
  "Shows what percentage of your AI traffic comes from this specific bot compared to other publishers.": "他のサイトと比較して、あなたのサイトでは、AIトラフィックのうちどのくらいの割合がこの特定のボットから来ているかを示しています。",
  "Calculation: (This bot's hits ÷ Your total AI traffic) x 100 = Bot traffic %": "計算式：（このボットのトラフィック数 ÷ あなたのサイトでのAIトラフィックの総数） × 100 ＝ ボットトラフィックの割合（％）",
  "You have more AI traffic from this bot than": "あなたのサイトは、このボットからのAIトラフィックが多く、他の",
  "of other publishers": "サイトよりも多いです。",
  "99th": "$1%の",
  "Add rates to your content based on the website structure.": "サイトの構造に基づいて、コンテンツに価格を設定してください。",
  "Define Global Rates for your content across all subdirectories and pages. These rates apply for each use and do not allow your content to be used for training or creating generative AI models.": "すべてのサブディレクトリやページに対して適用される「統一価格」を定義してください。\nこの価格はクローリングごとに適用され、あなたのコンテンツが生成AIモデルの学習や生成目的に使用されることは許可されません。",
  "The Summarization Content License means that purchasing Developers will be granted a non-exclusive, non-transferable, non-assignable, non-sublicensable, and revocable (pursuant to the Content Access Terms linked below) right and license for the Term to access, index, and process the Publisher Data solely to summarize, cite, and display ground inferences based upon Provider Data to end users, provided Developer is prohibited from displaying the full text of the Provider Data to end users.": "要約用ライセンスとは、購入したAI事業社に対し、非独占的・譲渡不可・再許諾不可・取消可能（下記リンク先の「コンテンツアクセス規約」に従う）な権利およびライセンスを、契約期間中に付与するものです。\nAI事業社はこれにより、サイトのコンテンツにアクセス・インデックス化・処理して、要約・引用・根拠に基づく推論結果をエンドユーザーに表示することができます。\nただし、提供データの全文をエンドユーザーに表示することは禁止されています。",
  "The Full Display Content License means that purchasing Developers will be granted a non-exclusive, non-transferable, non-assignable, non-sublicensable, and revocable (pursuant to the Content Access Terms linked below) right and license for the Term to access, index, and process the Publisher Data to summarize, cite, and display ground inferences based upon Provider Data to end users, including displaying the full text of Provider Data to end users.": "全文表示コンテンツライセンスとは、購入したAI事業社に対し、非独占的・譲渡不可・再許諾不可・取消可能（下記リンク先の「コンテンツアクセス規約」に従う）な権利およびライセンスを、契約期間中に付与するものです。\nこれにより、AI事業社はサイトのコンテンツデータを要約・引用・処理し、提供データの全文をエンドユーザーに表示することも可能です。",
  "By clicking Activate, you agree to the": "「有効化」をクリックすることで、",
  "license terms": "コンテンツアクセス規約",
  "shown above.": "に同意したものとみなされます。",
  "Consider your syndication rates as a benchmark when setting this rate": "この料金を設定する際は、既存のコンテンツ配信（シンジケーション）価格を基準として検討してください。",
  "Customize rates further for specific subdirectories, pages, or bots in the Advanced Settings. Global Rates are the default unless more customized rates are defined.": "「高度な設定」で、特定のサブディレクトリ、ページ、またはボットごとに価格をさらにカスタマイズできます。\n統一価格がデフォルト（初期設定）として適用されますが、より細かく設定された価格があればそちらが優先されます。",
  "Activate the Rates You Need": "必要な価格設定を有効化しましょう",
  "Set Up Each Type Below": "以下の4タイプの設定が可能",
  "Read the docs →": "ドキュメントを確認する",
  "Set special rates for any specific bots that accesses your platform.": "特定のボットに対して、特別な価格設定を行う",
  "Set a rate for a specific page on your website.": "特定のページに対して、特別な価格設定を行う",
  "Define how the rate of a page should change over time.": "最終更新から特定の時間が経過した場合の、特別な価格設定を行う",
  "Set a flat rate for all the content within a page directory of your site.": "サイト内の特定ディレクトリ配下のすべてのコンテンツに対して、特別な価格設定を行う",
  "Current Directory": "現在のディレクトリ",
  "This rate will be used for all sub directories and pages.": "この価格は、すべてのサブディレクトリおよびページに適用されます。",
  "Subdirectories": "ディレクトリ",
  "Prevent all access to URLs begining with a custom Prefix.": "特定のプレフィックス（接頭辞）で始まるURLへのすべてのアクセスを禁止します。"
};

  // パターンベース翻訳（正規表現）
  const PATTERN_TRANSLATIONS = [
  {
    "pattern": "Updated 55 days? ago",
    "replacement": "$1日前に更新"
  },
  {
    "pattern": "Members (12)",
    "replacement": "メンバー ($1)"
  },
  {
    "pattern": "AI bots made 1.1M requests to your website, down 27.8% from the previous week",
    "replacement": "AIボットがあなたのウェブサイトに$1万件のリクエストを行いました。前週比で$1%減少しています。"
  },
  {
    "pattern": "You receive more traffic from AI bots than 92% of other publishers",
    "replacement": "あなたは他のサイトの$1%より多く、AIボットからのトラフィックがあります。"
  },
  {
    "pattern": "Top 5 Bots?",
    "replacement": "上位$1ボット"
  },
  {
    "pattern": "Breakdown the top 5 most active bot agents accessing your content",
    "replacement": "あなたのコンテンツにアクセスしている最も活発なボットエージェント上位$1の内訳"
  },
  {
    "pattern": "$0.00",
    "replacement": "$$$1"
  },
  {
    "pattern": "down 27.8%",
    "replacement": "$1％減少"
  },
  {
    "pattern": "up 27.8%",
    "replacement": "$1％増加"
  },
  {
    "pattern": "You receive more traffic from this bot than 98% of other publishers.",
    "replacement": "あなたはこのボットから他の$1%のサイトより多くのトラフィックを受け取っています。"
  },
  {
    "pattern": "only (\\d+)% of websites were scraped more",
    "replacement": "$1％に位置しています。"
  },
  {
    "pattern": "no websites were scraped more",
    "replacement": "どのサイトよりも多く、このAIボットにクロールされています。"
  },
  {
    "pattern": "You receive more traffic from this bot than 97% of other publishers.",
    "replacement": "あなたのサイトは、このボットから他のサイトの$1％よりも多くのボットトラフィックを受け取っています。"
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
      console.log(`[翻訳] "${trimmed.substring(0, 30)}..." → "${japanese.substring(0, 30)}..."`);
      return true;
    }

    // 正規化版で検索
    if (normalized !== trimmed && TRANSLATIONS[normalized]) {
      const japanese = TRANSLATIONS[normalized];
      node.nodeValue = node.nodeValue.replace(trimmed, japanese);
      translatedNodes.add(node);
      totalTranslations++;
      console.log(`[翻訳(正規化)] "${trimmed}" → "${japanese}"`);
      return true;
    }

    // 2. パターンマッチング（正規表現）
    for (const patternObj of PATTERN_TRANSLATIONS) {
      try {
        const regex = new RegExp(patternObj.pattern, 'i');
        if (regex.test(normalized)) {
          const japanese = normalized.replace(regex, patternObj.replacement);
          node.nodeValue = node.nodeValue.replace(trimmed, japanese);
          translatedNodes.add(node);
          totalTranslations++;
          console.log(`[パターン翻訳] "${trimmed}" → "${japanese}"`);
          return true;
        }
      } catch (e) {
        console.error(`[パターンエラー] ${patternObj.pattern}:`, e);
      }
    }

    return false;
  }

  /**
   * ドキュメントを翻訳（再帰的）
   */
  function translateDocument(doc, label = 'document') {
    if (!doc || !doc.body) return 0;

    let count = 0;

    try {
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

      if (count > 0) {
        console.log(`[翻訳完了] ${label}: ${count}個`);
      }
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
      console.log(`[iframe検索] ${label}: ${iframes.length}個発見`);

      iframes.forEach((iframe, index) => {
        try {
          // contentDocumentにアクセス可能かチェック
          if (iframe.contentDocument) {
            const iframeLabel = `${label}/iframe-${index}`;
            console.log(`[iframe処理] ${iframeLabel} - アクセス可能`);

            // iframeのドキュメントを翻訳（再帰的）
            setTimeout(() => {
              translateAllFrames(iframe.contentDocument, depth + 1, iframeLabel);
            }, 100);
          } else {
            console.log(`[iframe スキップ] ${label}/iframe-${index} - Cross-origin`);
          }
        } catch (e) {
          console.log(`[iframe エラー] ${label}/iframe-${index}:`, e.message);
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
            console.log('[iframe追加検出] 新しいiframeを処理');
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
              console.log(`[iframe追加検出] ${iframes.length}個の新しいiframe`);
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

    console.log('[MutationObserver] iframe監視開始');
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
    console.log('[初回翻訳] 実行');
    translateAllFrames(document, 0, 'top');

    // 段階的に再実行（iframeの遅延読み込みに対応）
    const timings = [
      200, 500, 1000, 1500, 2000, 3000,
      5000, 8000, 10000
    ];

    timings.forEach((ms, i) => {
      setTimeout(() => {
        console.log(`[段階的翻訳] ${i + 1}/${timings.length} (${ms}ms)`);
        translateAllFrames(document, 0, `top-${ms}ms`);
      }, ms);
    });

    // MutationObserver セットアップ
    setTimeout(() => {
      setupIframeObserver();
      setupTextObserver(document);
    }, 1000);

    // 永続的な定期監視（5秒間隔）
    setInterval(() => {
      console.log('[定期監視] 全フレーム再翻訳');
      translateAllFrames(document, 0, 'top-periodic');
    }, 5000);
  }

  /**
   * 起動（全フレームで実行）
   */
  const frameLabel = window === window.top ? 'top' : 'iframe';
  console.log(`[起動] ${frameLabel}フレームで実行`);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (window === window.top) {
        setupTranslation();
      } else {
        // iframe内では自身のみを翻訳
        console.log('[iframe起動] 自身を翻訳');
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
      console.log('[iframe起動] 自身を翻訳');
      translateDocument(document, 'iframe-init');
      setupTextObserver(document);

      setInterval(() => {
        translateDocument(document, 'iframe-periodic');
      }, 2000);
    }
  }

  if (window === window.top) {
    window.addEventListener('load', () => {
      console.log('[load イベント] 追加翻訳');
      translateAllFrames(document, 0, 'top-on-load');
    });
  }

})();
