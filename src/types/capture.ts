/**
 * キャプチャ関連の型定義
 */

export interface CaptureOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/png';
}

export interface CaptureResult {
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
  timestamp: number;
}

export interface CaptureError {
  type: CaptureErrorType;
  message: string;
  originalError?: Error;
}

export const CaptureErrorType = {
  SCENE_NOT_FOUND: 'SCENE_NOT_FOUND',
  CANVAS_NOT_FOUND: 'CANVAS_NOT_FOUND',
  CAPTURE_FAILED: 'CAPTURE_FAILED',
  SAVE_FAILED: 'SAVE_FAILED',
  SHARE_NOT_SUPPORTED: 'SHARE_NOT_SUPPORTED',
  SHARE_FAILED: 'SHARE_FAILED',
} as const;

export type CaptureErrorType =
  (typeof CaptureErrorType)[keyof typeof CaptureErrorType];
