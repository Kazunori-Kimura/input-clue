
## TODO

- [x] シリア語 Mac GoogleChromeだと表示できない。Safariだと可能。

## memo

- 韓国語は後回し (キーボードそのものを独自実装する必要がある)
- アラビア語は右から左になるが、カーソル位置の独自実装が必要。要調査。
- ヘブライ語は右から左になるが、カーソル位置の独自実装が必要。要調査。
- 文字コード指定が `0,0,0,0` となっているものは `0,0,0,32` (space) に置き換えて実装

## 実装完了ファイル一覧

- [x] Thai_Pickup.html ＜タイ語＞
- [x] Thai_Pho_Pickup.html ＜タイ語&amp;発音記号＞
- [x] Pinyin_Pickup.html ＜中国語ピンイン＞
- [x] Vietnam_Pickup.html ＜ベトナム語・クォック・グー＞
- [x] Mongolian_Pickup.html ＜古モンゴル語＞
- [x] Lao_Pickup.html ＜ラオス語＞
- [x] Lao_Pickup3.html ＜ラオス語 拡張版＞
- [x] Tibetan_Pickup.html ＜チベット語＞
- [x] Myanmar_Pickup.html ＜ミャンマー語＞
- [x] Myanmar_Pickup_2.html ＜ミャンマー語・標準＞
- [x] Pashto_Pickup.html ＜パシュトゥ語（アフガニスタン）＞
- [x] Assamese_Pickup.html ＜アッサム語＞
- [x] Sanskrit_Pickup.html ＜サンスクリット語＞
- [x] Bengali_Pickup.html ＜ベンガル語＞
- [x] kmer_Cambodian.html ＜クメール・カンボジア語＞
- [x] Tamil_Pickup.html ＜タミル語＞
- [x] Sinhala_EM_Pickup.html ＜シンハラ語＞
- [x] Napali_Pickup.html ＜ネパール語＞
- [x] Hindi_Pickup.html ＜ヒンディー語＞
- [x] Syrian_Pickup.html ＜シリア語＞
- [x] Turkish_Pickup.html ＜トルコ語＞
- [x] Turkish_Pho_Pickup.html ＜トルコ語発音記号＞
- [x] Hangary_Pickup.html ＜ハンガリー語＞
- [x] English_Pho_Pickup.html ＜英語発音記号＞
- [x] Cyrillic_Pickup.html ＜モンゴルキリル＞
- [x] Russian_Pickup.html ＜ロシア語＞
- [x] Suomi_Pickup.html ＜スオミ語＞
- [x] French_Pho_Pickup.html ＜フランス語＆IPA＞

## 後回し/対応なし

- [ ] korean_Pickup.html ＜韓国語＞
- [ ] korean_PickupV1.html ＜韓国語PRO＞
- [ ] Arabic_Pickup.html ＜アラビア語サウジアラビア＞
- [ ] Hebrew_Pickup.html ＜へブル語＞

---

create-react-app v2.xで作成したプロジェクトにおいてWeb Workerを使用すると `Uncaught ReferenceError: window is not defined` が発生する

## 現象

`create-react-app` の version 2.0 以降で生成したプロジェクトにおいて、worker-loaderを使用してWeb Workerのスクリプトを読み込み実行すると、`Uncaught ReferenceError: window is not defined (bootstrap:1)` という例外が発生してWeb Workerの処理が実行されない。

## 原因

`react-scripts v2.10.0` の `webpack (v4.19.1)` 設定に問題があり、Web Workerが適切に処理できていない (Workerのコンテキストが解釈できていない) 模様。
該当すると思われるissueは以下。

- [webwork can't find window on 'bootstrap' · Issue #6629 · webpack/webpack](https://github.com/webpack/webpack/issues/6629)
- [Webpack 4.0.1 | WebWorker `window is not defined` · Issue #6642 · webpack/webpack](https://github.com/webpack/webpack/issues/6642)
- [Uncaught ReferenceError: window is not defined · Issue #166 · webpack-contrib/worker-loader](https://github.com/webpack-contrib/worker-loader/issues/166)

## 対応

通常、Workerスクリプト内では `onmessage` イベントや `postMessage` メソッドはグローバルなスコープに定義されている ([DedicatedWorkerGlobalScope - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/DedicatedWorkerGlobalScope)) ので直接呼び出すことができますが、ブラウザの `window` オブジェクトにはこれらのイベント・メソッドは存在しないため WebPack で適切に処理できません。

なので、面倒ですがすべて `self` オブジェクト経由でアクセスし、WebPack にはグローバルなオブジェクトに `self` っていうのがあるよ、という設定をしてやります。

### 1. Workerのイベントハンドラや各種プロパティに `self` オブジェクトを経由してアクセスする

イメージとしては以下のような感じでしょうか。

```js:before/worker.js
onmessage = (evt) => {
  const { params } = evt.data;
  // ゴニョゴニョ
  postMessage({ payload: newData });
};
```

```js:after/worker.js
self.onmessage = (evt) => {
  const { params } = evt.data;
  // ゴニョゴニョ
  self.postMessage({ payload: newData });
};
```


### 2. WebPackの設定を変更し、グローバルオブジェクトに `self` を追加する

`create-react-app` で作成したプロジェクトでは WebPack の設定などは `react-scripts` に隠蔽されています。
特に問題なければビルド環境の複雑さから逃れられるので良いのですが、今回のような問題があったときには困ってしまいます。

`npm run eject` コマンドで `react-scripts` に隠蔽されている各種設定が触れるようになります。

```sh
> npm run eject
```

`package.json` の内容が更新され、`npm install` が再実行されます。
プロジェクトフォルダのルートに `config` と `scripts` というフォルダが作成され、そこに `react-scripts` と各種設定ファイルが展開されます。




## そもそも Web Worker って何？

> Web Workers は、Web コンテンツがスクリプトをバックグラウンドのスレッドで実行するためのシンプルな手段です。Worker スレッドは、ユーザインターフェイスを妨げることなくタスクを実行できます。
>
> *Web Worker を使用する - Web API インターフェイス | MDN*
> https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API/Using_web_workers

Webアプリで巨大なファイルを読み込むなどの重たい処理を行う場合に **Web Worker** を使うと描画に影響を与えずに処理ができます。
