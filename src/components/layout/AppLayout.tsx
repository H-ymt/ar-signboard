/**
 * アプリケーションのメインレイアウトコンポーネント
 */

import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * アプリケーション全体のレイアウト
 */
export function AppLayout({ children }: AppLayoutProps) {
  return <div className="bg-background relative h-screen w-full overflow-hidden">{children}</div>;
}
