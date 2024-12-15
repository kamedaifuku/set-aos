'use strict';
// ------------------------------------------
// AOSの設定用のスクリプト
// GitHub: github.com/michalsnik/aos
// ※オプション設定等は上記参照
// ------------------------------------------
/** 使用条件（HTMLの設定）
  1.  CDNのAOSを使用する場合を想定。

  2.  AOSを設定したコンテンツの配置が変わった場合に発火タイミングが
      ずれるのを回避したい場合は、mainなどの親要素に
      クラス'js-aos-wrapper'を設定する。
    ------------------------------------------*/

/*
  ------------------------------------------*/
class SetAosSettings {
  static AOS_OPTIONS = {
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: -100, // アニメーションのトリガーポイント
    delay: 500, // 開始までの遅延時間（0~3000ms, 50ms単位)
    duration: 500, // アニメーションの持続時間（0~3000ms, 50ms単位)
    easing: 'ease-in-out', // アニメーションのタイプ
    once: true, // アニメーションの実行回数
    mirror: false, // 要素がスクロールアウトする際にアニメーションを逆再生するか
    anchorPlacement: 'bottom-top' // アニメーションをトリガーする要素の位置
  };

  static CLASSES = {
    TARGET: 'js-aos-wrapper'
  };

  static DEBOUNCE_TIME = 250; // リサイズ監視の実行間隔

  constructor() {
    this.initAOS();
    this.aosArea = this.getElement(SetAosSettings.CLASSES.TARGET);
    // 対象の要素が存在する場合のみリサイズ監視処理を実行
    if (this.aosArea) {
      this.resizeTimeout;
      this.setResizeObserver(this.aosArea);
    }
  }

  // AOS初期化
  initAOS() {
    AOS.init(SetAosSettings.AOS_OPTIONS); // eslint-disable-line
  }

  // 要素取得処理
  getElement(className, target = document) {
    return target.querySelector(`.${className}`);
  }

  // リサイズ時のリフレッシュ処理のオブザーバー
  setResizeObserver(target) {
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(this.resizeTimeout); // デバウンス処理
      this.resizeTimeout = setTimeout(() => AOS.refresh(), SetAosSettings.DEBOUNCE_TIME); // eslint-disable-line
    });
    resizeObserver.observe(target);
  }
}

/* 初期化
    ------------------------------------------*/
const initSetAosSettings = () => {
  // HTML内にAOSのCDNが読み込まれているかチェックする関数
  const isAosCDNLoaded = () => {
    // AOSのCDNパターン（バージョン番号はワイルドカードとして扱う）
    const AOS_CSS_PATTERN = /https:\/\/unpkg\.com\/aos@\d+\.\d+\.\d+\/dist\/aos\.css/;
    const AOS_JS_PATTERN = /https:\/\/unpkg\.com\/aos@\d+\.\d+\.\d+\/dist\/aos\.js/;

    // 全てのlinkタグとscriptタグを取得
    const linkTags = document.querySelectorAll('link');
    const scriptTags = document.querySelectorAll('script');

    // CSSのパターンがあるかチェック
    const isCssLoaded = Array.from(linkTags).some((tag) => AOS_CSS_PATTERN.test(tag.href));

    // JSのパターンがあるかチェック
    const isJsLoaded = Array.from(scriptTags).some((tag) => AOS_JS_PATTERN.test(tag.src));

    // 両方のタグが見つかったかどうかを返す
    return isCssLoaded && isJsLoaded;
  };
  if (!isAosCDNLoaded()) return; // AOSが読込されていない場合は実行しない

  try {
    /* 必要に応じて判定処理 */
    return new SetAosSettings();
  } catch (error) {
    console.error(`[SetAosSettings]:${error.message}`);
    return null;
  }
};

const myAOS = initSetAosSettings(); // eslint-disable-line
