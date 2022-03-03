# Simple Masonry Flexbox & Vanilla JS
FlexboxとVanilla JSで実装した簡易Masonryレイアウトのサンプルです。  
※ランダム配置なし。横の並び順は維持されます。


　  



### 【通常版はこちら】
[Simple Masonry Flexbox & Vanilla JS](https://github.com/sakata-kazuma/Simple-Masonry-Flexbox-Vanilla-JS)


　  


#### デモ
https://codepen.io/sakata-kazuma/pen/MWOzyNB

　  


### 使い方

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
  columnGap: 50,
  rowGap: 50,
  responsive: [
    {
      breakpoint: 1024,
      column: 4,
      columnGap: 40,
      rowGap: 40,
    },
    {
      breakpoint: 800,
      column: 3,
      columnGap: 30,
      rowGap: 30,
    },
    {
      breakpoint: 600,
      column: 2,
      columnGap: 20,
      rowGap: 20,
    },
    {
      breakpoint: 400,
      column: 1,
      columnGap: 0,
      rowGap: 40,
    }
  ]
});
```

　  


### オプション

```
masonry({
  target: '.js-masonry-list',  //対象リスト
  column: 1,  //カラム数
  columnGap: 0,  //number：対象リスト内要素の横余白（相対値（%）に置き換えられます）
  rowGap: 0,  //number or string：対象リスト内要素の下余白（相対値（%）に置き換えられます。※置き換えたくない場合は、'20%'など単位を入れてください。）
  responsive: null,
  /*
    //レスポンシブ設定
    responsive: [
      {
        breakpoint: 1024, //ブレイクポイント max-width
        column: 3,
        columnGap: 50,
        rowGap: 50,
      }, {
        breakpoint: 500,
        column: 1,
        columnGap: 0,
        rowGap: 50,
      }
    ]
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
