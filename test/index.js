const base = 'https://test.com/path';
const variants = [
  undefined,
  null,
  '',
  base,
];
const HASH_COMBINATIONS = [
  '#',
  '#a',
  '#a=1',
  '#?a=1',
  '#?a=1&b=2',
];
const FD_COMBINATIONS = [
  '',
  ':~:',
  ':~:a',
  ':~:a=1',
  ':~:text',
  ':~:text=1',
  ':~:a=1&text=2',
  ':~:text=1&a=2',
  ':~:text=1&a',
  ':~:text&a=1',
];

HASH_COMBINATIONS.forEach(hc => {
  FD_COMBINATIONS.forEach(fdc => {
    variants.push(base + hc + fdc);
  });
});

const links = variants.map(v => ({ href: v }));
global.document = {
  querySelectorAll: () => links,
};

// Run!
require('../app/scripts/index.js');
const results = links.map(l => l.href);

const expected = [
  /* Test 0  | undefined                                   */ undefined,
  /* Test 1  | null                                        */ null,
  /* Test 2  | ''                                          */ '',
  /* Test 3  | https://test.com/path                       */ 'https://test.com/path',
  /* Test 4  | https://test.com/path#                      */ 'https://test.com/path#',
  /* Test 5  | https://test.com/path#:~:                   */ 'https://test.com/path#',
  /* Test 6  | https://test.com/path#:~:a                  */ 'https://test.com/path#:~:a=',
  /* Test 7  | https://test.com/path#:~:a=1                */ 'https://test.com/path#:~:a=1',
  /* Test 8  | https://test.com/path#:~:text               */ 'https://test.com/path#',
  /* Test 9  | https://test.com/path#:~:text=1             */ 'https://test.com/path#',
  /* Test 10 | https://test.com/path#:~:a=1&text=2         */ 'https://test.com/path#:~:a=1',
  /* Test 11 | https://test.com/path#:~:text=1&a=2         */ 'https://test.com/path#:~:a=2',
  /* Test 12 | https://test.com/path#:~:text=1&a           */ 'https://test.com/path#:~:a=',
  /* Test 13 | https://test.com/path#:~:text&a=1           */ 'https://test.com/path#:~:a=1',
  /* Test 14 | https://test.com/path#a                     */ 'https://test.com/path#a',
  /* Test 15 | https://test.com/path#a:~:                  */ 'https://test.com/path#a',
  /* Test 16 | https://test.com/path#a:~:a                 */ 'https://test.com/path#a:~:a=',
  /* Test 17 | https://test.com/path#a:~:a=1               */ 'https://test.com/path#a:~:a=1',
  /* Test 18 | https://test.com/path#a:~:text              */ 'https://test.com/path#a',
  /* Test 19 | https://test.com/path#a:~:text=1            */ 'https://test.com/path#a',
  /* Test 20 | https://test.com/path#a:~:a=1&text=2        */ 'https://test.com/path#a:~:a=1',
  /* Test 21 | https://test.com/path#a:~:text=1&a=2        */ 'https://test.com/path#a:~:a=2',
  /* Test 22 | https://test.com/path#a:~:text=1&a          */ 'https://test.com/path#a:~:a=',
  /* Test 23 | https://test.com/path#a:~:text&a=1          */ 'https://test.com/path#a:~:a=1',
  /* Test 24 | https://test.com/path#a=1                   */ 'https://test.com/path#a=1',
  /* Test 25 | https://test.com/path#a=1:~:                */ 'https://test.com/path#a=1',
  /* Test 26 | https://test.com/path#a=1:~:a               */ 'https://test.com/path#a=1:~:a=',
  /* Test 27 | https://test.com/path#a=1:~:a=1             */ 'https://test.com/path#a=1:~:a=1',
  /* Test 28 | https://test.com/path#a=1:~:text            */ 'https://test.com/path#a=1',
  /* Test 29 | https://test.com/path#a=1:~:text=1          */ 'https://test.com/path#a=1',
  /* Test 30 | https://test.com/path#a=1:~:a=1&text=2      */ 'https://test.com/path#a=1:~:a=1',
  /* Test 31 | https://test.com/path#a=1:~:text=1&a=2      */ 'https://test.com/path#a=1:~:a=2',
  /* Test 32 | https://test.com/path#a=1:~:text=1&a        */ 'https://test.com/path#a=1:~:a=',
  /* Test 33 | https://test.com/path#a=1:~:text&a=1        */ 'https://test.com/path#a=1:~:a=1',
  /* Test 34 | https://test.com/path#?a=1                  */ 'https://test.com/path#?a=1',
  /* Test 35 | https://test.com/path#?a=1:~:               */ 'https://test.com/path#?a=1',
  /* Test 36 | https://test.com/path#?a=1:~:a              */ 'https://test.com/path#?a=1:~:a=',
  /* Test 37 | https://test.com/path#?a=1:~:a=1            */ 'https://test.com/path#?a=1:~:a=1',
  /* Test 38 | https://test.com/path#?a=1:~:text           */ 'https://test.com/path#?a=1',
  /* Test 39 | https://test.com/path#?a=1:~:text=1         */ 'https://test.com/path#?a=1',
  /* Test 40 | https://test.com/path#?a=1:~:a=1&text=2     */ 'https://test.com/path#?a=1:~:a=1',
  /* Test 41 | https://test.com/path#?a=1:~:text=1&a=2     */ 'https://test.com/path#?a=1:~:a=2',
  /* Test 42 | https://test.com/path#?a=1:~:text=1&a       */ 'https://test.com/path#?a=1:~:a=',
  /* Test 43 | https://test.com/path#?a=1:~:text&a=1       */ 'https://test.com/path#?a=1:~:a=1',
  /* Test 44 | https://test.com/path#?a=1&b=2              */ 'https://test.com/path#?a=1&b=2',
  /* Test 45 | https://test.com/path#?a=1&b=2:~:           */ 'https://test.com/path#?a=1&b=2',
  /* Test 46 | https://test.com/path#?a=1&b=2:~:a          */ 'https://test.com/path#?a=1&b=2:~:a=',
  /* Test 47 | https://test.com/path#?a=1&b=2:~:a=1        */ 'https://test.com/path#?a=1&b=2:~:a=1',
  /* Test 48 | https://test.com/path#?a=1&b=2:~:text       */ 'https://test.com/path#?a=1&b=2',
  /* Test 49 | https://test.com/path#?a=1&b=2:~:text=1     */ 'https://test.com/path#?a=1&b=2',
  /* Test 50 | https://test.com/path#?a=1&b=2:~:a=1&text=2 */ 'https://test.com/path#?a=1&b=2:~:a=1',
  /* Test 51 | https://test.com/path#?a=1&b=2:~:text=1&a=2 */ 'https://test.com/path#?a=1&b=2:~:a=2',
  /* Test 52 | https://test.com/path#?a=1&b=2:~:text=1&a   */ 'https://test.com/path#?a=1&b=2:~:a=',
  /* Test 53 | https://test.com/path#?a=1&b=2:~:text&a=1   */ 'https://test.com/path#?a=1&b=2:~:a=1',
];

const differences = [];
variants.forEach((variant, index) => {
  if (results[index] !== expected[index]) {
    differences.push(`Error for case ${index} (${variant})${'\n'}Expected ${expected[index]}, but got ${results[index]}${'\n'}`);
  }
});

if (differences.length) {
  throw new Error(differences.join('\n'));
}

console.log('Success!');
