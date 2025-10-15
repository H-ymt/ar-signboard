import { useEffect, useRef, useState } from 'react';

import type { Transform } from '../../types/ar';

import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

interface ARSceneProps {
  targetUrl: string;
  transform: Transform;
  onTargetFound: () => void;
  onTargetLost: () => void;
  shouldResetModel: boolean;
  onModelReset: () => void;
}

/**
 * ARシーンコンポーネント
 * A-FrameとMindARを使用してAR表示を行う
 */
export const ARScene = ({
  targetUrl,
  transform,
  onTargetFound,
  onTargetLost,
  shouldResetModel,
  onModelReset,
}: ARSceneProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isModelVisible, setIsModelVisible] = useState(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const sceneEl = sceneRef.current.querySelector('a-scene');
    if (!sceneEl) return;

    // mindar-image-target エンティティを取得
    const targetEl = sceneEl.querySelector('[mindar-image-target]');
    if (!targetEl) return;

    // 3Dモデルのエンティティを取得
    const modelEl = targetEl.querySelector('[gltf-model]');
    if (!modelEl) return;

    // ターゲット検出イベントのハンドラ
    const handleTargetFound = () => {
      console.log('[ARScene] Target found');
      setIsModelVisible(true);
      onTargetFound();
    };

    const handleTargetLost = () => {
      console.log('[ARScene] Target lost - model will persist');
      // モデルを表示し続ける（非表示にしない）
      onTargetLost();
    };

    // イベントリスナーの登録（targetEl に登録）
    targetEl.addEventListener('targetFound', handleTargetFound);
    targetEl.addEventListener('targetLost', handleTargetLost);

    return () => {
      // クリーンアップ
      targetEl.removeEventListener('targetFound', handleTargetFound);
      targetEl.removeEventListener('targetLost', handleTargetLost);
    };
  }, [onTargetFound, onTargetLost]);

  // モデルの表示/非表示を制御
  useEffect(() => {
    if (!sceneRef.current) return;

    const sceneEl = sceneRef.current.querySelector('a-scene');
    if (!sceneEl) return;

    const targetEl = sceneEl.querySelector('[mindar-image-target]');
    if (!targetEl) return;

    const modelEl = targetEl.querySelector('[gltf-model]');
    if (!modelEl) return;

    // モデルの表示を維持
    if (isModelVisible) {
      modelEl.setAttribute('visible', 'true');
    }
  }, [isModelVisible, transform]);

  // リセット処理
  useEffect(() => {
    if (shouldResetModel) {
      console.log('[ARScene] Resetting model visibility');
      setIsModelVisible(false);

      if (!sceneRef.current) return;

      const sceneEl = sceneRef.current.querySelector('a-scene');
      if (!sceneEl) return;

      const targetEl = sceneEl.querySelector('[mindar-image-target]');
      if (!targetEl) return;

      const modelEl = targetEl.querySelector('[gltf-model]');
      if (!modelEl) return;

      modelEl.setAttribute('visible', 'false');
      onModelReset();
    }
  }, [shouldResetModel, onModelReset]);

  return (
    <div ref={sceneRef} className="fixed inset-0">
      {/* @ts-expect-error A-Frame custom elements */}
      <a-scene
        mindar-image={`imageTargetSrc: ${targetUrl}; maxTrack: 1`}
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        {/* @ts-expect-error A-Frame custom elements */}
        <a-camera position="0 0 0" look-controls="enabled: false" />
        {/* @ts-expect-error A-Frame custom elements */}
        <a-entity mindar-image-target="targetIndex: 0">
          {/* @ts-expect-error A-Frame custom elements */}
          <a-entity
            gltf-model="/models/guide-sign.gltf"
            position={`${transform.position[0]} ${transform.position[1]} ${transform.position[2]}`}
            rotation={`${transform.rotation[0]} ${transform.rotation[1]} ${transform.rotation[2]}`}
            scale={`${transform.scale[0]} ${transform.scale[1]} ${transform.scale[2]}`}
          />
          {/* @ts-expect-error A-Frame custom elements */}
        </a-entity>
        {/* @ts-expect-error A-Frame custom elements */}
      </a-scene>
    </div>
  );
};
