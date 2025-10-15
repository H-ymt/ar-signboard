import type { MindARConfig } from '../types/ar';
import { ARErrorType } from '../types/ar';
import { logger } from '../utils/logger';

export class MindARController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mindarThree: any = null;
  private isInitialized = false;

  async initialize(config: MindARConfig) {
    try {
      logger.info('Initializing MindAR...', config);

      // MindAR の動的インポート
      const { MindARThree } = await import('mind-ar/dist/mindar-image-three.prod.js');

      this.mindarThree = new MindARThree({
        container: document.body,
        imageTargetSrc: config.targetUrl,
        maxTrack: config.maxTrack,
        filterMinCF: config.filterMinCF,
        filterBeta: config.filterBeta,
      });

      // タイムアウト付きで初期化を実行（30秒）
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('MindAR initialization timeout (30s). ターゲットファイルが存在しないか、読み込みに失敗しました。'));
        }, 30000);
      });

      await Promise.race([
        this.mindarThree.start(),
        timeoutPromise,
      ]);

      this.isInitialized = true;

      logger.info('MindAR initialized successfully');
    } catch (error) {
      logger.error('MindAR initialization failed', error);
      throw {
        type: ARErrorType.MINDAR_INIT_FAILED,
        message: (error as Error).message,
        recoverable: true,
      };
    }
  }

  stop() {
    if (this.mindarThree) {
      this.mindarThree.stop();
      logger.info('MindAR stopped');
    }
  }

  getMindarThree() {
    return this.mindarThree;
  }

  isReady() {
    return this.isInitialized;
  }
}
