// パターン翻訳の簡易テスト
const fs = require('fs');

// content-cross-frame.jsから直接PATTERN_TRANSLATIONSを抽出
const content = fs.readFileSync('content-cross-frame.js', 'utf8');

// PATTERN_TRANSLATIONSを抽出
const startIndex = content.indexOf('const PATTERN_TRANSLATIONS = [');
const endIndex = content.indexOf('];', startIndex) + 2;
const patternCode = content.substring(startIndex, endIndex);

// eval でパターンを取得
eval(patternCode);

// テストケース
const testCases = [
  { input: 'down 30.2%', expected: '30.2％減少' },
  { input: 'up 15.7%', expected: '15.7％増加' },
  { input: 'Updated 55 days ago', expected: '55日前に更新' },
  { input: 'Members (5)', expected: 'メンバー (5)' },
  { input: 'AI bots made 1.2K requests to your website, down 30.2% from the previous week',
    expected: 'AIボットがあなたのウェブサイトに1.2K万件のリクエストを行いました。前週比で30.2%減少しています。' }
];

console.log('=== PATTERN TRANSLATION TESTS ===\n');

let passCount = 0;
let failCount = 0;

testCases.forEach((testCase, index) => {
  const input = testCase.input;
  let result = null;
  let matchedPattern = null;

  // パターンマッチング
  for (const patternObj of PATTERN_TRANSLATIONS) {
    try {
      const regex = new RegExp(patternObj.pattern, 'i');
      if (regex.test(input)) {
        result = input.replace(regex, patternObj.replacement);
        matchedPattern = patternObj.pattern;
        break;
      }
    } catch (e) {
      console.error(`[エラー] ${patternObj.pattern}:`, e.message);
    }
  }

  const pass = result === testCase.expected;

  if (pass) {
    passCount++;
    console.log(`✅ Test #${index + 1}: PASS`);
  } else {
    failCount++;
    console.log(`❌ Test #${index + 1}: FAIL`);
    console.log(`   Input:    "${input}"`);
    console.log(`   Expected: "${testCase.expected}"`);
    console.log(`   Got:      "${result || 'NO MATCH'}"`);
    if (matchedPattern) {
      console.log(`   Pattern:  "${matchedPattern}"`);
    }
  }
  console.log('');
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${testCases.length}`);
console.log(`Pass:  ${passCount}`);
console.log(`Fail:  ${failCount}`);

if (failCount > 0) {
  process.exit(1);
}
