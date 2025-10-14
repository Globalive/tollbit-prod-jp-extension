/**
 * TollBit デモ 日本語化 - クロスフレーム対応版
 *
 * 動的に生成されるiframeにも対応
 * topフレームから全てのiframeにアクセスして翻訳
 */

(function() {
  'use strict';

  console.log('[TollBit日本語化] クロスフレーム対応版開始 v3.6.9 - Rates詳細設定画面の追加');

  // 翻訳辞書
  const TRANSLATIONS = {
    "Properties Home": "プロパティホーム",
    "API Access": "APIアクセス",
    "Payouts": "支払い",
    "Settings": "設定",
    "Next": "次へ",
    "Previous": "前へ",
    "Back": "戻る",
    "Skip": "スキップ",
    "Close": "閉じる",
    "Done": "完了",
    "Home": "ホーム",
    "Dashboard": "ダッシュボード",
    "Analytics": "分析",
    "Rates": "料金",
    "Define Rates": "料金を定義",
    "Users in this organization": "この組織のユーザー",
    "Invite Users": "ユーザーを招待",
    "Add Property": "プロパティを追加",
    "Logout": "ログアウト",
    "Users": "ユーザー",
    "Add a property": "プロパティを追加",
    "TollBit helps websites monitor, manage, and monetize bot scraping on their website - for free.": "TollBitはWebサイトのボットスクレイピングを無料で監視、管理、収益化することを支援します。",
    "The internet is changing - as more people adopt AI, website visits and ad revenue will continue to decline.": "インターネットは変化しています - より多くの人がAIを採用するにつれて、Webサイトの訪問数と広告収入は減少し続けます。",
    "Over 1,000 websites recognize this problem and have partnered with TollBit to protect their content.": "1,000以上のWebサイトがこの問題を認識し、TollBitと提携してコンテンツを保護しています。",
    "TollBit is free for websites and it will take your tech team less than 30 minutes to get started!": "TollBitはWebサイトに無料で提供され、技術チームは30分以内に開始できます！",
    "Summarization License": "要約ライセンス",
    "Full Display License": "全文表示ライセンス",
    "Price per 1,000 pages": "1000ページあたりの価格",
    "Set Global Rates For Your Content": "コンテンツのグローバル料金を設定する",
    "Powered by Navattic": "Powered by Navattic",
    "Book a Demo": "デモを予約",
    "Book A Demo": "デモを予約",
    "Get Started": "始める",

    // v3.2.0追加分 - UI要素
    "Admin": "管理者",
    "Member": "メンバー",
    "Open sidebar": "サイドバーを開く",
    "Your profile": "あなたのプロフィール",
    "Toggle theme": "テーマを切り替え",
    "Skip to capture": "キャプチャへスキップ",
    "Skip to content": "コンテンツへスキップ",
    "Updated": "更新日",
    "of": "/",
    "Home - Demo Media, Inc.": "ホーム - Demo Media, Inc.",
    "TollBit is free for websites": "TollBitは完全無料でご利用頂けます",
    "Add and select a property to get started monetizing your content.": "サイトを追加してコンテンツのマネタイズを始めましょう",

    // v3.3.0追加分 - デモツアー全16ページ対応
    // ボタン・ナビゲーション
    "Continue Tour": "ツアーを続ける",
    "See TollBit in Action": "TollBitの実際の動作を見る",
    "Sign Up Free": "無料でサインアップ",

    // ツアーセクション名
    "Introduction": "イントロダクション",
    "High level overview": "概要",
    "Organization Page": "組織ページ",
    "Click-Through Data": "クリックスルーデータ",
    "Robots.txt Report": "Robots.txtレポート",
    "AI Bot Reporting": "AIボットレポート",
    "Top Page Report": "トップページレポート",
    "Filtering Analytics": "フィルタリング分析",
    "Bot Paywall Transition": "ボットペイウォール設定",
    "Set Rates": "料金設定",
    "Sign Up/Book Demo": "サインアップ/デモ予約",

    // 機能説明（重要）
    "TollBit Analytics - reveals which AI bots are scraping your content, how often, and which pages they target": "TollBit アナリティクスは、どのAIボットがコンテンツをスクレイピングしているか、その頻度、対象ページを明らかにします",
    "Bot Paywall - blocks unauthorized AI bots from accessing your content": "ボットペイウォールは、未承認のAIボットによるコンテンツアクセスをブロックします",
    "Monetization - let you set custom pricing for AI companies": "マネタイズ機能により、AI企業向けのカスタム価格を設定できます",
    "AI chat bots on average drive click-throughs at a rate that is 96% lower than traditional Google search.": "AIチャットボットは、従来のGoogle検索と比較してクリックスルー率が平均96%低下します",
    "Across our users AI bot scrapes that bypassed robots.txt grew by over 40% in Q4.": "ユーザー全体で、robots.txtを回避したAIボットのスクレイピングがQ4に40%以上増加しました",

    // 詳細説明
    "Let's talk about the tools of TollBit at a high-level, then we will walk you through each of them on this tour:": "まず、TollBitのツールを概要レベルでご説明し、その後ツアーで各機能を詳しくご案内します",
    "Protect content across all of your websites with TollBit.": "TollBitで、すべてのWebサイトのコンテンツを保護しましょう",
    "With TollBit Analytics, websites can see which bots access their site, track popular pages, and make data-driven decisions to maximize their content's value in the AI era.": "TollBit アナリティクスにより、Webサイトはどのボットがアクセスしているか確認し、人気ページを追跡し、AI時代にコンテンツ価値を最大化するためのデータドリブンな意思決定ができます",
    "By implementing a bot paywall - websites can control which bots can access their content.": "ボットペイウォールを実装することで、Webサイトはどのボットがコンテンツにアクセスできるかを制御できます",
    "Start monitoring, managing, and monetizing AI bot scraping on your website today by signing up for TollBit.": "今すぐTollBitにサインアップして、WebサイトのAIボットスクレイピングの監視、管理、収益化を始めましょう",
    "TollBit's filters let you track scraping by bot and time period for clear insights.": "TollBitのフィルタ機能により、ボットや期間別のスクレイピングを追跡し、明確なインサイトが得られます",
    "Use TollBit Analytics to get a better understanding of how many bots are bypassing your robots.txt": "TollBit アナリティクスを使用して、robots.txtを回避しているボットの数をより深く理解しましょう",
    "Websites can set custom prices for their content": "Webサイトはコンテンツに対してカスタム価格を設定できます",
    "TollBit Analytics provides you with a comprehensive picture of click-throughs you receive from AI chat bots.": "TollBit アナリティクスは、AIチャットボットから受け取るクリックスルーの包括的な全体像を提供します",

    // v3.4.0追加分 - Analytics画面の詳細要素
    // 見出し（最優先）
    "All Bot Traffic": "全ボットトラフィック",
    "Clickthrough Rates from AI Bots": "AIが行う引用元表示からのクリック遷移獲得率",

    // 左サイドバー
    "Property List": "プロパティリスト",
    "Recent Transactions": "最近の取引",

    // Analytics画面要素
    "Dive into your data.": "データを深く分析しましょう",
    "Read the docs →": "ドキュメントを読む →",
    "Analytics for your main site.": "メインサイトの分析",
    "Analytics for forwarded traffic to your TollBit subdomain.": "TollBitサブドメインに転送されたトラフィックの分析",
    "All AI User Agents": "すべてのAIユーザーエージェント",
    "How many human visitors are AI bots sending you?": "AIが行う引用元表示からの実際の訪問者数を確認する",

    // 期間フィルター
    "2D": "2日",
    "1W": "1週間",
    "1M": "1ヶ月",
    "3M": "3ヶ月",

    // カテゴリフィルター
    "All": "すべて",
    "AI": "AI",
    "Search": "検索",

    // 統計表示
    "visits": "訪問数",
    "scrapes": "スクレイピング回数",
    "Referrals": "リファラル",
    "Your referral traffic by day": "日別のリファラルトラフィック",
    "Total referrals": "リファラル合計",

    // 説明文
    "Do you know how often AI is scraping your site?": "AIがどのくらいの頻度でサイトをスクレイピングしているかご存知ですか？",
    "AI Bot User Agents bypassing your robots.txt. Set up Bot Deterrence now.": "AI Botはrobots.txtをすり抜けてきます。今すぐ対策をしましょう。",

    // v3.5.0追加分 - HTML解析による包括的翻訳（30個）
    // ステップ名
    "Monetization Transition": "マネタイズ設定",
    "High level overview ": "概要",
    "Bot Paywall Transistion": "ボットペイウォール設定",
    "Bot Paywall Subdomain": "ボットペイウォールサブドメイン",

    // 分割されたテキスト（Introduction）
    "TollBit helps websites monitor, manage, and": "TollBitはWebサイトの監視、管理、",
    "monetize bot scraping on their website - for free.": "ボットスクレイピングの収益化を無料で支援します。",

    // 完全版の機能説明（High level overview）
    "TollBit Analytics - reveals which AI bots are scraping your content, how often, and which pages they target - giving you full visibility into bot activity.": "TollBit アナリティクス - どのAIボットがコンテンツをスクレイピングしているか、その頻度、対象ページを明らかにし、ボットアクティビティの完全な可視性を提供します。",
    " - reveals which AI bots are scraping your content, how often, and which pages they target - giving you full visibility into bot activity.": " - どのAIボットがコンテンツをスクレイピングしているか、その頻度、対象ページを明らかにし、ボットアクティビティの完全な可視性を提供します。",
    "Bot Paywall - blocks unauthorized AI bots from accessing your content and directs them to a controlled access point, ensuring only approved bots get through.": "ボットペイウォール - 未承認のAIボットによるコンテンツアクセスをブロックし、制御されたアクセスポイントに誘導することで、承認されたボットのみがアクセスできるようにします。",
    " - blocks unauthorized AI bots from accessing your content and directs them to a controlled access point, ensuring only approved bots get through.": " - 未承認のAIボットによるコンテンツアクセスをブロックし、制御されたアクセスポイントに誘導することで、承認されたボットのみがアクセスできるようにします。",
    "Monetization -  let you set custom pricing for AI companies, turning bot traffic into a monetization opportunity.": "マネタイズ - AI企業向けのカスタム価格を設定し、ボットトラフィックを収益化の機会に変えることができます。",
    " -  let you set custom pricing for AI companies, turning bot traffic into a monetization opportunity.": " - AI企業向けのカスタム価格を設定し、ボットトラフィックを収益化の機会に変えることができます。",

    // v3.5.5追加分 - Draft.js分割テキスト対応
    // モーダル内でタイトルと説明が別々のテキストノードになっている
    "TollBit Analytics -": "TollBit アナリティクス -",
    "reveals which AI bots are scraping your content, how often, and which pages they target - giving you full visibility into bot activity.": "どのAIボットがコンテンツをスクレイピングしているか、その頻度、対象ページを明らかにし、ボットアクティビティの完全な可視性を提供します。",
    "Bot Paywall -": "ボットペイウォール -",
    "blocks unauthorized AI bots from accessing your content and directs them to a controlled access point, ensuring only approved bots get through.": "未承認のAIボットによるコンテンツアクセスをブロックし、制御されたアクセスポイントに誘導することで、承認されたボットのみがアクセスできるようにします。",
    "Monetization -": "マネタイズ -",
    "let you set custom pricing for AI companies, turning bot traffic into a monetization opportunity.": "AI企業向けのカスタム価格を設定し、ボットトラフィックを収益化の機会に変えることができます。",

    // Organization Page
    "Whether your organization has one website or 50, you can implement TollBit on all of your websites. Invite as many team members as needed.": "組織が1つのWebサイトを持っていても50のWebサイトを持っていても、すべてのWebサイトにTollBitを実装できます。必要なだけチームメンバーを招待できます。",
    "Now let's take a closer look at TollBit Analytics.": "それでは、TollBit アナリティクスを詳しく見ていきましょう。",

    // Robots.txt Report
    "Use TollBit Analytics to get a better understanding of how many bots are bypassing your robots.txt.": "TollBit アナリティクスを使用して、robots.txtを回避しているボットの数をより深く理解しましょう。",
    "Across our users Al bot scrapes that bypassed robots.txt grew by over 40% in Q4.": "ユーザー全体で、robots.txtを回避したAIボットのスクレイピングがQ4に40%以上増加しました。",

    // AI Bot Reporting
    "The Total AI Bot User Agent Visits report will help you visualize and understand which bots are accessing your sites most often.": "AIボットユーザーエージェント訪問総数レポートは、どのボットが最も頻繁にサイトにアクセスしているかを視覚化し理解するのに役立ちます。",
    "The Top Bot agents report provides you with an additional breakdown of the most active bot agents on your site. You can filter these by all bots, ai agents, and seo agents.": "トップボットエージェントレポートは、サイト上で最もアクティブなボットエージェントの追加の内訳を提供します。すべてのボット、AIエージェント、SEOエージェントでフィルタリングできます。",
    "The Recent AI Bot Activity report which is where you can see the total bot traffic to your site over time, helping you identify unauthorized usage and trends.": "最近のAIボットアクティビティレポートでは、時間の経過とともにサイトへの総ボットトラフィックを確認でき、不正な使用とトレンドを特定するのに役立ちます。",

    // Top Page Report
    "In the Top Pages report TollBit Analytics provides a breakdown of how often each page on your site is being visited by ai bots, humans, and other bots which may include scrapers, seo bots, and other types of custom agents.": "トップページレポートでは、TollBit アナリティクスがサイトの各ページがAIボット、人間、スクレイパー、SEOボット、その他のカスタムエージェントを含む可能性のある他のボットによってどのくらいの頻度で訪問されているかの内訳を提供します。",

    // Filtering Analytics
    "TollBit's filters let you track scraping by bot and time period for clear insights.": "TollBitのフィルターを使うと、ボットごと・期間ごとにスクレイピングの状況を追跡でき、明確なインサイトを得ることができます。",

    // Bot Paywall Transition
    "Not only can TollBit help websites monitor bot scraping - we can manage it through our Bot Paywall.": "TollBit はボットのスクレイピングを監視するだけでなく、ボットペイウォール機能でそれを管理することもできます。",
    "Continue the tour to see our Bot Paywall and Rates features or book a demo to learn more.": "ツアーを続けて、ボットペイウォールと料金機能をご覧いただくか、デモを予約して詳細をご確認ください。",

    // Bot Paywall Subdomain
    "Unauthorized bots will be taken to a subdomain (tollbit.publisher.com) and told they can only access content with a valid TollBit Token.": "未承認のボットはサブドメイン（tollbit.publisher.com）に誘導され、有効なTollBitトークンでのみコンテンツにアクセスできることが通知されます。",
    "Once your Bot Paywall is set up - you can start letting bots access your content, if they are willing to pay.": "ボットペイウォールの設定が完了したら、支払いを希望するボットにコンテンツへのアクセスを許可できます。",

    // Monetization Transition
    "When AI tools scrape and repurpose your content, their users get answers without ever visiting your site - reducing traffic to your site and potentially revenue.": "AIツールがコンテンツをスクレイピングして再利用すると、ユーザーはサイトを訪問することなく回答を得られるため、サイトへのトラフィックと潜在的な収益が減少します。",
    "We can provide an alternative revenue source to offset this. TollBit provides a scalable, usage based model to monetize your content.": "これを相殺する代替収益源を提供できます。TollBitは、コンテンツを収益化するためのスケーラブルな使用量ベースのモデルを提供します。",
    "Lets check out Rates.": "料金設定を確認しましょう。",
    "We have two licenses in the platform today, one for summarization and one for full display. Each has their own set of rates associated with it.": "現在、プラットフォームには2つのライセンスがあります。1つは要約用、もう1つは全文表示用です。それぞれに独自の料金設定があります。",
    "A summarization license allows AI customers to use your content once to create a summary, grounding or citation.": "要約ライセンスは、AI顧客がコンテンツを1回使用して、要約、根拠、または引用を作成できるようにします。",
    "A full display license allows AI customers to show the full text of an article once.": "全文表示ライセンスは、AI顧客が記事の全文を1回表示できるようにします。",

    // Set Rates
    "Websites can set custom prices for their content.": "Webサイトはコンテンツに対してカスタム価格を設定できます。",
    "Set global summarization and full display license rates or create unique pricing per bot, page, directory, or based upon the newness of your content.": "グローバルな要約ライセンスと全文表示ライセンスの料金を設定するか、ボット、ページ、ディレクトリごと、またはコンテンツの新しさに基づいて独自の価格を作成できます。",

    // v3.5.9追加分 - CSVから追加
    "You are not authorized to access this content without a valid TollBit Token. Please follow this URL to find out more.": "有効なTollBitトークンがないため、このコンテンツにアクセスする権限がありません。詳細についてはこのURLをご確認ください。",
    "Asset Management": "アセットマネジメント",
    "Tiles": "タイル",
    "Legal": "法務",
    "API Auth Settings": "API認証設定",
    "Test Bot Forwarding": "ボットの転送を試す",

    // v3.6.0追加分 - CSV完全マージ（27エントリ）
    "Total AI Bot User Agents bypassing your robots.txt": "robots.txtをバイパスしているAIボットユーザーエージェントの総数",
    "AI bot user agents are blocked in your robots.txt but are still accessing your content. Set up Bot Deterrence now.": "AIボットユーザーエージェントは基本的にはrobots.txtでブロックされていますが、一部はすり抜けてきています。今すぐボット抑止機能を設定してください。",
    "View docs": "ドキュメントを表示",
    "Download as CSV": "CSVでダウンロード",
    "All Bots": "すべてのボット",
    "Bot Breakdown": "ボット内訳",
    "Bot Traffic": "ボットトラフィック",
    "Breakdown the top 5 most active bot agents accessing your content.": "あなたのコンテンツにアクセスしている最もアクティブなボットエージェント上位5つの内訳。",
    "Day": "日",
    "Host": "ホスト",
    "Hour": "時間",
    "How the most accessed pages break down by user agent category.": "最もアクセスされたページがユーザーエージェントカテゴリ別にどのように分布しているか。",
    "How the traffic looks over time for all AI user agents.": "全AIユーザーエージェントのトラフィックの時系列推移",
    "Human": "人間",
    "More pages": "その他のページ",
    "N/A": "該当なし",
    "OAI-SearchBot": "OAIサーチボット",
    "Other Bots": "その他のボット",
    "Page": "ページ",
    "Top Bot Agents": "トップボットエージェント",
    "Recent AI Bot Activity": "最近のAIボットアクティビティ",
    "Total AI Bot User Agent Visits": "AIボットユーザーエージェント訪問総数",
    "AI Bot user agent visits ordered by total request count.": "AIボットユーザーエージェント訪問数（総リクエスト数順）。",
    "Logs": "ログ",
    "View a sample of logs for the graph above.": "上記グラフのログサンプルを表示。",
    "Status Traffic": "ステータストラフィック",
    "Different http response status codes over time. Quickly monitor the health of your site.": "HTTPレスポンスステータスコードの時系列変化。サイトの健全性を素早く監視できます。",

    // v3.6.5追加分 - Rates設定画面の詳細（29エントリ）
    "Not only can TollBit help websites monitor bot scraping - we can": "TollBit はボットのスクレイピングを監視するだけでなく、",
    "manage it through our Bot Paywall": "ボットペイウォールで管理する",
    "AI Bot Clickthrough Rates - now available dating back to January 15th, 2025.": "AIボットのクリックスルー率 - 2025年1月15日まで遡って利用可能になりました。",
    "We can provide an alternative revenue source to offset this.": "TollBitはその機会損失を収益化に変えることが可能です。",
    "TollBit provides a scalable, usage based model to monetize your content.": "TollBit は、コンテンツを収益化するためのスケーラブルな従量課金モデルをAI事業社側に提示可能です。",
    "Add rates to your content based on the website structure.": "ウェブサイトの構造に基づいて、コンテンツに価格を設定します。",
    "Define Global Rates for your content across all subdirectories and pages. These rates apply for each use and do not allow your content to be used for training or creating generative AI models.": "すべてのサブディレクトリとページで一律の価格を定義します。これらのレートはスクレイピングされるごとに適用され、コンテンツを生成AIモデルの、トレーニングや作成に使用することはできません。",
    "This license allows AI customers to use your content once to create a summary, grounding or citation.": "このライセンスは、AIの利用者があなたのコンテンツを 1回だけ使用して、要約・グラウンディング（根拠付け）・引用を作成することを許可します。",
    "Tip:": "ヒント:",
    "Tip: Consider your current RPM as a benchmark when setting this rate": "ヒント: この価格を設定する際は、現在のRPM（1000PVあたりの売上）をベンチマークとして検討してください。",
    "Consider your current RPM as a benchmark when setting this rate": "この価格を設定する際は、現在のRPM（1000PVあたりの売上）をベンチマークとして検討してください。",
    "This license allows AI customers to show the full text of an article once.": "このライセンスは、AIの利用者が 記事の全文を一度だけ表示することを許可します。",
    "Tip: Consider your syndication rates as a benchmark when setting this rate": "ヒント：この料金を設定する際は、あなたのシンジケーション料金（記事配信の単価）をベンチマークとして考慮してください。",
    "Consider your syndication rates as a benchmark when setting this rate": "この料金を設定する際は、あなたのシンジケーション料金（記事配信の単価）をベンチマークとして考慮してください。",
    "ACTIVATED": "有効化",
    "Customize rates further for specific subdirectories, pages, or bots in the Advanced Settings. Global Rates are the default unless more customized rates are defined.": "詳細設定で、特定のサブディレクトリ、ページ、またはボットごとに料金をさらにカスタマイズできます。カスタマイズされた料金が定義されていない場合、あらかじめ設定してある一律の価格がデフォルトとして適用されます。",
    "Show Advanced Settings": "より詳細の機能を表示する。",
    "Options": "オプション",
    "Set special rates for any specific bots that accesses your platform.": "特定のボットに特別な料金を設定する。",
    "Set a rate for a specific page on your website.": "ウェブサイト上の特定のページに価格を設定します。",
    "Time": "時間",
    "Define how the rate of a page should change over time.": "ページの価格を時間の経過に応じてどのように変化させるかを定義します。",
    "Directory": "ディレクトリ",
    "Set a flat rate for all the content within a page directory of your site.": "サイトのページディレクトリ内のすべてのコンテンツに一律の価格を設定します。",
    "Page Path": "ページディレクトリ",
    "Fine grain control over access rates for specific pages.": "特定のページに対するアクセス料金を、細かい粒度で詳細に制御できます。",
    "Specific Page Access": "特定のページへのアクセスに対する個別設定",
    "Edit": "編集",
    "Delete": "削除",
    "Current Rate": "現在の価格",
    "Add Rate": "価格設定を追加する",

    // v3.6.9追加分 - Rates詳細設定画面（10エントリ）
    "This rate will be used for all sub directories and pages.": "この価格は、全てのサブディレクトリとページで使用されます。",
    "Current Directory": "現在のディレクトリ",
    "Custom Rate": "カスタム価格",
    "Price per 1,000 requests": "1,000リクエストごとの価格",
    "Subdirectories": "サブディレクトリ",
    "No Subdirectory information found.": "サブディレクトリの情報が存在しません。",
    "Manage URL Path Blocking": "URLパスでのブロック管理",
    "Prevent all access to URLs begining with a custom Prefix.": "カスタムのプレフィックス（接頭辞）で始まるURLへのすべてのアクセスを禁止します。",
    "1 Prefixes currently configured.": "現在1つのプレフィックスが設定されています。",
    "Updae": "更新"
  };

  // 翻訳済みノードを追跡（全フレーム共通）
  const translatedNodes = new WeakSet();
  let totalTranslations = 0;

  /**
   * テキストノードを翻訳
   */
  function translateTextNode(node) {
    if (!node || node.nodeType !== 3) return false;

    const text = node.nodeValue;
    if (!text) return false;

    const trimmed = text.trim();
    if (!trimmed || trimmed.length === 0) return false;

    // Draft.js要素の詳細デバッグ
    const parentElement = node.parentElement;
    let isDraftJs = false;
    if (parentElement) {
      const classStr = parentElement.className || '';
      const classString = typeof classStr === 'string' ? classStr : classStr.toString();

      isDraftJs = classString.includes('DraftStyleDefault') ||
        (parentElement.closest && parentElement.closest('.public-DraftStyleDefault-unorderedListItem') !== null);

      // デバッグ用（通常は無効化）
      const DEBUG_DRAFT_JS = false;
      if (isDraftJs && DEBUG_DRAFT_JS) {
        const matched = !!TRANSLATIONS[trimmed];
        if (!matched) {
          console.log(`[Draft.js未翻訳] "${trimmed.substring(0, 80)}..."`);
        }
      }
    }

    // 既に日本語に翻訳済みならスキップ（無限ループ防止）
    const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(trimmed);
    if (hasJapanese) {
      return false; // 日本語が含まれていれば翻訳済みとみなす
    }

    // 辞書検索
    if (TRANSLATIONS[trimmed]) {
      // 通常要素は既翻訳ならスキップ
      if (translatedNodes.has(node)) {
        return false;
      }

      const japanese = TRANSLATIONS[trimmed];
      node.nodeValue = node.nodeValue.replace(trimmed, japanese);
      translatedNodes.add(node);
      totalTranslations++;

      if (isDraftJs) {
        console.log(`[Draft.js翻訳] "${trimmed.substring(0, 30)}..." → "${japanese.substring(0, 30)}..."`);
      } else {
        console.log(`[翻訳] "${trimmed}" → "${japanese}"`);
      }
      return true;
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

      // Draft.js要素の変更を検出（ログ削減）
      let hasDraftJsChange = false;
      mutations.forEach((mutation) => {
        // characterDataの変更をチェック
        if (mutation.type === 'characterData') {
          const parent = mutation.target.parentElement;
          if (parent && parent.className) {
            const classStr = typeof parent.className === 'string' ? parent.className : parent.className.toString();
            if (classStr.includes('DraftStyleDefault')) {
              hasDraftJsChange = true;
            }
          }
        }

        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element
            // Draft.js要素を検出
            if (node.className) {
              const classStr = typeof node.className === 'string' ? node.className : node.className.toString();
              if (classStr.includes('DraftStyleDefault')) {
                hasDraftJsChange = true;
              }
            }

            // Navatticモーダルを検出
            if (node.classList && (
              node.classList.contains('nv-scale-dialog-center') ||
              node.classList.contains('py-ct-dialog-py') ||
              node.querySelector('.nv-scale-dialog-center') ||
              node.querySelector('.py-ct-dialog-py')
            )) {
              console.log('[モーダル検出] 全iframe含めて即座に翻訳実行');

              // topフレームから全iframeを再翻訳（モーダルがどのiframeにあっても対応）
              if (window === window.top) {
                setTimeout(() => {
                  console.log('[モーダル翻訳] 全フレーム再翻訳開始');
                  translateAllFrames(document, 0, 'modal-all-frames-1');
                }, 100);
                setTimeout(() => {
                  translateAllFrames(document, 0, 'modal-all-frames-2');
                }, 500);
                setTimeout(() => {
                  translateAllFrames(document, 0, 'modal-all-frames-3');
                }, 1000);
                setTimeout(() => {
                  translateAllFrames(document, 0, 'modal-all-frames-4');
                }, 2000);
              } else {
                // iframe内で検出された場合は、そのiframe自身を翻訳
                setTimeout(() => {
                  translateDocument(doc, 'modal-in-iframe-1');
                }, 100);
                setTimeout(() => {
                  translateDocument(doc, 'modal-in-iframe-2');
                }, 500);
              }
            }
          }
        });
      });

      // Draft.js変更があった場合、追加で再翻訳（ログなし）
      if (hasDraftJsChange) {
        setTimeout(() => {
          translateDocument(doc, 'draftjs-retranslate');
        }, 100);
      }
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
      5000, 8000, 10000, 15000
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

    // 永続的な定期監視（5秒間隔に短縮）
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
        }, 2000); // より頻繁に（2秒間隔）
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
