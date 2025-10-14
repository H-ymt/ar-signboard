/**
 * 型定義のエクスポート
 */

export * from './ar';
export * from './camera';
export * from './signboard';
export * from './ui';

// 既存のARContext用の型（後方互換性のため）
export type ARInitStatus = 'idle' | 'initializing' | 'ready' | 'error';
export type ARTrackingStatus = 'not-started' | 'tracking' | 'lost';

export interface ARSceneState {
  initStatus: ARInitStatus;
  trackingStatus: ARTrackingStatus;
  error: string | null;
  isCameraAvailable: boolean;
}
