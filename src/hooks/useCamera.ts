import { useEffect, useState } from 'react';

import { CAMERA_CONSTRAINTS } from '../constants/ar';
import { ARErrorType } from '../types/ar';
import type { CameraState } from '../types/camera';
import { logger } from '../utils/logger';

export const useCamera = () => {
  const [state, setState] = useState<CameraState>({
    permission: 'pending',
    stream: null,
    error: null,
  });

  const requestCameraPermission = async () => {
    try {
      logger.info('Requesting camera permission...');

      const stream = await navigator.mediaDevices.getUserMedia(CAMERA_CONSTRAINTS);

      setState({
        permission: 'granted',
        stream,
        error: null,
      });

      logger.info('Camera permission granted');
    } catch (error) {
      logger.error('Camera permission denied or failed', error);

      const errorType =
        (error as Error).name === 'NotAllowedError'
          ? ARErrorType.CAMERA_PERMISSION_DENIED
          : ARErrorType.CAMERA_ACCESS_FAILED;

      setState({
        permission: 'denied',
        stream: null,
        error: {
          type: errorType,
          message: (error as Error).message,
          recoverable: errorType === ARErrorType.CAMERA_PERMISSION_DENIED,
        },
      });
    }
  };

  const stopCamera = () => {
    if (state.stream) {
      state.stream.getTracks().forEach((track) => track.stop());
      setState((prev) => ({ ...prev, stream: null }));
      logger.info('Camera stopped');
    }
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (state.stream) {
        state.stream.getTracks().forEach((track) => track.stop());
        logger.info('Camera stopped');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    requestCameraPermission,
    stopCamera,
  };
};
