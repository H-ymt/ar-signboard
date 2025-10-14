/**
 * カメラ関連の型定義
 */

/**
 * カメラの状態
 */
export type CameraStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'error';

/**
 * カメラ設定オプション
 */
export interface CameraConfig {
  /** カメラの向き (user: フロント, environment: リア) */
  facingMode?: 'user' | 'environment';
  /** 希望する解像度幅 */
  width?: number;
  /** 希望する解像度高さ */
  height?: number;
  /** フレームレート */
  frameRate?: number;
}

/**
 * カメラの状態情報
 */
export interface CameraState {
  /** カメラの状態 */
  status: CameraStatus;
  /** MediaStreamオブジェクト */
  stream: MediaStream | null;
  /** エラーメッセージ */
  error: string | null;
}

/**
 * カメラ権限エラーの種類
 */
export type CameraPermissionError =
  | 'NotAllowedError'
  | 'NotFoundError'
  | 'NotReadableError'
  | 'OverconstrainedError'
  | 'SecurityError'
  | 'TypeError'
  | 'Unknown';
