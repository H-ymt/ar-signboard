declare module 'mind-ar/dist/mindar-image-three.prod.js' {
  export class MindARThree {
    constructor(config: {
      container: HTMLElement;
      imageTargetSrc: string;
      maxTrack: number;
      filterMinCF: number;
      filterBeta: number;
    });
    start(): Promise<void>;
    stop(): void;
  }
}
