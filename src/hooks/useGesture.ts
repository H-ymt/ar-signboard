import { useCallback, useRef, useState } from 'react';

import type { Transform } from '../types/ar';

interface GestureState {
  isDragging: boolean;
  isPinching: boolean;
  isRotating: boolean;
}

/**
 * ジェスチャー操作のカスタムフック
 * ドラッグ、ピンチ、回転の3つのジェスチャーをサポート
 */
export const useGesture = (
  initialTransform: Transform,
  onTransformChange: (transform: Transform) => void
) => {
  const [transform, setTransform] = useState<Transform>(initialTransform);
  const [gestureState, setGestureState] = useState<GestureState>({
    isDragging: false,
    isPinching: false,
    isRotating: false,
  });

  // ドラッグ用の状態
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

  // ピンチ用の状態
  const initialDistanceRef = useRef<number>(0);
  const initialScaleRef = useRef<number>(1);

  // 回転用の状態
  const initialAngleRef = useRef<number>(0);
  const initialRotationRef = useRef<number>(0);

  // ドラッグ処理
  const handleDragStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      lastTouchRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      setGestureState((prev) => ({ ...prev, isDragging: true }));
    }
  }, []);

  const handleDragMove = useCallback(
    (e: TouchEvent) => {
      if (!gestureState.isDragging || !lastTouchRef.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - lastTouchRef.current.x;
      const deltaY = e.touches[0].clientY - lastTouchRef.current.y;

      const newPosition: [number, number, number] = [
        transform.position[0] + deltaX * 0.001,
        transform.position[1] - deltaY * 0.001,
        transform.position[2],
      ];

      const newTransform = { ...transform, position: newPosition };
      setTransform(newTransform);
      onTransformChange(newTransform);

      lastTouchRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    },
    [gestureState.isDragging, transform, onTransformChange]
  );

  const handleDragEnd = useCallback(() => {
    setGestureState((prev) => ({ ...prev, isDragging: false }));
    lastTouchRef.current = null;
  }, []);

  // ピンチ処理
  const handlePinchStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const distance = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
        initialDistanceRef.current = distance;
        initialScaleRef.current = transform.scale[0];
        setGestureState((prev) => ({ ...prev, isPinching: true, isDragging: false }));
      }
    },
    [transform.scale]
  );

  const handlePinchMove = useCallback(
    (e: TouchEvent) => {
      if (!gestureState.isPinching || e.touches.length !== 2) return;

      const distance = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );

      const scale = (distance / initialDistanceRef.current) * initialScaleRef.current;
      const clampedScale = Math.max(0.5, Math.min(3, scale)); // 0.5x ~ 3x

      const newScale: [number, number, number] = [clampedScale, clampedScale, clampedScale];
      const newTransform = { ...transform, scale: newScale };
      setTransform(newTransform);
      onTransformChange(newTransform);
    },
    [gestureState.isPinching, transform, onTransformChange]
  );

  const handlePinchEnd = useCallback(() => {
    setGestureState((prev) => ({ ...prev, isPinching: false }));
  }, []);

  // 回転処理
  const handleRotationStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const angle = Math.atan2(
          e.touches[1].clientY - e.touches[0].clientY,
          e.touches[1].clientX - e.touches[0].clientX
        );
        initialAngleRef.current = angle;
        initialRotationRef.current = transform.rotation[2];
        setGestureState((prev) => ({ ...prev, isRotating: true }));
      }
    },
    [transform.rotation]
  );

  const handleRotationMove = useCallback(
    (e: TouchEvent) => {
      if (!gestureState.isRotating || e.touches.length !== 2) return;

      const angle = Math.atan2(
        e.touches[1].clientY - e.touches[0].clientY,
        e.touches[1].clientX - e.touches[0].clientX
      );

      const deltaAngle = angle - initialAngleRef.current;
      const newRotationZ = initialRotationRef.current + (deltaAngle * 180) / Math.PI;

      const newRotation: [number, number, number] = [
        transform.rotation[0],
        transform.rotation[1],
        newRotationZ,
      ];

      const newTransform = { ...transform, rotation: newRotation };
      setTransform(newTransform);
      onTransformChange(newTransform);
    },
    [gestureState.isRotating, transform, onTransformChange]
  );

  const handleRotationEnd = useCallback(() => {
    setGestureState((prev) => ({ ...prev, isRotating: false }));
  }, []);

  // 統合タッチハンドラ
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleDragStart(e);
      } else if (e.touches.length === 2) {
        handlePinchStart(e);
        handleRotationStart(e);
      }
    },
    [handleDragStart, handlePinchStart, handleRotationStart]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleDragMove(e);
      } else if (e.touches.length === 2) {
        handlePinchMove(e);
        handleRotationMove(e);
      }
    },
    [handleDragMove, handlePinchMove, handleRotationMove]
  );

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
    handlePinchEnd();
    handleRotationEnd();
  }, [handleDragEnd, handlePinchEnd, handleRotationEnd]);

  return {
    transform,
    gestureState,
    handlers: {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    },
  };
};
