import { useCallback,useState } from 'react';

import {
  captureARScene,
  saveImage,
  shareImage,
} from '../ar/captureService';
import type { CaptureResult } from '../types/capture';

export const useCapture = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [captureResult, setCaptureResult] = useState<CaptureResult | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);

  const capture = useCallback(async (sceneElement: HTMLElement) => {
    setIsCapturing(true);
    setError(null);

    try {
      const result = await captureARScene(sceneElement);
      setCaptureResult(result);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsCapturing(false);
    }
  }, []);

  const save = useCallback(async () => {
    if (!captureResult) return;

    setIsSaving(true);
    setError(null);

    try {
      await saveImage(captureResult);
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [captureResult]);

  const share = useCallback(async () => {
    if (!captureResult) return;

    setIsSharing(true);
    setError(null);

    try {
      await shareImage(captureResult);
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsSharing(false);
    }
  }, [captureResult]);

  const reset = useCallback(() => {
    setCaptureResult(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isCapturing,
    isSaving,
    isSharing,
    captureResult,
    error,
    capture,
    save,
    share,
    reset,
    clearError,
  };
};
