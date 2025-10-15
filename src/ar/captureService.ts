import type { CaptureOptions, CaptureResult } from '../types/capture';
import { CaptureErrorType } from '../types/capture';

/**
 * A-FrameシーンをキャプチャしてBase64画像データを取得
 */
// A-Frameのシーン要素の型定義
interface AFrameScene extends HTMLElement {
  renderer?: {
    domElement: HTMLCanvasElement;
  };
}

export const captureARScene = async (
  sceneElement: HTMLElement,
  options: CaptureOptions = {},
): Promise<CaptureResult> => {
  // A-Frameのscene要素を取得
  const scene = sceneElement.querySelector('a-scene') as AFrameScene | null;
  if (!scene) {
    throw new Error(CaptureErrorType.SCENE_NOT_FOUND);
  }

  // A-Frameのcanvasを取得
  const canvas = scene.renderer?.domElement;
  if (!canvas) {
    throw new Error(CaptureErrorType.CANVAS_NOT_FOUND);
  }

  // オプションのデフォルト値
  const {
    width = canvas.width,
    height = canvas.height,
    quality = 0.92,
    format = 'image/jpeg',
  } = options;

  try {
    // canvasからBase64データを取得
    const dataUrl = canvas.toDataURL(format, quality);

    // BlobURLに変換
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    return {
      dataUrl,
      blob,
      width,
      height,
      timestamp: Date.now(),
    };
  } catch (err) {
    console.error('Capture failed:', err);
    throw new Error(CaptureErrorType.CAPTURE_FAILED);
  }
};

/**
 * 画像を端末に保存
 */
export const saveImage = async (result: CaptureResult): Promise<void> => {
  try {
    const timestamp = new Date(result.timestamp)
      .toISOString()
      .replace(/:/g, '')
      .replace(/\..+/, '')
      .replace('T', '-');

    const filename = `ar-signboard-${timestamp}.jpg`;

    // HTML5 Download APIを使用
    const link = document.createElement('a');
    link.href = result.dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Save failed:', err);
    throw new Error(CaptureErrorType.SAVE_FAILED);
  }
};

/**
 * Web Share APIで画像を共有
 */
export const shareImage = async (result: CaptureResult): Promise<void> => {
  if (!navigator.share || !navigator.canShare) {
    throw new Error(CaptureErrorType.SHARE_NOT_SUPPORTED);
  }

  try {
    const file = new File([result.blob], 'ar-signboard.jpg', {
      type: 'image/jpeg',
    });

    const shareData = {
      files: [file],
      title: 'AR看板',
      text: 'AR看板アプリでキャプチャしました',
    };

    if (!navigator.canShare(shareData)) {
      throw new Error(CaptureErrorType.SHARE_NOT_SUPPORTED);
    }

    await navigator.share(shareData);
  } catch (err) {
    // ユーザーがキャンセルした場合は例外を投げない
    if (err instanceof Error && err.name === 'AbortError') {
      console.log('Share cancelled by user');
      return;
    }
    console.error('Share failed:', err);
    throw new Error(CaptureErrorType.SHARE_FAILED);
  }
};

/**
 * キャプチャ可能かどうかをチェック
 */
export const canCapture = (sceneElement: HTMLElement | null): boolean => {
  if (!sceneElement) return false;

  const scene = sceneElement.querySelector('a-scene') as AFrameScene | null;
  if (!scene) return false;

  const canvas = scene.renderer?.domElement;
  return !!canvas;
};

/**
 * 共有機能が利用可能かどうかをチェック
 */
export const canShare = (): boolean => {
  return 'share' in navigator && 'canShare' in navigator;
};
