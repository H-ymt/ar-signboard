/**
 * メインアプリケーションコンポーネント
 */

import { useState } from 'react';

import { ARScene } from './components/ar/ARScene';
import { ControlsOverlay } from './components/ui/ControlsOverlay';
import { ErrorDialog } from './components/ui/ErrorDialog';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { SignboardSwitcher } from './components/ui/SignboardSwitcher';
import { DEFAULT_TRANSFORM, MINDAR_CONFIG } from './constants/ar';
import { SIGNBOARD_DESIGNS } from './data/signboards';
import { useARInitialize } from './hooks/useARInitialize';
import { useCamera } from './hooks/useCamera';
import { useGesture } from './hooks/useGesture';

function App() {
  const { isInitializing, isInitialized, error: arError, initialize } = useARInitialize();
  const { permission, error: cameraError, requestCameraPermission } = useCamera();

  const [isTracking, setIsTracking] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [showDesignSwitcher, setShowDesignSwitcher] = useState(false);
  const [currentDesignId, setCurrentDesignId] = useState(SIGNBOARD_DESIGNS[0].id);

  const currentDesign =
    SIGNBOARD_DESIGNS.find((d) => d.id === currentDesignId) || SIGNBOARD_DESIGNS[0];

  const { transform } = useGesture(DEFAULT_TRANSFORM, (newTransform) => {
    console.log('Transform updated:', newTransform);
  });

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
        <div className="bg-background flex h-full items-center justify-center">
          <button
            onClick={handleStart}
            className="bg-primary duration-base hover:bg-primary-hover rounded-lg px-8 py-4 text-xl font-bold text-white shadow-lg transition-all hover:shadow-xl"
          >
            AR体験を開始
          </button>
        </div>
      )}

      {isInitialized && (
        <>
          <ARScene
            targetUrl={MINDAR_CONFIG.targetUrl}
            signboard={currentDesign}
            transform={transform}
            onTargetFound={() => setIsTracking(true)}
            onTargetLost={() => setIsTracking(false)}
          />

          <ControlsOverlay
            isTracking={isTracking}
            showHelp={showHelp}
            onToggleDesignSwitcher={() => setShowDesignSwitcher(!showDesignSwitcher)}
            onDismissHelp={() => setShowHelp(false)}
          />

          <SignboardSwitcher
            designs={SIGNBOARD_DESIGNS}
            currentDesignId={currentDesignId}
            onDesignChange={setCurrentDesignId}
            isVisible={showDesignSwitcher}
            onClose={() => setShowDesignSwitcher(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
