/**
 * A-Frameカスタムエレメント型定義
 */

import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'mindar-image'?: string;
          'color-space'?: string;
          renderer?: string;
          'vr-mode-ui'?: string;
          'device-orientation-permission-ui'?: string;
        },
        HTMLElement
      >;
      'a-camera': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          position?: string;
          'look-controls'?: string;
        },
        HTMLElement
      >;
      'a-entity': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'mindar-image-target'?: string;
        },
        HTMLElement
      >;
      'a-plane': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          position?: string;
          rotation?: string;
          scale?: string;
          width?: number;
          height?: number;
          material?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
