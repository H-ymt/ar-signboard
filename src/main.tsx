import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';

import App from './App.tsx';

import './index.css';

// A-FrameとMindARのスクリプトを読み込み
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SpeedInsights />
    <App />
  </StrictMode>
);
