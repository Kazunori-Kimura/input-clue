
export const version = '1.0.0';

/**
 * キーボードの言語定義
 */
export const languages = {
  // タイ語
  thai: {
    dictionary: 'PdicThai-JP-092U.xlsx', // 辞書ファイル
    keycode: 'thai.json', // 文字コード定義ファイル
  },
  // 韓国語
  korean: {
    keycode: 'korean.json',
  },
  // タイ語&発音記号
  thai_pho: {
    keycode: 'thai_pho.json',
  },
  // 中国語ピンイン
  pinyin: {
    keycode: 'pinyin.json',
  },
  // ベトナム語
  vietnam: {
    keycode: 'vietnam.json',
  },
  // 古モンゴル語
  mongolian: {
    keycode: 'mongolian.json',
    fontFamily: 'Mongolian Baiti',
  },
  // ラオス語
  lao: {
    keycode: 'lao.json',
  },
  // ラオス語 拡張版
  lao_ext: {
    keycode: 'lao.json',
  },
  // ミャンマー語
  myanmar: {
    keycode: 'myanmar.json',
    fontFamily: 'Padauk',
  },
  // ミャンマー語・標準
  myanmar_basic: {
    keycode: 'myanmar_basic.json',
    fontFamily: 'Padauk',
  },
  // パシュトゥ語（アフガニスタン）
  pashto: {
    keycode: 'pashto.json',
  },
  // アッサム語
  assamese: {
    keycode: 'assamese.json',
  },
  // サンスクリット語
  sanskrit: {
    keycode: 'sanskrit.json',
  },
  // ベンガル語
  bengali: {
    keycode: 'bengali.json',
  },
  // クメール・カンボジア語
  kmer: {
    keycode: 'kmer.json',
  },
  // タミル語
  tamil: {
    keycode: 'tamil.json',
  },
  // シンハラ語
  sinhala: {
    keycode: 'sinhala.json',
  },
  // ネパール語
  napali: {
    keycode: 'napali.json',
  },
  // ヒンディー語
  hindi: {
    keycode: 'hindi.json',
  },
  // アラビア語サウジアラビア
  arabic: {
    keycode: 'arabic.json',
    direction: 'rtl',
  },
  // ヘブル語
  hebrew: {
    keycode: 'hebrew.json',
    fontFamily: 'DejaVu Sans',
    direction: 'rtl',
  },
  // シリア語
  syrian: {
    keycode: 'syrian.json',
    fontFamily: 'Estragelo Edessa',
    direction: 'rtl',
  },
  // トルコ語
  turkish: {
    keycode: 'turkish.json',
  },
  // トルコ語発音記号
  turkish_pho: {
    keycode: 'turkish_pho.json',
  },
  // ハンガリー語
  hangary: {
    keycode: 'hangary.json',
  },
  // 英語発音記号
  english_pho: {
    keycode: 'english_pho.json',
  },
  // モンゴルキリル
  cyrillic: {
    keycode: 'cyrillic.json',
  },
  // ロシア語
  russian: {
    keycode: 'russian.json',
  },
  // スオミ語
  suomi: {
    keycode: 'suomi.json',
  },
  // フランス語＆IPA
  french_pho: {
    keycode: 'french_pho.json',
  },
};

/**
 * インターフェイスの言語定義
 */
export const interfaceLanguages = [
  'ja', // 日本語
  'en', // 英語
];

/**
 * フォント指定
 */
export const BASE_FONTS = 'Emoji, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
