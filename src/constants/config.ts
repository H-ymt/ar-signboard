/**
 * アプリケーション設定定数
 */

/**
 * アプリケーション情報
 */
export const APP_INFO = {
  name: 'AR看板アプリ',
  version: '0.1.0',
  description: 'MindARを使用したAR看板表示アプリケーション',
} as const;

/**
 * リソースパス
 */
export const RESOURCE_PATHS = {
  /** ターゲット画像ディレクトリ */
  targets: '/targets',
  /** 3Dモデルディレクトリ */
  models: '/models',
  /** 2D画像ディレクトリ */
  images: '/images',
} as const;

/**
 * UIメッセージ
 */
export const UI_MESSAGES = {
  /** ローディングメッセージ */
  loading: {
    initializing: 'AR環境を初期化しています...',
    loadingResources: 'リソースを読み込んでいます...',
    startingCamera: 'カメラを起動しています...',
  },
  /** エラーメッセージ */
  error: {
    cameraPermissionDenied:
      'カメラの使用が許可されていません。設定からカメラへのアクセスを許可してください。',
    cameraNotFound:
      'カメラが見つかりません。デバイスにカメラが接続されていることを確認してください。',
    arInitFailed: 'AR機能の初期化に失敗しました。ページを再読み込みしてください。',
    resourceLoadFailed: 'リソースの読み込みに失敗しました。',
    unsupportedBrowser:
      'お使いのブラウザはARに対応していません。最新のiOS SafariまたはAndroid Chromeをご利用ください。',
  },
  /** 案内メッセージ */
  guide: {
    targetNotFound: 'ターゲット画像を探しています...',
    targetFound: 'ターゲット画像を認識しました！',
    targetLost: 'ターゲット画像を見失いました。',
  },
} as const;

/**
 * ブラウザ互換性チェック
 */
export const BROWSER_SUPPORT = {
  /** 対応ブラウザの正規表現 */
  supportedBrowsers: [
    /Safari/i, // iOS Safari
    /Chrome/i, // Android Chrome
  ],
  /** 最小サポートバージョン */
  minVersions: {
    chrome: 90,
    safari: 14,
  },
} as const;

/**
 * デバッグ設定
 */
export const DEBUG_CONFIG = {
  /** デバッグモードの有効化 */
  enabled: import.meta.env.DEV,
  /** コンソールログの表示 */
  showLogs: import.meta.env.DEV,
  /** パフォーマンス統計の表示 */
  showStats: import.meta.env.DEV,
} as const;
