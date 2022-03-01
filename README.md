# Simple Masonry Flexbox & Vanilla JS
FlexboxとVanilla JSで実装した簡易Masonryレイアウトのサンプルです。  
※ランダム配置なし。横の並び順は維持されます。


　  



### 【全てJSで実装する版はこちら】
[Simple Masonry Flexbox & Vanilla JS (not use css)](https://github.com/sakata-kazuma/Simple-Masonry-Flexbox-Vanilla-JS/tree/main/not-use-css)


　  


#### デモ
https://codepen.io/sakata-kazuma/pen/ZEamWNM

　  


### 使い方
#### CSS読み込み
```
<link rel="stylesheet" href="file-path/simple-masonry.css">
```
  

#### JS読み込み
```
<script src="file-path/simple-masonry.min.js"></script>
```
※IE11へ対応する場合は `simple-masonry-ie11.min.js` を読み込んでください。
```
<script src="file-path/simple-masonry-ie11.min.js"></script>
```

#### HTMLにレイアウトコードを追加
```
<ul class="js-masonry-list">
  <li class="js-masonry-elm">
    <img src="https://picsum.photos/id/1003/300/400" alt="" width="300" height="400">
  </li>
</ul>
```

#### Masonry呼び出し
```
masonry({
  target: '.js-masonry-list',
  column: 5,
  responsive: [{
    breakpoint: 1024,
    column: 3
  }, {
    breakpoint: 600,
    column: 2
  }, {
    breakpoint: 450,
    column: 1
  }]
});
```

　  


#### レイアウト設定について
横並びレイアウトはCSSで作成しますので、JS側で設定するブレイクポイントはCSSで設定した値を入れてください。


　  



### オプション

```
masonry({
  target: '.js-masonry-list',  //対象リスト
  column: 1,  //カラム数
  responsive: null,
  /*
    //レスポンシブ設定
    responsive: [{
      breakpoint: 1024, //ブレイクポイント max-width
      column: 3
    }, {
      breakpoint: 500,
      column: 1
    }]
  */
  activeClass: 'is-active',  //Masonry active class
  listClass: '.js-masonry-list',  //対象リスト class
  listElmsClass: '.js-masonry-elm',  //対象リスト内要素 class
});
```

　  

### 動作環境
Internet Explorer 11  
Google Chrome 最新版  
Firefox 最新版  
Safari 最新版
