/**
 * UI関連の型定義
 */

/**
 * ローディング状態
 */
export interface LoadingState {
  /** ローディング中かどうか */
  isLoading: boolean;
  /** ローディングメッセージ */
  message?: string;
  /** 進捗率（0-100） */
  progress?: number;
}

/**
 * エラー情報
 */
export interface ErrorInfo {
  /** エラーメッセージ */
  message: string;
  /** エラーコード */
  code?: string;
  /** エラー詳細 */
  details?: string;
  /** 復旧可能かどうか */
  recoverable?: boolean;
}

/**
 * 通知の種類
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/**
 * 通知情報
 */
export interface Notification {
  /** 通知ID */
  id: string;
  /** 通知タイプ */
  type: NotificationType;
  /** 通知メッセージ */
  message: string;
  /** 表示時間（ミリ秒）*/
  duration?: number;
  /** 自動非表示にするかどうか */
  autoHide?: boolean;
}

/**
 * モーダル情報
 */
export interface ModalState {
  /** モーダルが開いているかどうか */
  isOpen: boolean;
  /** モーダルタイトル */
  title?: string;
  /** モーダルコンテンツ */
  content?: React.ReactNode;
  /** 閉じるボタンの表示 */
  showCloseButton?: boolean;
}
