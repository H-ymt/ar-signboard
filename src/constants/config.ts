export const PERFORMANCE_CONFIG = {
  // モデル制限
  MAX_MODEL_SIZE: 3 * 1024 * 1024, // 3MB
  MAX_POLYGON_COUNT: 50000,

  // テクスチャ制限
  MAX_TEXTURE_SIZE: 2048,

  // フレームレート
  TARGET_FPS: 60,
  MIN_FPS: 30,

  // メモリ監視
  MEMORY_CHECK_INTERVAL: 5000, // 5秒
  MAX_MEMORY_USAGE: 100 * 1024 * 1024, // 100MB
};

export const UI_CONFIG = {
  // 操作説明の自動非表示時間（ミリ秒）
  CONTROLS_HELP_TIMEOUT: 5000,

  // ローディングスピナーの最小表示時間
  MIN_LOADING_TIME: 500,

  // エラーメッセージの表示時間
  ERROR_DISPLAY_TIME: 5000,
};
