'use strict';
// ------------------------------------------
// AOSの設定用のスクリプト
// GitHub: github.com/michalsnik/aos
// ※オプション設定等は上記参照
// ------------------------------------------
/** 使用条件（HTMLの設定）
  1.  AOSを使用する場合を想定。(CDNとファイルを保持する形どちらも対応)

  2.  AOSを設定したコンテンツの配置が変わった場合に発火タイミングがずれる対策
      ->ウィンドウのリサイズ発生時にAOS.refresh()を実行
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

  static DEBOUNCE_TIME = 250; // リサイズ監視の実行間隔

  constructor() {
    this.initAOS();
    this.resizeTimeout;
    this.initEventListener();
  }

  // AOS初期化
  initAOS() {
    AOS.init(SetAosSettings.AOS_OPTIONS); // eslint-disable-line
  }

  // windowのリサイズ検知時にAOSのリフレッシュを実施
  initEventListener() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout); // デバウンス処理
      this.resizeTimeout = setTimeout(() => AOS.refresh(), SetAosSettings.DEBOUNCE_TIME); // eslint-disable-line
    });
  }
}

/* 初期化
    ------------------------------------------*/
const initSetAosSettings = () => {
  // AOSのスクリプトとCSSが読み込まれているかチェックする関数
  const isAosCSSLoaded = () => {
    try {
      const AOS_STYLESHEET = 'aos.css';
      return [...document.styleSheets].some((sheet) => sheet.href && sheet.href.includes(AOS_STYLESHEET));
    } catch (e) {
      console.log('cssの読込中にエラーが発生', e);
      return false;
    }
  };

  if (typeof AOS === 'undefined' || !isAosCSSLoaded()) return;
  try {
    /* 必要に応じて判定処理 */
    return new SetAosSettings();
  } catch (error) {
    console.error(`[SetAosSettings]:${error.message}`);
    return null;
  }
};

const myAOS = initSetAosSettings(); // eslint-disable-line
