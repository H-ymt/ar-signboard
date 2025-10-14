/**
 * AR関連の型定義
 */

/**
 * AR初期化状態
 */
export type ARInitStatus = 'idle' | 'initializing' | 'ready' | 'error';

/**
 * AR認識状態
 */
export type ARTrackingStatus = 'not-started' | 'tracking' | 'lost';

/**
 * AR設定オプション
 */
export interface ARConfig {
  /** ターゲット画像ファイルパス (.mind形式) */
  targetImagePath: string;
  /** 最大トラック数 */
  maxTrack?: number;
  /** ウォームアップ時間（トラック数 * 15 * 1000）*/
  warmupTolerance?: number;
  /** フィルタリング最小信頼度 */
  filterMinCF?: number;
  /** フィルタリングベータ値（0-1: 大きいほど滑らか） */
  filterBeta?: number;
  /** 誤検出しきい値 */
  missTolerance?: number;
}

/**
 * ARシーンの状態
 */
export interface ARSceneState {
  /** 初期化状態 */
  initStatus: ARInitStatus;
  /** トラッキング状態 */
  trackingStatus: ARTrackingStatus;
  /** エラーメッセージ */
  error: string | null;
  /** カメラが利用可能かどうか */
  isCameraAvailable: boolean;
}

/**
 * AR看板エンティティ
 */
export interface AREntity {
  /** エンティティID */
  id: string;
  /** エンティティタイプ */
  type: 'image' | 'model';
  /** リソースパス */
  src: string;
  /** 位置 (x, y, z) */
  position: [number, number, number];
  /** 回転 (x, y, z) 度数法 */
  rotation: [number, number, number];
  /** スケール */
  scale: [number, number, number];
  /** 可視性 */
  visible: boolean;
}

/**
 * MindARシステムのイベント型
 */
export interface MindAREvents {
  arReady: () => void;
  arError: (error: Error) => void;
  targetFound: (event: { target: number }) => void;
  targetLost: (event: { target: number }) => void;
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
