interface CapturePreviewProps {
  imageUrl: string | null;
  onSave: () => void;
  onRetake: () => void;
  onShare?: () => void;
  onClose: () => void;
  isSaving?: boolean;
  isSharing?: boolean;
}

export const CapturePreview = ({
  imageUrl,
  onSave,
  onRetake,
  onShare,
  onClose,
  isSaving = false,
  isSharing = false,
}: CapturePreviewProps) => {
  if (!imageUrl) return null;

  const isLoading = isSaving || isSharing;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90"
      onClick={isLoading ? undefined : onClose}
    >
      <div
        className="flex h-full flex-col items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 画像表示 */}
        <img
          src={imageUrl}
          alt="キャプチャプレビュー"
          className="max-h-[70vh] rounded-lg shadow-xl"
        />

        {/* ボタン群 */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={onRetake}
            disabled={isLoading}
            className="rounded-lg bg-gray-600 px-6 py-3 text-white
                       hover:bg-gray-700 active:scale-95 transition-transform
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            再撮影
          </button>
          <button
            onClick={onSave}
            disabled={isLoading}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white
                       hover:bg-blue-700 active:scale-95 transition-transform
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? '保存中...' : '保存'}
          </button>
          {onShare && (
            <button
              onClick={onShare}
              disabled={isLoading}
              className="rounded-lg bg-green-600 px-6 py-3 text-white
                         hover:bg-green-700 active:scale-95 transition-transform
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSharing ? '共有中...' : '共有'}
            </button>
          )}
        </div>

        {/* 閉じるボタン */}
        {!isLoading && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-4xl text-white
                       hover:scale-110 active:scale-95 transition-transform"
            aria-label="閉じる"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
