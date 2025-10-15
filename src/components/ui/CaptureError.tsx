import { useEffect } from 'react';

import { getCaptureErrorMessage } from '../../constants/captureMessages';

interface CaptureErrorProps {
  error: Error | null;
  onRetry?: () => void;
  onDismiss: () => void;
  autoHideDuration?: number;
}

export const CaptureError = ({
  error,
  onRetry,
  onDismiss,
  autoHideDuration = 5000,
}: CaptureErrorProps) => {
  useEffect(() => {
    if (!error || onRetry) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [error, onRetry, onDismiss, autoHideDuration]);

  if (!error) return null;

  const errorInfo = getCaptureErrorMessage(error.message);

  return (
    <div className="fixed inset-x-4 top-20 z-40 animate-fade-in">
      <div className="rounded-lg bg-red-600 p-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="text-2xl">⚠️</div>
          <div className="flex-1">
            <h3 className="font-bold text-white">{errorInfo.title}</h3>
            <p className="mt-1 text-sm text-white/90">{errorInfo.message}</p>
            <div className="mt-3 flex gap-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="rounded bg-white px-4 py-2 text-sm font-medium
                             text-red-600 hover:bg-gray-100
                             active:scale-95 transition-transform"
                >
                  {errorInfo.action}
                </button>
              )}
              <button
                onClick={onDismiss}
                className="rounded bg-white/20 px-4 py-2 text-sm font-medium
                           text-white hover:bg-white/30
                           active:scale-95 transition-transform"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
