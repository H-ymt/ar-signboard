import type { SignboardDesign } from '../types/signboard';

/**
 * サンプル看板デザイン
 * 実際の画像は public/images/ に配置してください
 */
export const SIGNBOARD_DESIGNS: SignboardDesign[] = [
  {
    id: 'signboard-1',
    name: 'シンプル',
    type: 'image',
    src: '/images/signboard-1.png',
    defaultScale: [1, 1, 1],
    thumbnail: '/images/signboard-1-thumb.png',
  },
  {
    id: 'signboard-2',
    name: 'カラフル',
    type: 'image',
    src: '/images/signboard-2.png',
    defaultScale: [1.2, 1.2, 1.2],
    thumbnail: '/images/signboard-2-thumb.png',
  },
  {
    id: 'signboard-3',
    name: 'エレガント',
    type: 'image',
    src: '/images/signboard-3.png',
    defaultScale: [1, 1, 1],
    thumbnail: '/images/signboard-3-thumb.png',
  },
];
