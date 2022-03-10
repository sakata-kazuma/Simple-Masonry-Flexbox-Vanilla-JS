//Simple Masonry Flexbox & Vanilla JS (not use css)
function masonry(setOptions) {
  'use strict';

	//options
	const defaultOptions = {
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
		//カラム、余白チェック
		let column = options.column;
		let columnGap = options.columnGap;
		let rowGap = options.rowGap;
		let listWidth = null;
		//レスポンシブ切り替え
		const responsive = options.responsive;
		if(responsive) {
			//ウィンドウの幅取得
			const winWidth = window.innerWidth;
			//ウィンドウの幅とブレイクポイントを比較
			for (let i = 0; i < responsive.length; i++) {
				if(winWidth <= responsive[i].breakpoint) {
					column = responsive[i].column;
					columnGap = responsive[i].columnGap;
					rowGap = responsive[i].rowGap;
					listWidth = responsive[i].breakpoint;
				}
			}
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
				//flex box初期設定
				list.style.display = 'flex';
				list.style.flexWrap = 'wrap';
				list.style.alignItems = 'flex-start';

				//active class設定
				list.classList.add(options.activeClass);
			}

			//対象リスト内要素の幅設定
			//対象リストの幅取得
			if(!listWidth) {
				listWidth = parseFloat(getComputedStyle(list).width);
			}
			//左右余白の合計値取得
			const columnGapTotal = columnGap * (column-1);
			//要素の幅取得（%）
			const listElmWidth = (((listWidth - columnGapTotal)/column)/listWidth*100)+'%';
			//要素の余白取得（%）
			const listColumnGap = (columnGap/listWidth*100)+'%';
			//rowGapが数値だった場合は相対値に変換
			if(typeof rowGap === 'number') {
				rowGap = (rowGap/listWidth*100)+'%';
			}

			//要素の位置
			listElms.forEach(function(listElm,index){
				//幅・余白設定
				listElm.style.marginRight = listColumnGap;
				listElm.style.width = listElmWidth;
				listElm.style.marginBottom = rowGap;

				//設定リセット
				listElm.style.marginTop = '';
				if(column !== 1 && (index + 1) % column === 0) {
					listElm.style.marginRight = '';
				}

				//最初の行は位置調整処理をしない
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

	//margin-bottomを含む高さ取得関数
	function getHeightAndMarginBottom(elm) {
		//高さ取得
		const height = elm.getBoundingClientRect().height;
		//margin取得
		const styles = getComputedStyle(elm);
		const bottom = parseFloat(styles.marginBottom);
		return height + bottom;
	}
}
