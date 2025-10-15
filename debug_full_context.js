// DevToolsのConsoleで実行する包括的デバッグスクリプト
// "-27.8%" の周辺要素とテキストノードを完全に調査

(function() {
  console.log('=== 包括的DOM構造デバッグ ===\n');

  // 1. negative spanを検索
  const negativeSpans = document.querySelectorAll('span.font-bold.text-tb-negative');
  console.log(`見つかったnegative span: ${negativeSpans.length}個\n`);

  negativeSpans.forEach((span, index) => {
    console.log(`━━━ [Span #${index + 1}] ━━━`);
    console.log('【対象span】');
    console.log('  textContent:', span.textContent);
    console.log('  HTML:', span.outerHTML);

    // 2. 親要素の調査
    console.log('\n【親要素】');
    const parent = span.parentElement;
    if (parent) {
      console.log('  tagName:', parent.tagName);
      console.log('  className:', parent.className);
      console.log('  textContent:', parent.textContent);
      console.log('  HTML:', parent.outerHTML.substring(0, 200) + '...');
    }

    // 3. 兄弟ノード（前後）の調査
    console.log('\n【前の兄弟ノード】');
    let prev = span.previousSibling;
    let prevCount = 0;
    while (prev && prevCount < 3) {
      if (prev.nodeType === 3) { // Text node
        console.log(`  [Text ${prevCount}]: "${prev.nodeValue}"`);
      } else if (prev.nodeType === 1) { // Element
        console.log(`  [Element ${prevCount}]: <${prev.tagName.toLowerCase()}> "${prev.textContent}"`);
      }
      prev = prev.previousSibling;
      prevCount++;
    }

    console.log('\n【次の兄弟ノード】');
    let next = span.nextSibling;
    let nextCount = 0;
    while (next && nextCount < 3) {
      if (next.nodeType === 3) { // Text node
        console.log(`  [Text ${nextCount}]: "${next.nodeValue}"`);
      } else if (next.nodeType === 1) { // Element
        console.log(`  [Element ${nextCount}]: <${next.tagName.toLowerCase()}> "${next.textContent}"`);
      }
      next = next.nextSibling;
      nextCount++;
    }

    // 4. 親要素の全子ノードを順番に表示
    console.log('\n【親要素の全子ノード（順番通り）】');
    if (parent) {
      parent.childNodes.forEach((child, i) => {
        if (child.nodeType === 3) {
          const text = child.nodeValue.trim();
          if (text) {
            console.log(`  [${i}] Text: "${child.nodeValue}"`);
          }
        } else if (child.nodeType === 1) {
          console.log(`  [${i}] <${child.tagName.toLowerCase()}>: "${child.textContent}"`);
          if (child === span) {
            console.log(`       ↑ これが対象のspan`);
          }
        }
      });
    }

    // 5. パターンマッチングテスト
    console.log('\n【パターンマッチングテスト】');
    const spanText = span.textContent.trim();
    const parentText = parent ? parent.textContent.trim() : '';

    console.log(`  span単体: "${spanText}"`);
    console.log(`  親要素全体: "${parentText}"`);

    // 既存パターン
    const pattern1 = /down ([\d.]+)%/i;
    console.log(`  パターン1 "down ([\d.]+)%":`);
    console.log(`    span単体でマッチ: ${pattern1.test(spanText)}`);
    console.log(`    親要素でマッチ: ${pattern1.test(parentText)}`);

    // 新パターン候補
    const pattern2 = /-([\d.]+)%/;
    console.log(`  パターン2 "-([\d.]+)%":`);
    console.log(`    span単体でマッチ: ${pattern2.test(spanText)}`);
    if (pattern2.test(spanText)) {
      const match = spanText.match(pattern2);
      console.log(`    キャプチャ: $1="${match[1]}"`);
      console.log(`    置換結果: "${spanText.replace(pattern2, '$1％減少')}"`);
    }

    console.log('\n');
  });

  // 6. 拡張機能のログ確認
  console.log('━━━ [拡張機能ログ確認] ━━━');
  console.log('Consoleで "[TollBit日本語化]" または "[パターン翻訳]" で始まるログを確認してください');
  console.log('ログが表示されない場合、拡張機能が実行されていない可能性があります\n');

})();
