//スムーススクロール
$(function () {

  //===========================================================
  //TOPへ戻るボタン
  //===========================================================
  //※btnの位置はcssの方で指定も可能？
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $(".btn_top").fadeIn("200");
    } else {
      $(".btn_top").fadeOut("200");
    }
    let winWidth = $(window).width();
    let btnPosition = winWidth < 768 ? 10 : 25;
    //$(document).height() ページ全体の高さ $(window).height()ウインドウの高さ　 $(window).scrollTop();はスクロール量
    //ウインドウに見えている下部の位置がページ全体に対しどのあたりにいるか測る
    //0になるとページ最下部に到達
    let scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
    //フッターに被らないようにウインドウの最下部がフッターに到達したらbtnの位置を
    //フッターを含めた数値に変更＋absoluteを付与(bodyにrelativeしてある)
    let btnBottom = scrollBottom <= $("footer").innerHeight() ? $("footer").innerHeight() + btnPosition : btnPosition;

    $(".btn_top").css({
      position: scrollBottom <= $("footer").innerHeight() ? "absolute" : "fixed",
      bottom: btnBottom
    });
  });

  $('.btn_top').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 400);
    return false;
  });


  //===========================================================
  // スムーススクロール※pagination aは除外
  //===========================================================


  // ページ内アンカーのページ付きリンクへのスムーススクロール
  $(function () {
    //a[href*="#"]'でページ内のaタグの中で#を含む要素としてるが/(ルート)指定^="/#"でも代用可能※範囲を限定できる
    //.not(".noScroll, .pagination a")でnoScroll, .pagination aを除外
    $('a[href^="/#"]').not(".noScroll, .pagination a").click(function () {

      var speed = 400,
        //.propでクリックした要素の属性、ここではhref属性を取得
        //例：http://127.0.0.1/#sec1を取得
        href = $(this).prop("href"),
        //文字列の組込関数splitで任意の文字列で分割（配列で返される）
        //この場合"#"で区切る=[http://127.0.0.1/, sec1]という配列が返され
        //その0番目、http://127.0.0.1/を返している
        hrefPageUrl = href.split("#")[0],
        //locationオブジェクトのhrefで現在のページのurlを取得
        currentUrl = location.href,
        //現在のページ"#"が含まれていたら#以前を返す
        currentUrl = currentUrl.split("#")[0];
      //クリックしたhrefと現在のページのhref(#以前)が同じであれば処理実行
      //つまり同一ページ内の時のみ有効になる
      if (hrefPageUrl == currentUrl) {

        //リンク先の#からあとの値を取得
        //splitで例：http://127.0.0.1/#sec1を"#"区切りで配列化
        href = href.split("#");
        //popで[http://127.0.0.1/, sec1]の最後の要素を取得し単一の要素として返すsec1
        //注意：popは配列の最後の要素を単一要素で返す
        href = href.pop();
        //popで取得したsec1と"#"をつなげる
        href = "#" + href;

        //スムースクロールの実装
        //hrefが"#"か"空"かを判定：tureであればhtmlを返し、falseであればhrefを返す
        //$(#sec1)の場合、idがsec1の要素を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = calculateScrollPosition(target);
        //引数にbody,html'両方記述することでクロスブラウザに対応(スクロールをhtmlで行うブラウザとbodyで行うブラウザがある)
        $('body,html').animate({
          //scrollTopで対象要素まで.5秒かけてスクロール
          //scrollToの値は任意の数字
          scrollTop: position
        }, 500);

        return false;
      }

    });
  });

  // スクロール位置を計算する関数
  //targetには対象の要素が入る
  function calculateScrollPosition(target) {
    if ($(window).width() > 768) {
      //対象要素までの距離からヘッダーの最大の高さを引く
      return target.offset().top - 120;
    } else {
      return target.offset().top - 70;
    }
  }


  //===========================================================
  //ハンバーガーメニュー開閉
  //=========================================================== 
  //開閉ボタン押下時の処理
  $('.nav-btn').on('click', function () {
    $('.nav-btn').toggleClass('open');
    // slideToggleで表示、非表示切り替え
    $("header nav ul").slideToggle(300);
  });
  //ウインドウ幅が768以下の条件
  //ナブメニュー押下時の処理
  if ($(window).width() < 768) {
    $('header nav ul li a').on('click', function () {
      $(".nav_btn").removeClass('open');
      $("header nav ul").slideUp(300);
    });
  }
  //===========================================================
  //アコーディオン
  //===========================================================
  $('.sec04 dl dt').on('click', function () {
    $(this).toggleClass("open");
    $('.sec04 dl dt').not($(this)).next('dd').slideUp();
    $('.sec04 dl dt').not($(this)).removeClass("open");
    //クリックした要素の次のddに対しスライド(easeOutExpo→早く始まり徐々に遅くなる)
    //stop()をかけることで閉じかけの時にクリックすると閉じるイベントをストップし開かせることができる。(逆も)
    $(this).next('dd').stop().slideToggle(600, 'easeOutExpo');
  });

  //===========================================================
  //タブ切り替え
  //===========================================================
  $('.tab_list li').on('click', function () {
    //この記述だと.tab_list li'の中だけでなくdom全体からactiveを消す記述となっている
    $('.active').removeClass('active');
    $(this).addClass('active');
    $('.show').removeClass('show');
    const index = $(this).index();
    //.eq(index)でpanelクラスの中から指定したindexのみにshowを付与
    //const hoge = [a, b, d] → hoge[index]のようなかんじ
    $('.panel').eq(index).addClass('show');
  });

  //===========================================================
  //スクロールアニメーション（フェードイン表示）
  //===========================================================

  $(window).on('scroll load', function (i) {
    //ページのスクロール量（ページの上端から見えているウインドウの上端）
    var scTop = $(this).scrollTop();
    //スクロール量＋見えているウインドウの高さ。
    //※常にページ上端から見えているウインドウの下端までの数値を取得
    var scBottom = scTop + $(this).height();
    //iは意味なし
    $('.inview').each(function (i) {
      //ページ上端から.inview要素の上端＋100の距離
      var thisPos = $(this).offset().top + 100;
      //見えているウインドウまでの距離より要素までの距離が短くなった時の処理
      //ここでは要素の上部100px見えたら（実際には見えない）クラス付与
      if (thisPos < scBottom) {
        $(this).addClass('animate');
      }
    });
    $('.inview-group').each(function (i) {
      var thisPos = $(this).offset().top + 100;
      if (thisPos < scBottom) {
        $(".inview-list", this).each(function (i) {
          $(this).delay(i * 300).queue(function (next) {
            $(this).addClass('animate');
            next();
          });
        });
      }
    });
  });
});

//===========================================================
//スライダー
//===========================================================

const mySwiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 1,//スライドの表示枚数
  spaceBetween: "15%",//余白
  speed: 800,//切り替え時のスピード
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
  breakpoints: {
    768: {//768以上の時の設定→PC
      slidesPerView: 3,//スライドの表示枚数
      spaceBetween: "2%",//余白

    }
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


//===========================================================
//ページネーション
//===========================================================
//paginathing.min.jsを使用

// $(function () {
//   $('.pagenation_block').paginathing({//親要素のclassを記述
//     perPage: 3,//1ページあたりの表示件数
//     prevText: '前へ',//1つ前のページへ移動するボタンのテキスト
//     nextText: '次へ',//1つ次のページへ移動するボタンのテキスト
//     activeClass: 'navi-active',//現在のページ番号に任意のclassを付与できます
//     firstText: false, // "最初ページ"に移動するボタンのテキスト
//     lastText: false, // "最後のページ"に移動するボタンのテキスト

//   })
// });



