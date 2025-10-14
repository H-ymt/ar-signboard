import type { SignboardDesign } from '../../types/signboard';

interface SignboardSwitcherProps {
  designs: SignboardDesign[];
  currentDesignId: string;
  onDesignChange: (designId: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

/**
 * 看板デザイン切替コンポーネント
 * ボトムシートUIで複数のデザインから選択可能
 */
export const SignboardSwitcher = ({
  designs,
  currentDesignId,
  onDesignChange,
  isVisible,
  onClose,
}: SignboardSwitcherProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50">
      <div className="w-full rounded-t-2xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">デザインを選択</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {designs.map((design) => (
            <button
              key={design.id}
              onClick={() => {
                onDesignChange(design.id);
                onClose();
              }}
              className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                currentDesignId === design.id
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <img
                src={design.thumbnail || design.src}
                alt={design.name}
                className="aspect-square w-full object-cover"
              />
              {currentDesignId === design.id && (
                <div className="absolute right-2 top-2 rounded-full bg-blue-500 p-1 text-white">
                  ✓
                </div>
              )}
              <div className="p-2 text-center text-sm font-medium">{design.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
