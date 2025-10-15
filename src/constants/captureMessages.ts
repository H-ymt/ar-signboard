import { CaptureErrorType } from '../types/capture';

/**
 * キャプチャ機能のエラーメッセージ定義
 */
export const CAPTURE_ERROR_MESSAGES: Record<
  string,
  { title: string; message: string; action: string }
> = {
  [CaptureErrorType.SCENE_NOT_FOUND]: {
    title: 'ARシーンが見つかりません',
    message:
      'ARシーンの初期化が完了していない可能性があります。アプリを再起動してください。',
    action: '再起動',
  },
  [CaptureErrorType.CANVAS_NOT_FOUND]: {
    title: 'キャプチャ準備ができていません',
    message:
      'カメラ映像の準備が完了していません。しばらく待ってから再度お試しください。',
    action: '再試行',
  },
  [CaptureErrorType.CAPTURE_FAILED]: {
    title: 'キャプチャに失敗しました',
    message:
      '画像の取得中にエラーが発生しました。メモリ不足の可能性があります。他のアプリを終了してから再度お試しください。',
    action: '再試行',
  },
  [CaptureErrorType.SAVE_FAILED]: {
    title: '保存に失敗しました',
    message:
      '画像の保存中にエラーが発生しました。ストレージ容量を確認してください。',
    action: '再試行',
  },
  [CaptureErrorType.SHARE_NOT_SUPPORTED]: {
    title: '共有機能は利用できません',
    message:
      'お使いのブラウザは共有機能に対応していません。画像を保存してから他のアプリで共有してください。',
    action: '画像を保存',
  },
  [CaptureErrorType.SHARE_FAILED]: {
    title: '共有に失敗しました',
    message:
      '画像の共有中にエラーが発生しました。保存機能をご利用ください。',
    action: '保存する',
  },
};

/**
 * エラータイプから適切なメッセージを取得
 */
export const getCaptureErrorMessage = (errorType: string) => {
  return (
    CAPTURE_ERROR_MESSAGES[errorType] || {
      title: '予期しないエラー',
      message: '予期しないエラーが発生しました。アプリを再起動してください。',
      action: '再起動',
    }
  );
};
