import { useEffect, useRef } from 'react';

import type { Transform } from '../../types/ar';
import type { SignboardDesign } from '../../types/signboard';

import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

interface ARSceneProps {
  targetUrl: string;
  signboard: SignboardDesign;
  transform: Transform;
  onTargetFound: () => void;
  onTargetLost: () => void;
}

/**
 * ARシーンコンポーネント
 * A-FrameとMindARを使用してAR表示を行う
 */
export const ARScene = ({
  targetUrl,
  signboard,
  transform,
  onTargetFound,
  onTargetLost,
}: ARSceneProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const sceneEl = sceneRef.current.querySelector('a-scene');
    if (!sceneEl) return;

    // mindar-image-target エンティティを取得
    const targetEl = sceneEl.querySelector('[mindar-image-target]');
    if (!targetEl) return;

    // ターゲット検出イベントのハンドラ
    const handleTargetFound = () => {
      console.log('[ARScene] Target found');
      onTargetFound();
    };

    const handleTargetLost = () => {
      console.log('[ARScene] Target lost');
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
