interface ControlsOverlayProps {
  isTracking: boolean;
  showHelp: boolean;
  onToggleDesignSwitcher: () => void;
  onDismissHelp: () => void;
}

/**
 * AR操作オーバーレイコンポーネント
 * ヘルプテキスト、トラッキング状態、デザイン切替ボタンを表示
 */
export const ControlsOverlay = ({
  isTracking,
  showHelp,
  onToggleDesignSwitcher,
  onDismissHelp,
}: ControlsOverlayProps) => {
  return (
    <>
      {/* 操作説明 */}
      {showHelp && (
        <div className="bg-opacity-75 fixed top-4 left-1/2 z-30 -translate-x-1/2 transform rounded-lg bg-black px-4 py-3 text-white shadow-lg">
          <button
            onClick={onDismissHelp}
            className="absolute top-2 right-2 text-white opacity-75 hover:opacity-100"
            aria-label="ヘルプを閉じる"
          >
            ✕
          </button>
          <div className="space-y-2 text-sm">
            <p>📱 1本指ドラッグ: 移動</p>
            <p>🤏 ピンチ: 拡大縮小</p>
            <p>🔄 2本指回転: 回転</p>
          </div>
        </div>
      )}

      {/* トラッキング状態表示 */}
      {!isTracking && (
        <div className="bg-opacity-75 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-black px-6 py-4 text-center text-white">
          <p className="text-sm font-medium">📷 ターゲット画像を探しています...</p>
          <p className="mt-2 text-sm opacity-75">カメラをターゲット画像に向けてください</p>
        </div>
      )}

      {/* デザイン切替ボタン */}
      {isTracking && (
        <button
          onClick={onToggleDesignSwitcher}
          className="fixed right-6 bottom-6 z-30 rounded-full bg-blue-500 p-4 text-white shadow-lg transition-colors hover:bg-blue-600 active:bg-blue-700"
          aria-label="デザインを変更"
        >
          🎨
        </button>
      )}
    </>
  );
};
