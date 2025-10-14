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

/**
 * A-Frameのカスタムエレメント型拡張
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          mindar?: string;
          'mindar-image'?: string;
          embedded?: boolean;
          'vr-mode-ui'?: string;
          'device-orientation-permission-ui'?: string;
        },
        HTMLElement
      >;
      'a-camera': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          position?: string;
          'look-controls'?: string;
          'gps-camera'?: string;
        },
        HTMLElement
      >;
      'a-entity': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'mindar-image-target'?: string;
          position?: string;
          rotation?: string;
          scale?: string;
          geometry?: string;
          material?: string;
          gltf?: string;
          'gltf-model'?: string;
          src?: string;
          visible?: boolean;
        },
        HTMLElement
      >;
      'a-plane': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          position?: string;
          rotation?: string;
          width?: number;
          height?: number;
          color?: string;
          src?: string;
          material?: string;
        },
        HTMLElement
      >;
      'a-box': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          position?: string;
          rotation?: string;
          color?: string;
          scale?: string;
        },
        HTMLElement
      >;
      'a-assets': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'a-asset-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          id?: string;
          src?: string;
        },
        HTMLElement
      >;
      'a-image': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          position?: string;
          rotation?: string;
          scale?: string;
          width?: number;
          height?: number;
        },
        HTMLElement
      >;
    }
  }
}
