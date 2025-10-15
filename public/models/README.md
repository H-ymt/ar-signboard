# 3Dモデル サンプル

このディレクトリには、AR看板アプリケーションで使用できるサンプルの3Dモデルが含まれています。

## 利用可能なモデル

### 1. sample-cube.gltf
- **形状**: 立方体
- **色**: シアンブルー (#00d9ff)
- **サイズ**: 1×1×1 単位
- **特徴**: メタリック感が少ない、マットな質感

### 2. sample-pyramid.gltf
- **形状**: 四角錐（ピラミッド）
- **色**: オレンジ (#ff8000)
- **サイズ**: 底面 1×1、高さ 1 単位
- **特徴**: 完全にマットな質感

## 使用方法

A-Frameコンポーネント内で以下のように使用できます：

\`\`\`tsx
<a-entity
  gltf-model="/models/sample-cube.gltf"
  position="0 0 0"
  scale="1 1 1"
/>
\`\`\`

または

\`\`\`tsx
<a-entity
  gltf-model="/models/sample-pyramid.gltf"
  position="0 0 0"
  scale="1 1 1"
/>
\`\`\`

## カスタマイズ

これらのモデルは基本的なプレースホルダーです。本番環境では以下を推奨します：

1. **軽量化**: 各モデルは 1〜3 MB 以下を目標
2. **最適化**: Draco圧縮やテクスチャ圧縮を活用
3. **テクスチャ**: 高解像度のテクスチャを追加してよりリアルに
4. **アニメーション**: glTFのアニメーション機能を活用

## カスタムモデルの追加

独自の3Dモデルを追加する場合：

1. Blender、Maya等で作成
2. glTF 2.0形式でエクスポート
3. このディレクトリに配置
4. ファイルサイズを確認（推奨: 1〜3 MB以下）

## ファイル形式

- `.gltf`: JSON形式（テキスト）
- `.bin`: バイナリデータ
- `.glb`: 全てを1つのバイナリファイルに統合（推奨）

## 参考リソース

- [glTF公式サイト](https://www.khronos.org/gltf/)
- [A-Frame glTFモデルドキュメント](https://aframe.io/docs/1.4.0/components/gltf-model.html)
- [glTF Viewer](https://gltf-viewer.donmccurdy.com/) - オンラインでプレビュー
