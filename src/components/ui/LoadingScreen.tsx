export const LoadingScreen = () => {
  return (
    <div className="z-loading fixed inset-0 flex flex-col items-center justify-center bg-gray-900">
      <div className="border-t-ar-primary mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-700"></div>
      <p className="text-lg text-white">AR機能を初期化しています...</p>
    </div>
  );
};
