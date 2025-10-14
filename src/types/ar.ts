/**
 * AR関連の型定義
 */

// MindAR 設定
export interface MindARConfig {
  targetUrl: string;
  maxTrack: number;
  filterMinCF: number;
  filterBeta: number;
}

// Transform（位置・回転・拡大縮小）
export interface Transform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

// トラッキング状態
export interface TrackingState {
  targetFound: boolean;
  isTracking: boolean;
  confidence: number;
}

// エラー型
export const ARErrorType = {
  BROWSER_NOT_SUPPORTED: 'BROWSER_NOT_SUPPORTED',
  CAMERA_PERMISSION_DENIED: 'CAMERA_PERMISSION_DENIED',
  CAMERA_ACCESS_FAILED: 'CAMERA_ACCESS_FAILED',
  MINDAR_INIT_FAILED: 'MINDAR_INIT_FAILED',
  AFRAME_INIT_FAILED: 'AFRAME_INIT_FAILED',
  TARGET_LOAD_FAILED: 'TARGET_LOAD_FAILED',
  MODEL_LOAD_FAILED: 'MODEL_LOAD_FAILED',
  TRACKING_FAILED: 'TRACKING_FAILED',
  CAPTURE_FAILED: 'CAPTURE_FAILED',
  SAVE_FAILED: 'SAVE_FAILED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type ARErrorType = (typeof ARErrorType)[keyof typeof ARErrorType];

export interface ARError {
  type: ARErrorType;
  message: string;
  recoverable: boolean;
  action?: string;
}

// 初期化状態
export interface InitializeState {
  isInitialized: boolean;
  isInitializing: boolean;
  error: ARError | null;
}

