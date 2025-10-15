interface CaptureButtonProps {
  onCapture: () => void;
  isCapturing: boolean;
  disabled?: boolean;
}

export const CaptureButton = ({
  onCapture,
  isCapturing,
  disabled,
}: CaptureButtonProps) => {
  return (
    <button
      onClick={onCapture}
      disabled={disabled || isCapturing}
      className="fixed bottom-20 left-1/2 z-30 -translate-x-1/2
                 rounded-full bg-white p-4 shadow-lg
                 disabled:opacity-50 disabled:cursor-not-allowed
                 active:scale-95 transition-transform"
      aria-label="写真を撮る"
    >
      {isCapturing ? (
        <div className="animate-spin text-3xl">⏳</div>
      ) : (
        <div className="text-3xl">📷</div>
      )}
    </button>
  );
};
