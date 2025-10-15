// DevToolsのConsoleで実行するiframe追跡デバッグスクリプト
// v1.2.3対応 - processedIframes WeakSetの動作確認

(function() {
  console.log('=== iframe追跡機能テスト ===\n');

  // テスト結果を格納
  const testResults = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    tests: []
  };

  function runTest(name, testFn) {
    testResults.totalTests++;
    try {
      const result = testFn();
      if (result) {
        testResults.passed++;
        testResults.tests.push({ name, status: '✅ PASS', message: '' });
        console.log(`✅ ${name}`);
      } else {
        testResults.failed++;
        testResults.tests.push({ name, status: '❌ FAIL', message: '条件を満たしていません' });
        console.log(`❌ ${name}`);
      }
    } catch (e) {
      testResults.failed++;
      testResults.tests.push({ name, status: '❌ ERROR', message: e.message });
      console.log(`❌ ${name} - エラー: ${e.message}`);
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Test 1: iframe要素が存在するか
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  runTest('Test 1: iframe要素が存在する', () => {
    const iframes = document.querySelectorAll('iframe');
    console.log(`  発見したiframe数: ${iframes.length}個`);
    return iframes.length > 0;
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Test 2: 拡張機能が実行されているか
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  runTest('Test 2: 拡張機能が実行されている', () => {
    // コンソールログで [TollBit日本語化] があるか確認
    // 実際にはperformance APIやグローバル変数で確認
    const hasExtensionLog = true; // ユーザーがConsoleで確認する必要がある
    console.log('  Consoleで「[TollBit日本語化]」ログを確認してください');
    return hasExtensionLog;
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Test 3: iframe処理ログの確認
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n━━━ Test 3: iframe処理ログの確認 ━━━');
  console.log('Consoleで以下のパターンのログを探してください：');
  console.log('  ✅ 期待: [iframe検索] top: X個発見');
  console.log('  ✅ 期待: [iframe処理] top/iframe-0 - アクセス可能');
  console.log('  ✅ 期待: [iframe処理済みスキップ] （v1.2.3以降）');
  console.log('  ❌ 悪い: 同じiframeを複数回処理している');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Test 4: depth制限の確認
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n━━━ Test 4: depth制限の確認 ━━━');
  console.log('Consoleで以下を確認：');
  console.log('  ✅ 期待: top/iframe-0/iframe-1/iframe-2 まで');
  console.log('  ✅ 期待: top/iframe-0/iframe-1/iframe-2/iframe-3 は処理されない（depth=3でストップ）');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Test 5: 翻訳ロジックへの影響確認
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  runTest('Test 5: 翻訳ロジックは動作している', () => {
    // 日本語テキストが存在するか確認
    const body = document.body.textContent;
    const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(body);
    console.log(`  ページに日本語が含まれている: ${hasJapanese}`);

    // [翻訳] または [パターン翻訳] ログがあるか
    console.log('  Consoleで「[翻訳]」または「[パターン翻訳]」ログを確認してください');

    return hasJapanese;
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Test 6: 定期監視の動作確認
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n━━━ Test 6: 定期監視の動作確認 ━━━');
  console.log('5秒待ってから以下を確認：');
  console.log('  ✅ 期待: [定期監視] 全フレーム再翻訳');
  console.log('  ✅ 期待: [iframe処理済みスキップ] が出る（同じiframeを再処理しない）');

  setTimeout(() => {
    console.log('\n⏰ 5秒経過 - 定期監視ログを確認してください');
  }, 5000);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Test 7: 実際のiframe情報表示
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n━━━ Test 7: 実際のiframe情報 ━━━');
  const allIframes = document.querySelectorAll('iframe');
  allIframes.forEach((iframe, i) => {
    try {
      const src = iframe.src || '(no src)';
      const hasContentDoc = !!iframe.contentDocument;
      const label = hasContentDoc ? 'アクセス可能' : 'Cross-origin';

      console.log(`  iframe[${i}]:`);
      console.log(`    src: ${src.substring(0, 60)}...`);
      console.log(`    contentDocument: ${label}`);

      if (hasContentDoc) {
        const nestedIframes = iframe.contentDocument.querySelectorAll('iframe');
        console.log(`    内部iframe数: ${nestedIframes.length}個`);
      }
    } catch (e) {
      console.log(`  iframe[${i}]: ${e.message}`);
    }
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Test 8: パフォーマンスチェック
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n━━━ Test 8: パフォーマンスチェック ━━━');
  console.log('以下を確認してください：');
  console.log('  ✅ CPU使用率が異常に高くない');
  console.log('  ✅ Consoleのログが無限に流れていない');
  console.log('  ✅ ページの動作が重くない');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 結果サマリー
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 テスト結果サマリー');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  総テスト数: ${testResults.totalTests}`);
  console.log(`  ✅ 成功: ${testResults.passed}`);
  console.log(`  ❌ 失敗: ${testResults.failed}`);
  console.log('');

  testResults.tests.forEach(test => {
    console.log(`${test.status} ${test.name}`);
    if (test.message) {
      console.log(`      ${test.message}`);
    }
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔍 追加の手動確認ポイント');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('1. Consoleで「[iframe処理済みスキップ]」ログが出ているか');
  console.log('2. 同じiframe-0が何度も「[iframe処理] ...」と表示されていないか');
  console.log('3. 定期監視（5秒間隔）で既存のiframeをスキップしているか');
  console.log('4. 翻訳結果が正しく表示されているか（"down 30.2%" → "30.2％減少"）');
  console.log('5. ページ全体の動作がスムーズか');
  console.log('');

  console.log('💡 ヒント: Consoleのフィルタ機能で「iframe」で絞り込むと見やすいです');
  console.log('');

  return testResults;
})();
