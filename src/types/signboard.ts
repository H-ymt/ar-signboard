/**
 * 看板関連の型定義
 */

export type SignboardType = 'image' | 'model';

export interface SignboardDesign {
  id: string;
  name: string;
  type: SignboardType;
  src: string;
  defaultScale: [number, number, number];
  thumbnail?: string;
}
