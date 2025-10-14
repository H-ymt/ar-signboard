# ターゲット画像

このディレクトリには、MindARが認識するためのターゲット画像ファイルを配置します。

## ファイル形式

- **オリジナル画像**: `.jpg` または `.png`
- **コンパイル済みファイル**: `.mind` (MindAR専用形式)

## ターゲット画像の要件

- 推奨サイズ: 1024x1024px 以下
- 特徴点が多い画像 (コントラストが高く、パターンが特徴的)
- 単色や繰り返しパターンは避ける

## コンパイル方法

```bash
# MindAR CLIツールのインストール
npm install -g mind-ar-cli

# ターゲット画像のコンパイル
mind-ar-cli compile \
  --input public/targets/your-target.jpg \
  --output public/targets/your-target.mind \
  --max-track 1
```

## デフォルトターゲット

- `default-target.jpg` - オリジナルのターゲット画像
- `default-target.mind` - コンパイル済みターゲットファイル

このファイルを配置してください。
