/**
 * 看板関連の型定義
 */

/**
 * 看板の種類
 */
export type SignboardType = 'image' | 'model';

/**
 * 看板データ
 */
export interface Signboard {
  /** 看板ID */
  id: string;
  /** 看板名 */
  name: string;
  /** 看板タイプ */
  type: SignboardType;
  /** リソースパス */
  src: string;
  /** サムネイルパス */
  thumbnail?: string;
  /** 初期位置 */
  defaultPosition: [number, number, number];
  /** 初期回転 */
  defaultRotation: [number, number, number];
  /** 初期スケール */
  defaultScale: [number, number, number];
  /** 説明 */
  description?: string;
}

/**
 * 看板の配置情報
 */
export interface SignboardPlacement {
  /** 看板ID */
  signboardId: string;
  /** 配置位置 */
  position: [number, number, number];
  /** 回転 */
  rotation: [number, number, number];
  /** スケール */
  scale: [number, number, number];
  /** 可視性 */
  visible: boolean;
}
