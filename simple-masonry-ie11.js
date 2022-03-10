//IE11用ポリフィル
if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

//Simple Masonry Flexbox & Vanilla JS
function masonry(setOptions) {
  'use strict';

	//options
	const defaultOptions = {
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
	}
	//設定をマージ
	const options = Object.assign({}, defaultOptions, setOptions);

	//class設定
	const listClass = options.listClass;
	const listElmsClass = options.listElmsClass;

	//対象リスト取得
	const lists = Array.prototype.slice.call(document.querySelectorAll(listClass),0);
	//表示エリアが存在するかチェック
	if(lists.length === 0) {
		return false;
	}

	//masonry関数呼び出し
	masonryFunk(options);
	window.addEventListener('resize',  function() {
		masonryFunk(options);
	});

	//masonry関数
	function masonryFunk(options) {
		//カラム数チェック
		let column = options.column;
		//レスポンシブ切り替え
		const responsive = options.responsive;
		if(responsive) {
			//ウィンドウの幅取得
			const winWidth = window.innerWidth;
			//ウィンドウの幅とブレイクポイントを比較
			for (let i = 0; i < responsive.length; i++) {
				if(winWidth <= responsive[i].breakpoint) {
					column = responsive[i].column;
				}
			}
		}

		//1カラムの場合は設定をリセットし処理を終了
		if(column === 1) {
			lists.forEach(function(list){
				const listElms = Array.prototype.slice.call(list.querySelectorAll(listElmsClass),0);
				listElms.forEach(function(listElm){
					//設定リセット
					listElm.style.marginTop = '';
				});
			});
			return false;
		}

		//対象リストごとの設定
		lists.forEach(function(list){
			//対象リスト内要素取得
			const listElms = Array.prototype.slice.call(list.querySelectorAll(listElmsClass),0);
			//対象リスト内要が存在するかチェック
			if(listElms.length === 0) {
				return false;
			}
			//初期設定
			if(!list.classList.contains(options.activeClass)) {
				//active class設定
				list.classList.add(options.activeClass);
			}

			//要素の位置
			listElms.forEach(function(listElm,index){
				//設定リセット
				listElm.style.marginTop = '';

				//最初の行は処理しない
				if(column > index) {
					return;
				}

				//直上の要素取得
				const topListElm = listElms[index-column];
				//直上の要素の位置取得
				const topListElmPosi =  topListElm.getBoundingClientRect().top;
				//直上の要素のmargin-bottomを含む高さ取得
				const topListHeight =  getHeightAndMarginBottom(topListElm);
				//直上の要素の下端位置取得
				const topListBottomPosi = topListElmPosi + topListHeight;

				//表示エリアの位置取得
				const listElmPosi =  listElm.getBoundingClientRect().top;
				//調整位置取得
				let setPosi = listElmPosi.toFixed(0) - topListBottomPosi.toFixed(0);
				//0の場合処理しない
				if(setPosi === 0) {
					return false;
				}
				//位置をズラす
				setPosi = '-' + setPosi + 'px';
				listElm.style.marginTop = setPosi;
			});
		});
	}

	//margin-bottomを含む高さ
	function getHeightAndMarginBottom(elm) {
		//高さ取得
		const height = elm.getBoundingClientRect().height;
		//margin取得
		const styles = getComputedStyle(elm);
		const bottom = parseFloat(styles.marginBottom);
		return height + bottom;
	}

}
