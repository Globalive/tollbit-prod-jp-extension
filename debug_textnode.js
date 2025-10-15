// DevToolsのConsoleで実行するデバッグスクリプト
// "down 27.8%" の要素を調査

(function() {
  console.log('=== Text Node Debug Script ===');

  // "down" を含むspan要素を検索
  const spans = document.querySelectorAll('span.font-bold.text-tb-negative');

  console.log(`Found ${spans.length} negative spans`);

  spans.forEach((span, index) => {
    console.log(`\n[Span ${index + 1}]`);
    console.log('HTML:', span.outerHTML);
    console.log('textContent:', span.textContent);
    console.log('innerText:', span.innerText);

    // 子ノードを詳細に調査
    console.log('Child nodes:', span.childNodes.length);
    span.childNodes.forEach((node, i) => {
      if (node.nodeType === 3) { // Text node
        console.log(`  [${i}] Text node: "${node.nodeValue}" (length: ${node.nodeValue.length})`);
        console.log(`      Trimmed: "${node.nodeValue.trim()}"`);
      } else if (node.nodeType === 1) { // Element node
        console.log(`  [${i}] Element: <${node.tagName.toLowerCase()}> "${node.textContent}"`);
      }
    });

    // パターンマッチングテスト
    const text = span.textContent.trim();
    const pattern = /down ([\d.]+)%/i;
    const match = pattern.test(text);
    console.log(`Pattern test: ${match}`);
    if (match) {
      const result = text.replace(pattern, '$1％減少');
      console.log(`Expected translation: "${result}"`);
    }
  });
})();
