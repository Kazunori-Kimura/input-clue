
https://kazunori-kimura.github.io/input-clue

## TODO

- [x] iOSにてExcelファイルをIndexedDBに取り込む際にサイトが落ちる。メモリ限界？
  - build時に事前にExcelをJSONに変換してしまう

- [x] コンテンツの４項目の表示必須です。辞書の価値の生命線の発音記号部を必ず表示してください。
- [x] 検索実行後、選択項目をクリック、またはタップしたら辞書のポップアップを即座に閉じるようにしてください。
- [x] 前の検索文字は新規検索実行したら消去して、新規検索文字だけが残るようにしてください。
- [x] サーチテキストエリアと、結果表示エリアを上下入れ替えてください。
- [x] 結果表示エリアは罫線囲みにして
- [x] タイ文字を4ポイントぐらい大きくしてくだい。
- [x] 辞書検索のうしろに「ひらがな入力」を入れておいてください。
- [x] 現在検索は先頭から完全一致ですが、含む検索を追加、選択ボタンを置いてください
- [x] しょうべん、だいべん、あたま・・・などの検索結果が２つづつ重複表示されています。
  - 辞書更新時に前のデータを消去していなかった。追加前にDatabaseのクリア処理を実装

- [x] シリア語 Mac GoogleChromeだと表示できない。Safariだと可能。
- [ ] 韓国語は後回し (キーボードそのものを独自実装する必要がある)
- [ ] アラビア語は右から左になるが、カーソル位置の独自実装が必要。要調査。
- [ ] ヘブライ語は右から左になるが、カーソル位置の独自実装が必要。要調査。


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
