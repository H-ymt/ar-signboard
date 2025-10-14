import { ERROR_MESSAGES } from '../../constants/errors';
import type { ARError } from '../../types/ar';

interface ErrorDialogProps {
  error: ARError;
  onRetry?: () => void;
  onClose?: () => void;
}

export const ErrorDialog = ({ error, onRetry, onClose }: ErrorDialogProps) => {
  const message = ERROR_MESSAGES[error.type];

  return (
    <div className="z-loading bg-overlay-dark fixed inset-0 flex items-center justify-center">
      <div className="bg-background mx-4 max-w-md rounded-lg p-6 shadow-xl">
        <h2 className="text-ar-error mb-4 text-xl font-bold">エラー</h2>
        <p className="mb-6 whitespace-pre-line text-gray-700">{message}</p>
        <div className="flex justify-end gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="duration-fast rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400"
            >
              閉じる
            </button>
          )}
          {error.recoverable && onRetry && (
            <button
              onClick={onRetry}
              className="bg-primary duration-fast hover:bg-primary-hover rounded-md px-4 py-2 text-white transition-colors"
            >
              再試行
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
