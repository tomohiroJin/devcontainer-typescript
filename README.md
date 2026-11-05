# devcontainer-typescript

Node.js・TypeScript のサンプルと、VS Code / Dev Container で共通に使える開発環境です。
ロックファイルを共有し、ローカル・コンテナ・CI で同じ依存関係を使います。

## 構成

| 項目           | 採用構成                                                                    |
| -------------- | --------------------------------------------------------------------------- |
| Node.js        | 26.13.0（Active LTS、`.nvmrc`）                                             |
| npm            | 11.20.0（Node.js 同梱、`packageManager`）                                   |
| TypeScript     | 6.0.3、strict、NodeNext / ESM                                               |
| テスト         | Vitest 5、V8 カバレッジ                                                     |
| 静的解析・整形 | ESLint 10 flat config / typescript-eslint / Prettier 3                      |
| コンテナ       | 公式 TypeScript / Node.js 26 + Debian 13 Trixie、非 root の `node` ユーザー |
| CI             | GitHub Actions、`npm ci` → `npm run check` → `npm audit`                    |

バージョンの選定理由・公式資料・脆弱性対応・検証状況は [開発環境の選定と検証](docs/toolchain.md) を参照してください。

## セットアップ

### VS Code / Dev Container

1. Docker と VS Code **1.145.0 以降の安定版**（2026-11-05時点の最新版）、Microsoft の **Dev Containers** 拡張（`ms-vscode-remote.remote-containers`）を導入します。
2. リポジトリをクローンして VS Code で開きます。
3. コマンドパレットから **Dev Containers: Reopen in Container** を実行します。
4. `updateContentCommand` の `npm ci` が完了してから、拡張が利用可能になります。
5. **TypeScript: Select TypeScript Version → Use Workspace Version** でローカルの TypeScript を選択します。

コンテナは digest まで固定しています。設定やイメージを変更したときは **Dev Containers: Rebuild Container** を実行します。VS Code の設定は `.vscode/settings.json` に集約し、コンテナ固有の拡張導入だけを `.devcontainer/devcontainer.json` で指定しています。

### ローカル / クラウド環境

Docker を使わない場合も、Node.js と npm があれば開発できます。nvm を使う場合:

```bash
cd devcontainer-typescript
nvm install
nvm use
node --version # v26.13.0
npm --version  # 11.20.0
npm ci
npm run check
```

Node.js 26.13.0 に同梱の npm 11.20.0 を基準とします。npm のメジャーを変更済みなら `npm install --global npm@11.20.0` で揃えてください。`.npmrc` の `engine-strict` により、対象外の Node.js では通常のインストールに失敗します。npm は `packageManager` で指定し、`npm run check:runtime` と CI でバージョンの一致を検証します。クラウド環境でも、同じ Node.js / npm とロックファイルを使ってセットアップできます。

`engines.node` の `>=26.13.0 <27` は依存導入を許容する範囲です。一方、再現性を確保するため、`npm run check` は **Node.js が `.nvmrc` とパッチまで完全一致し、npm が `packageManager` と完全一致すること**を要求します。たとえば Node.js 26.14.0 では `npm ci` が通っても `npm run check` は失敗します。開発時は `nvm use` で指定版へ揃え、採用バージョンを更新するときは関連設定をまとめて変更してください。

## 開発コマンド

```bash
npm run build         # src の実装だけを dist/ に出力（宣言・ソースマップ付き）
npm run typecheck     # 実装・テスト・Vitest 設定の型チェック
npm test              # 全テストを1回実行
npm run test:watch    # 変更を監視
npm test -- src/index.test.ts # 特定ファイルの実行
npm run test:coverage # text / coverage/index.html / lcov.info
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run check:runtime # .nvmrc / packageManager と実行環境の一致を確認
npm run check         # 実行環境・型・Lint・整形・テスト/カバレッジ・ビルド
npm audit             # 開発依存を含む監査
```

TypeScript は `npm run typecheck` または `npx tsc` で実行してください。コンテナには別バージョンのグローバル `tsc` も含まれるため、`tsc` の直接実行は避けます。

