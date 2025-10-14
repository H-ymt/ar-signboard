/**
 * AR関連の定数
 */

import type { ARConfig } from '../types';

/**
 * デフォルトのAR設定
 */
export const DEFAULT_AR_CONFIG: Omit<ARConfig, 'targetImagePath'> = {
  maxTrack: 1,
  warmupTolerance: 5,
  filterMinCF: 0.0001,
  filterBeta: 0.001,
  missTolerance: 5,
};

/**
 * MindARシステムのデフォルト設定文字列
 */
export const MINDAR_SYSTEM_CONFIG = {
  /** 画像トラッキング用の基本設定 */
  imageTargetSrc: '/targets/default.mind',
  /** UIハンドラーの無効化 */
  uiScanning: 'no',
  uiLoading: 'no',
  /** AR画面の埋め込みモード */
  arMode: 'inline',
} as const;

/**
 * A-Frameシーンの設定
 */
export const AFRAME_SCENE_CONFIG = {
  /** VRモードUIの無効化 */
  vrModeUI: { enabled: false },
  /** デバイス方向許可UIの無効化 */
  deviceOrientationPermissionUI: { enabled: false },
} as const;

/**
 * カメラの設定
 */
export const CAMERA_CONFIG = {
  /** カメラの位置 */
  position: '0 0 0',
  /** ルックコントロールの無効化 */
  lookControls: { enabled: false },
} as const;

/**
 * 看板のデフォルト設定
 */
export const DEFAULT_SIGNBOARD_CONFIG = {
  /** デフォルト位置 (x, y, z) */
  position: [0, 0, 0] as [number, number, number],
  /** デフォルト回転 (x, y, z) 度数法 */
  rotation: [0, 0, 0] as [number, number, number],
  /** デフォルトスケール */
  scale: [1, 1, 1] as [number, number, number],
} as const;

/**
 * パフォーマンス設定
 */
export const PERFORMANCE_CONFIG = {
  /** 目標フレームレート */
  targetFPS: 60,
  /** 最低フレームレート */
  minFPS: 30,
  /** フレームレート監視間隔（ミリ秒）*/
  fpsCheckInterval: 1000,
} as const;

/**
 * タイムアウト設定
 */
export const TIMEOUT_CONFIG = {
  /** AR初期化タイムアウト（ミリ秒）*/
  arInitTimeout: 30000,
  /** カメラアクセスタイムアウト（ミリ秒）*/
  cameraAccessTimeout: 10000,
  /** リソース読み込みタイムアウト（ミリ秒）*/
  resourceLoadTimeout: 15000,
} as const;
