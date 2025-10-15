/**
 * ターゲット画像表示コンポーネント
 * PCで起動時にターゲット画像を表示し、スマホでそれを捉えられるようにする
 */

import { useState } from 'react';

interface TargetImageDisplayProps {
  imageUrl: string;
  onClose: () => void;
}

export function TargetImageDisplay({ imageUrl, onClose }: TargetImageDisplayProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all ${
        isFullscreen ? 'bg-opacity-100' : 'bg-opacity-90'
      }`}
    >
      <div
        className={`relative flex flex-col items-center transition-all ${
          isFullscreen ? 'h-full w-full' : 'max-h-[90vh] max-w-[90vw]'
        }`}
      >
        {/* ヘッダー */}
        {!isFullscreen && (
          <div className="mb-4 text-center">
            <h2 className="mb-2 text-xl font-bold text-white">ターゲット画像</h2>
            <p className="text-sm text-gray-300">
              スマホのカメラでこの画像を捉えてください
            </p>
          </div>
        )}

        {/* ターゲット画像 */}
        <div
          className={`relative flex items-center justify-center ${
            isFullscreen ? 'h-full w-full' : ''
          }`}
        >
          <img
            src={imageUrl}
            alt="ARターゲット画像"
            className={`${
              isFullscreen ? 'h-full w-full object-contain' : 'max-h-[70vh] max-w-full'
            } rounded-lg shadow-2xl`}
            onClick={toggleFullscreen}
          />
        </div>

        {/* コントロールボタン */}
        <div
          className={`mt-4 flex gap-4 ${
            isFullscreen ? 'absolute bottom-8 left-1/2 -translate-x-1/2' : ''
          }`}
        >
          <button
            onClick={toggleFullscreen}
            className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-gray-600"
          >
            {isFullscreen ? '縮小' : '全画面表示'}
          </button>
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary-hover rounded-lg px-6 py-3 font-semibold text-white shadow-lg transition-all"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