カバレッジの最低値は statements / branches / functions / lines 各90%です。Jest から移行しているため、`--runInBand` などの Jest 固有オプションは使いません。

Node.js でそのまま実行できる ESM を生成します。TypeScript の相対 import にも出力先の `.js` 拡張子を指定します（例: `import { add } from './index.js'`）。テストでは `vitest` から `test` / `expect` / `vi` 等を明示的に import します。

## VS Code から実行・デバッグ

コンテナに必須拡張として ESLint、Prettier、公式 **Vitest**（`vitest.explorer`）を導入します。補完にはワークスペースの TypeScript を使い、保存時の整形は Prettier、修正は ESLint に統一しています。VS Code 1.145.0 の公式設定定義に合わせ、非推奨の `typescript.tsdk` などから `js/ts.tsdk.path` / `js/ts.tsdk.promptToUseWorkspaceVersion` へ移行しています。自動 import は相対パスと `.js` 拡張子に揃え、ファイル移動時には import を自動更新します。

- **Testing** ビュー: テストの検出、単体実行、Debug Test、継続実行、カバレッジ付き実行を利用します。
- **Tasks: Run Task**: `npm: typecheck` / `npm: test` / `npm: check`。ビルドは既定の Build Task でも実行できます。
- テストファイルを開いて **Run and Debug → Debug current test (Vitest)**: 現在のテストをブレークポイント付きで実行します。
- **Debug compiled entry**: ビルド後の `dist/index.js` を起動し、ソースマップで `src/index.ts` に対応付けます。サンプルは関数の export のみなので出力はありません。開始位置で停止する設定です。

cSpell と markdownlint は任意の推奨拡張です。日本語言語パック、Live Share、Excel viewer、Git 履歴表示等は個人の必要に応じて導入してください。Git / npm scripts / import 補完 / Markdown プレビューは、まず VS Code の標準機能を使います。以前の Jest 拡張2種とその設定は撤去しました。

GUI のテスト検出・ブレークポイント停止等の確認手順と未検証項目は [検証状況](docs/toolchain.md#検証状況) に記載しています。

## 依存関係とセキュリティの保守

- `package.json` と `package-lock.json` は一緒に更新・コミットします。通常の導入は `npm ci`、意図した更新時だけ `npm install` を使います。
- Dependabot は npm / GitHub Actions / Dockerfile を週次確認します。Vitest と coverage provider、ESLint 関連をまとめて更新します。
- CI はホスト側のチェックに加え、Dev Container のビルド・非 root 実行・Node.js 本体/ヘッダー/npm の整合性も検証します。Dockerfile のイメージ更新で `.nvmrc` 等とバージョンがずれた場合は CI が失敗するため、関連設定を同じ PR で更新してください。
- Dependabot は Node.js イメージと `.nvmrc` を同時には更新しません。Node.js イメージ更新 PR では、必要に応じて `.nvmrc`・`packageManager`・関連設定を手動で揃え、CI が成功してからマージします。digest だけの更新など、実行バージョンが変わらなければ整合性チェックは通ります。
- Node.js イメージの更新時は `/usr/local/` のファイル構成・権限・シンボリックリンクの変更も確認します。配布物全体をコピーして本体・ヘッダー・npm を揃えていますが、将来追加されるファイルによる開発ツールへの影響を CI だけですべて検出できるとは限りません。
- 更新 PR では公式の互換性表を確認し、`npm ci && npm run check && npm audit` を実行します。Node.js の変更時は `.nvmrc`・`engines`・`@types/node`・コンテナ・README の整合性も確認します。
- npm の `overrides` は minimatch の脆弱性修正用です。上流が修正版へ対応したら削除して再検証します。詳細は [脆弱性対応](docs/toolchain.md#脆弱性対応) を参照してください。
- GitHub の Dependabot alerts / security updates はリポジトリ設定で有効化してください。設定ファイルの追加だけでは有効化を保証しません。

## ライセンス

[MIT](LICENSE)
