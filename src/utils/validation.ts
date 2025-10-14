import { PERFORMANCE_CONFIG } from '../constants/config';

export const validateModelSize = (sizeInBytes: number): boolean => {
  return sizeInBytes <= PERFORMANCE_CONFIG.MAX_MODEL_SIZE;
};

export const validateImageUrl = (url: string): boolean => {
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
  return imageExtensions.test(url);
};

export const validateModelUrl = (url: string): boolean => {
  const modelExtensions = /\.(glb|gltf)$/i;
  return modelExtensions.test(url);
};
