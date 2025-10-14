/**
 * UI関連の型定義
 */

export type AppScreen =
  | 'loading'
  | 'camera-permission'
  | 'scanning'
  | 'ar-view'
  | 'capture-preview'
  | 'error';

export interface UIState {
  currentScreen: AppScreen;
  showControlsHelp: boolean;
  showDesignSwitcher: boolean;
  capturedImage: string | null;
}
