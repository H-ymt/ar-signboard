/**
 * メインアプリケーションコンポーネント
 */

import { ErrorDialog } from './components/ui/ErrorDialog';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { useARInitialize } from './hooks/useARInitialize';
import { useCamera } from './hooks/useCamera';

function App() {
  const { isInitializing, isInitialized, error: arError, initialize } = useARInitialize();
  const { permission, error: cameraError, requestCameraPermission } = useCamera();

  const handleStart = async () => {
    await requestCameraPermission();
    if (permission === 'granted') {
      await initialize();
    }
  };

  const currentError = arError || cameraError;

  return (
    <div className="h-screen w-screen">
      {isInitializing && <LoadingScreen />}

      {currentError && <ErrorDialog error={currentError} onRetry={handleStart} />}

      {!isInitialized && !isInitializing && (
        <div className="flex h-full items-center justify-center bg-gray-900">
          <button
            onClick={handleStart}
            className="bg-primary duration-base hover:bg-primary-hover rounded-lg px-8 py-4 text-xl font-bold text-white shadow-lg transition-all hover:shadow-xl"
          >
            AR体験を開始
          </button>
        </div>
      )}

      {isInitialized && (
        <div className="bg-ar-success flex h-full items-center justify-center">
          <p className="text-2xl font-bold text-white">AR初期化完了！（次のフェーズで実装）</p>
        </div>
      )}
    </div>
  );
}

export default App;
