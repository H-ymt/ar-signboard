/**
 * メインアプリケーションコンポーネント
 */

import { useEffect, useState } from 'react';

import { ARScene } from './components/ar/ARScene';
import { CaptureButton } from './components/ui/CaptureButton';
import { CaptureError } from './components/ui/CaptureError';
import { CapturePreview } from './components/ui/CapturePreview';
import { ControlsOverlay } from './components/ui/ControlsOverlay';
import { ErrorDialog } from './components/ui/ErrorDialog';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { SignboardSwitcher } from './components/ui/SignboardSwitcher';
import { TargetImageDisplay } from './components/ui/TargetImageDisplay';
import { DEFAULT_TRANSFORM, MINDAR_CONFIG } from './constants/ar';
import { SIGNBOARD_DESIGNS } from './data/signboards';
import { useARInitialize } from './hooks/useARInitialize';
import { useCamera } from './hooks/useCamera';
import { useCapture } from './hooks/useCapture';
import { useGesture } from './hooks/useGesture';

function App() {
  const { isInitializing, isInitialized, error: arError, initialize } = useARInitialize();
  const { permission, error: cameraError, requestCameraPermission } = useCamera();
  const {
    isCapturing,
    isSaving,
    isSharing,
    captureResult,
    error: captureError,
    capture,
    save,
    share,
    reset,
    clearError,
  } = useCapture();

  const [isTracking, setIsTracking] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [showDesignSwitcher, setShowDesignSwitcher] = useState(false);
  const [showCapturePreview, setShowCapturePreview] = useState(false);
  const [showTargetImage, setShowTargetImage] = useState(false);
  const [currentDesignId, setCurrentDesignId] = useState(SIGNBOARD_DESIGNS[0].id);

  const currentDesign =
    SIGNBOARD_DESIGNS.find((d) => d.id === currentDesignId) || SIGNBOARD_DESIGNS[0];

  const { transform } = useGesture(DEFAULT_TRANSFORM, (newTransform) => {
    console.log('Transform updated:', newTransform);
  });

  // カメラ許可後、自動的にAR初期化を実行
  useEffect(() => {
    if (permission === 'granted' && !isInitialized && !isInitializing) {
      initialize();
    }
  }, [permission, isInitialized, isInitializing, initialize]);

  const handleStart = async () => {
    await requestCameraPermission();
  };

  const handleCapture = async () => {
    const sceneElement = document.querySelector('.ar-scene-container');
    if (sceneElement) {
      try {
        await capture(sceneElement as HTMLElement);
        setShowCapturePreview(true);
      } catch (err) {
        console.error('Capture failed:', err);
      }
    }
  };

  const handleSave = async () => {
    try {
      await save();
      setShowCapturePreview(false);
      reset();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const handleRetake = () => {
    setShowCapturePreview(false);
    reset();
  };

  const handleShare = async () => {
    try {
      await share();
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const currentError = arError || cameraError;

  return (
    <div className="h-screen w-screen">
      {isInitializing && <LoadingScreen />}

      {currentError && <ErrorDialog error={currentError} onRetry={handleStart} />}

      {!isInitialized && !isInitializing && (
        <div className="bg-background flex h-full flex-col items-center justify-center gap-8">
          <button
            onClick={handleStart}
            className="bg-primary duration-base hover:bg-primary-hover rounded-lg px-8 py-4 text-xl font-bold text-white shadow-lg transition-all hover:shadow-xl"
          >
            AR体験を開始
          </button>

          <div className="text-center">
            <p className="mb-4 text-gray-600">
              または、ターゲット画像を表示してスマホでスキャン
            </p>
            <button
              onClick={() => setShowTargetImage(true)}
              className="bg-primary hover:bg-primary-hover rounded-lg px-6 py-3 text-base font-semibold text-white shadow-lg transition-all"
            >
              ターゲット画像を表示
            </button>
          </div>
        </div>
      )}

      {isInitialized && (
        <>
          <div className="ar-scene-container">
            <ARScene
              targetUrl={MINDAR_CONFIG.targetUrl}
              signboard={currentDesign}
              transform={transform}
              onTargetFound={() => setIsTracking(true)}
              onTargetLost={() => setIsTracking(false)}
            />
          </div>

          <ControlsOverlay
            isTracking={isTracking}
            showHelp={showHelp}
            onToggleDesignSwitcher={() => setShowDesignSwitcher(!showDesignSwitcher)}
            onDismissHelp={() => setShowHelp(false)}
          />

          {/* ターゲット画像表示ボタン */}
          <button
            onClick={() => setShowTargetImage(true)}
            className="bg-primary hover:bg-primary-hover fixed top-4 right-4 z-40 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all"
          >
            ターゲット画像を表示
          </button>

          {/* キャプチャボタン */}
          {isTracking && <CaptureButton onCapture={handleCapture} isCapturing={isCapturing} />}

          {/* キャプチャプレビュー */}
          {showCapturePreview && (
            <CapturePreview
              imageUrl={captureResult?.dataUrl || null}
              onSave={handleSave}
              onRetake={handleRetake}
              onShare={'share' in navigator ? handleShare : undefined}
              onClose={handleRetake}
              isSaving={isSaving}
              isSharing={isSharing}
            />
          )}

          {/* キャプチャエラー */}
          <CaptureError error={captureError} onRetry={handleCapture} onDismiss={clearError} />

          <SignboardSwitcher
            designs={SIGNBOARD_DESIGNS}
            currentDesignId={currentDesignId}
            onDesignChange={setCurrentDesignId}
            isVisible={showDesignSwitcher}
            onClose={() => setShowDesignSwitcher(false)}
          />

          {/* ターゲット画像表示（AR起動中） */}
          {showTargetImage && (
            <TargetImageDisplay
              imageUrl="/targets/sample-target.png"
              onClose={() => setShowTargetImage(false)}
            />
          )}
        </>
      )}

      {/* ターゲット画像表示（AR未起動時） */}
      {!isInitialized && !isInitializing && showTargetImage && (
        <TargetImageDisplay
          imageUrl="/targets/sample-target.png"
          onClose={() => setShowTargetImage(false)}
        />
      )}
    </div>
  );
}

export default App;
