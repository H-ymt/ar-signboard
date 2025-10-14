/**
 * メインアプリケーションコンポーネント
 */

import { AppLayout } from './components/layout';
import { ARProvider } from './context';

function App() {
  return (
    <ARProvider>
      <AppLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-body mb-4 text-3xl font-bold">AR看板アプリ</h1>
            <p className="text-body-light text-lg">AR機能の実装準備が完了しました</p>
          </div>
        </div>
      </AppLayout>
    </ARProvider>
  );
}

export default App;
