import { useState } from 'react';

import { MindARController } from '../ar/MindARController';
import type { InitializeState } from '../types/ar';
import { ARErrorType } from '../types/ar';
import { isBrowserSupported } from '../utils/browser';
import { logger } from '../utils/logger';

export const useARInitialize = () => {
  const [state, setState] = useState<InitializeState>({
    isInitialized: false,
    isInitializing: false,
    error: null,
  });

  const [controller] = useState(() => new MindARController());

  const initialize = async () => {
    try {
      setState({ isInitializing: true, isInitialized: false, error: null });

      // 1. ブラウザ対応チェック
      if (!isBrowserSupported()) {
        throw {
          type: ARErrorType.BROWSER_NOT_SUPPORTED,
          message: 'Browser not supported',
          recoverable: false,
        };
      }

      // 2. A-Frameを使用する場合は、MindARControllerの初期化をスキップ
      // A-Frameのシーンが読み込まれた時点で初期化完了とみなす
      // await controller.initialize(MINDAR_CONFIG);

      // すぐに初期化完了とする（A-Frameが自動的に初期化を行うため）
      setState({ isInitialized: true, isInitializing: false, error: null });
    } catch (error) {
      logger.error('AR initialization failed', error);
      setState({
        isInitialized: false,
        isInitializing: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: error as any,
      });
    }
  };

  const cleanup = () => {
    controller.stop();
  };

  return { ...state, initialize, cleanup, controller };
};
