
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
  // korean: {
  //   dictionary: '', // 辞書ファイル
  //   keycode: '', // 文字コード定義ファイル
  // },
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
  // ラオス語
  lao: {
    keycode: 'lao.json',
  },
};

/**
 * インターフェイスの言語定義
 */
export const interfaceLanguages = [
  'ja', // 日本語
  'en', // 英語
];
