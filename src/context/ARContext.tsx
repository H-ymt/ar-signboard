/**
 * ARコンテキスト - AR状態の管理
 */

import { createContext, type ReactNode,useCallback, useContext, useState } from 'react';

import type { ARInitStatus, ARSceneState, ARTrackingStatus } from '../types';

/**
 * ARコンテキストの値の型
 */
interface ARContextValue {
  /** ARシーンの状態 */
  sceneState: ARSceneState;
  /** 初期化状態を更新 */
  setInitStatus: (status: ARInitStatus) => void;
  /** トラッキング状態を更新 */
  setTrackingStatus: (status: ARTrackingStatus) => void;
  /** エラーを設定 */
  setError: (error: string | null) => void;
  /** カメラ利用可能状態を設定 */
  setCameraAvailable: (available: boolean) => void;
  /** 状態をリセット */
  reset: () => void;
}

/**
 * 初期状態
 */
const initialState: ARSceneState = {
  initStatus: 'idle',
  trackingStatus: 'not-started',
  error: null,
  isCameraAvailable: false,
};

/**
 * ARコンテキスト
 */
const ARContext = createContext<ARContextValue | undefined>(undefined);

/**
 * ARコンテキストプロバイダーのProps
 */
interface ARProviderProps {
  children: ReactNode;
}

/**
 * ARコンテキストプロバイダー
 */
export function ARProvider({ children }: ARProviderProps) {
  const [sceneState, setSceneState] = useState<ARSceneState>(initialState);

  /**
   * 初期化状態を更新
   */
  const setInitStatus = useCallback((status: ARInitStatus) => {
    setSceneState((prev) => ({ ...prev, initStatus: status }));
  }, []);

  /**
   * トラッキング状態を更新
   */
  const setTrackingStatus = useCallback((status: ARTrackingStatus) => {
    setSceneState((prev) => ({ ...prev, trackingStatus: status }));
  }, []);

  /**
   * エラーを設定
   */
  const setError = useCallback((error: string | null) => {
    setSceneState((prev) => ({
      ...prev,
      error,
      initStatus: error ? 'error' : prev.initStatus,
    }));
  }, []);

  /**
   * カメラ利用可能状態を設定
   */
  const setCameraAvailable = useCallback((available: boolean) => {
    setSceneState((prev) => ({ ...prev, isCameraAvailable: available }));
  }, []);

  /**
   * 状態をリセット
   */
  const reset = useCallback(() => {
    setSceneState(initialState);
  }, []);

  const value: ARContextValue = {
    sceneState,
    setInitStatus,
    setTrackingStatus,
    setError,
    setCameraAvailable,
    reset,
  };

  return <ARContext.Provider value={value}>{children}</ARContext.Provider>;
}

/**
 * ARコンテキストを使用するカスタムフック
 */
export function useAR(): ARContextValue {
  const context = useContext(ARContext);
  if (!context) {
    throw new Error('useAR must be used within an ARProvider');
  }
  return context;
}
