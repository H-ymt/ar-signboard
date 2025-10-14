/**
 * カメラ関連の型定義
 */

import type { ARError } from './ar';

export type CameraPermission = 'pending' | 'granted' | 'denied';

export interface CameraConstraints {
  video: {
    facingMode: 'environment';
    width: { ideal: number };
    height: { ideal: number };
  };
}

export interface CameraState {
  permission: CameraPermission;
  stream: MediaStream | null;
  error: ARError | null;
}
