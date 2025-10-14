import type { MindARConfig } from '../types/ar';
import type { CameraConstraints } from '../types/camera';

export const MINDAR_CONFIG: MindARConfig = {
  targetUrl: '/targets/default-target.mind',
  maxTrack: 1,
  filterMinCF: 0.0001,
  filterBeta: 0.001,
};

export const CAMERA_CONSTRAINTS: CameraConstraints = {
  video: {
    facingMode: 'environment',
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
};

export const DEFAULT_TRANSFORM = {
  position: [0, 0, 0] as [number, number, number],
  rotation: [0, 0, 0] as [number, number, number],
  scale: [1, 1, 1] as [number, number, number],
};
