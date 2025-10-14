import { ARErrorType } from '../types/ar';

export const ERROR_MESSAGES: Record<ARErrorType, string> = {
  BROWSER_NOT_SUPPORTED:
    'お使いのブラウザはAR機能に対応していません。\nSafari（iOS）またはChrome（Android）をご利用ください。',
  CAMERA_PERMISSION_DENIED:
    'カメラへのアクセスが許可されていません。\nブラウザの設定からカメラの使用を許可してください。',
  CAMERA_ACCESS_FAILED:
    'カメラの起動に失敗しました。\n他のアプリでカメラを使用していないか確認してください。',
  MINDAR_INIT_FAILED: 'AR機能の初期化に失敗しました。\nページを再読み込みしてください。',
  AFRAME_INIT_FAILED: 'AR表示エンジンの初期化に失敗しました。\nページを再読み込みしてください。',
  TARGET_LOAD_FAILED: '認識用画像の読み込みに失敗しました。\nネットワーク接続を確認してください。',
  MODEL_LOAD_FAILED: '看板モデルの読み込みに失敗しました。\nネットワーク接続を確認してください。',
  TRACKING_FAILED: '画像の認識に失敗しました。\n対象の画像をカメラに映してください。',
  CAPTURE_FAILED: '写真の撮影に失敗しました。\nもう一度お試しください。',
  SAVE_FAILED: '写真の保存に失敗しました。\nストレージの空き容量を確認してください。',
  UNKNOWN_ERROR: '予期しないエラーが発生しました。\nページを再読み込みしてください。',
};
