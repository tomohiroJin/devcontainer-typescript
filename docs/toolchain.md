# 開発環境の選定と検証

Issue [#8](https://github.com/tomohiroJin/devcontainer-typescript/issues/8) の対応。調査日: 2026-11-05。

## 採用判断

| 対象       | 判断と理由                                                                                                                                                                                                                                                                                                                                                                   | 公式資料                                                                                                                                                                                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Node.js    | 26.13.0 を採用。26 系は2026-10-28から Active LTS。24 系は Maintenance LTS に移行済み。`.nvmrc` はパッチまで固定し、実行を26系に限定                                                                                                                                                                                                                                          | [Release schedule](https://github.com/nodejs/Release#release-schedule)、[公式配布](https://nodejs.org/dist/v26.13.0/)                                                                                                                                                    |
| npm        | Node.js 26.13.0 同梱の11.20.0に統一。別のパッケージマネージャーを増やさず、ロックファイルと `npm ci` で再現性を確保。npm 12 への単独移行は行わない                                                                                                                                                                                                                           | [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci)、[Node 配布メタデータ](https://nodejs.org/dist/index.json)                                                                                                                                                      |
| TypeScript | 6.0.3を採用。調査時の latest は7.0.2だが、typescript-eslint 8.72.1 の peer dependency は `>=4.8.4 <6.1.0`。対応範囲内の安定版を優先                                                                                                                                                                                                                                          | [対応バージョン](https://typescript-eslint.io/users/dependency-versions/)、[公開メタデータ](https://registry.npmjs.org/typescript-eslint/8.72.1)                                                                                                                         |
| モジュール | ESM / NodeNext、ES2024、strict を採用。Node.js で直接実行できる `.js` import と package の `type: module` を揃え、テストをビルド出力から除外                                                                                                                                                                                                                                 | [TS modules reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html)、[Node ESM](https://nodejs.org/api/esm.html)                                                                                                                                 |
| テスト     | Vitest 5.1.0と同版のV8 coverage provider。Jest互換のアサーション、ESM/TypeScript変換、公式VS Code連携を使い、ts-jest を不要にする。型チェックは `tsc` で別途実行                                                                                                                                                                                                             | [Vitest](https://vitest.dev/guide/)、[Jest からの移行](https://vitest.dev/guide/migration.html)、[coverage](https://vitest.dev/guide/coverage.html)                                                                                                                      |
| 解析・整形 | ESLint 10.14.0 + typescript-eslint 8.72.1 + Prettier 3.9.10。flat config と `eslint/config` の `defineConfig` を利用。学習用サンプルの明示的な型注釈等を維持するため基本の recommended を採用し、型情報を使う追加ルールは一括導入しない                                                                                                                                      | [ESLint config](https://eslint.org/docs/latest/use/configure/configuration-files)、[typescript-eslint](https://typescript-eslint.io/getting-started/)、[Prettier integration](https://prettier.io/docs/integrating-with-linters)                                         |
| VS Code    | 最新安定版を対象に必須3拡張へ整理。公式 `vitest.explorer` に統一し、重複するJest拡張・旧Jest設定を除去。ESLint 10では無効な `eslint.useFlatConfig` を撤去                                                                                                                                                                                                                    | [公式Vitest拡張](https://github.com/vitest-dev/vscode)、[ESLint拡張の設定](https://github.com/microsoft/vscode-eslint)、[workspace TS](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions)                              |
| コンテナ   | 公式 `typescript-node:5.2.5-26-trixie` と `node:26.13.0-trixie-slim` をdigest固定したmulti-stage Dockerfile。開発用イメージが26.12.1のため、公式Nodeイメージの `/usr/local/` 全体（本体・ヘッダー・npm・ドキュメント）を取り込み26.13.0へ揃える。npmは公式Nodeイメージと同じ11.20.0。Debian 13、非rootのnodeユーザー。イメージ内のグローバルTypeScriptよりローカル依存を優先 | [公式イメージ定義](https://github.com/devcontainers/images/tree/main/src/typescript-node)、[ライフサイクル](https://containers.dev/implementors/json_reference/#lifecycle-scripts)                                                                                       |
| CI・更新   | 公式Actionsの安定版をコミットSHA固定、最小権限。Dependabotでnpm/Actions/Dockerfileを継続更新。ロックファイルと同じコマンドを全環境で使う                                                                                                                                                                                                                                     | [Actions security](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)、[Dependabot options](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference) |

新しいテスト・Lint・パッケージマネージャーが常に唯一の標準という前提にはせず、このサンプルの用途・既存テスト・公式のサポート範囲で選定しています。Biomeへの移行は既存のESLint/Prettier連携を置き換える必要性がないため見送りました。

## VS Code 設定の責務

`.vscode/settings.json` はローカル・コンテナ共通、`.devcontainer/devcontainer.json` はイメージと必須拡張の導入を管理します。拡張の推奨は `.vscode/extensions.json`、コマンドとデバッグは `tasks.json` / `launch.json` に分けます。VS Code自体の更新は利用者のインストール管理に従います。

必須: ESLint (`dbaeumer.vscode-eslint`)、Prettier (`esbenp.prettier-vscode`)、Vitest (`vitest.explorer`)。任意: cSpell、markdownlint、言語パック等。従来の `idered.npm`、`leizongmin.node-module-intellisense`、Git/Markdown拡張の一括導入をやめ、標準機能と必要な追加拡張だけに整理しました。個別の拡張が提供終了したと断定するものではありません。

## VS Code 安定版の設定更新

2026-11-05の[公式安定版配布API](https://update.code.visualstudio.com/api/update/linux-x64/stable/latest)で **1.145.0**（コミット `a717861c07586a53d83b80d742cd3f59b20a6273`）を確認しました。開発ブランチではなく、[同コミットの組み込みTypeScript拡張の設定定義](https://github.com/microsoft/vscode/blob/a717861c07586a53d83b80d742cd3f59b20a6273/extensions/typescript-language-features/package.json)に照合しています。

| 項目                       | 現行設定                                                                                    | 方針                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| TypeScript SDK             | `js/ts.tsdk.path`                                                                           | `node_modules/typescript/lib` を使う。旧 `typescript.tsdk` は非推奨のため撤去 |
| ワークスペース版選択の案内 | `js/ts.tsdk.promptToUseWorkspaceVersion`                                                    | true。旧 `typescript.enablePromptUseWorkspaceTsdk` を置換                     |
| 自動import                 | `js/ts.preferences.importModuleSpecifier` / `js/ts.preferences.importModuleSpecifierEnding` | relative / js。NodeNextのビルド出力と整合させる                               |
| ファイル移動               | `js/ts.updateImportsOnFileMove.enabled`                                                     | always。移動時に参照元のimportを更新                                          |

SDKパスの設定だけでは、すでに開いているエディターの使用バージョンが切り替わることを保証しません。コマンドパレットでワークスペース版を選択してください。

設定キー・値の型・列挙値と非推奨指定の有無を1.145.0の公式定義と照合しました。さらにワークスペースのTypeScript Language Serviceを実行し、`add` の自動importが `./index.js` になること、ファイル名変更で `./renamed-index.js` へ参照を更新できること、変更後のコードに型エラーがないことを確認しました。これは言語サービスと設定定義の検証であり、VS Code GUI上の操作確認とは区別しています。

同安定版の `js/ts.experimental.useTsgo` は **experimental・既定false** です。ネイティブ言語サービスの実験設定を必須構成には追加せず、互換性を確認済みのワークスペース版TypeScriptを利用します。TypeScript 7へのコンパイラー更新と、VS Codeで使う言語サービス・ESLintパーサーの対応状況は分けて評価します。新しい拡張を追加するだけで「デファクト」とは扱いません。

## 脆弱性対応

初期監査では26パッケージ（moderate 22 / low 4）が影響対象でした。独立したアドバイザリは以下の3件です。

- [deepmerge: GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4)
- [glob: GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4)
- [minimatch: GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)

Jest / ts-jest の撤去で deepmerge / glob の依存経路を除去しました。ESLint / typescript-eslint の更新だけでは minimatch 10 系が残るため、minimatch 11.0.4への一時overrideを、直接の利用元である `eslint`・`@eslint/config-array`・`@typescript-eslint/typescript-estree` の3パッケージに限定しています。他の依存のminimatch 3/5系などには適用しません。上流の10系指定からメジャーを跨ぐため、[公式変更履歴](https://github.com/isaacs/minimatch/blob/main/changelog.md) と利用箇所を調査しました。主な破壊的変更は `makeRe` / `AST` 等の撤去です。現在の依存経路では `Minimatch` / `minimatch` によるパスマッチングを使用し、Lint・テスト・型チェック・ビルドで利用経路を検証します。すべての上流ユースケースの互換性を保証するものではありません。

上流が11.0.1以降へ対応した時点で override を削除し、クリーンインストールと監査を再実施します。監査の `--force` によるJest 25等へのダウングレードや、監査・TLS検証の無効化は行いません。

## 更新時の実行環境チェック

`npm run check` は最初に `.nvmrc` と実行中のNode.js、`packageManager` とnpmのバージョンを照合します。Dev Container CIは実際のDockerfileをビルド・起動し、非rootユーザーで全チェックと監査を実行します。さらに `npm run check:runtime -- --headers` で `/usr/local/include/node/node_version.h` も照合します。DockerfileのFROMだけが更新されて関連設定が取り残された場合、CIが失敗して検出します。

Dependabotについては、調査時の[公式npmロック更新実装](https://github.com/dependabot/dependabot-core/blob/450bd7af4ce0d9b201c736389653b6cf09be40eb/npm_and_yarn/lib/dependabot/npm_and_yarn/file_updater/npm_lockfile_updater.rb#L400-L438)が `npm install --force --ignore-scripts --package-lock-only` を使用し、engine制約を回避することを確認しました。ただし再現検証では、npm 11.9.0の `--force` がNode.jsの制約を回避しても、ルートパッケージの `engines.npm` 制約では `EBADENGINE` になりました。`engines.npm` は削除し、npmの厳密なバージョン確認を `packageManager` と `npm run check:runtime` に集約しました。Node.js向けの `engines.node` と `engine-strict=true` は維持します。管理サービスそのものの実行を再現したものではないので、マージ後は実際のDependabot更新ログでも確認してください。

## 検証状況

2026-11-05、Linux x64、Node.js 26.13.0 / npm 11.20.0 で確認。

| 検証                          | 結果                                                                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ロックファイルからの `npm ci` | 成功                                                                                                                                                                      |
| `npm run check`               | 型・Lint・整形・カバレッジ・ビルド成功                                                                                                                                    |
| テスト                        | 18ファイル・82テスト成功。既存のテストとアサーションを維持。ESLint 10が検出した未使用の初期代入には、サンプルの初期値を確認するアサーションを追加                         |
| カバレッジ                    | statements 97.50% / branches 100% / functions 96.10% / lines 97.41%。全項目90%の閾値を通過                                                                                |
| 監査                          | `npm audit` で0件（開発依存を含む）                                                                                                                                       |
| ESM 出力                      | `dist/index.js` をNode.jsでimportし、addの結果を検証。ビルド出力にテストが含まれないことも確認                                                                            |
| VS Code起動用コマンド         | launch設定と同じVitest CLIオプションで単一ファイル実行に成功                                                                                                              |
| Dev Container                 | @devcontainers/cli 0.90.0で依存関係なしの新規コピーからビルド・起動・updateContentCommandを実行。UID 1000のnodeユーザーで同じ `npm run check`・監査・ESM実行に成功        |
| CI構文                        | チェックサム検証済みactionlint 1.7.12で成功                                                                                                                               |
| リモートCI実行                | [PR #9の初回check](https://github.com/tomohiroJin/devcontainer-typescript/actions/runs/42018582338)は成功。レビュー対応で追加したdevcontainerジョブも同PRのチェックに表示 |
| VS Code GUI                   | 未検証。拡張の実際のインストール・テスト検出・保存時処理・カバレッジ表示・ブレークポイント停止は以下の手順で確認が必要                                                    |

### 手動確認手順

1. 最新安定版 VS Code で **Dev Containers: Rebuild and Reopen in Container** を実行し、依存導入完了を確認する。
2. ワークスペースのTypeScriptを選択し、補完と意図的な型エラー表示を確認して変更を戻す。
3. 未整形のコード・Lint修正可能な記述を一時的に作り、保存時の結果がCLIの結果と一致することを確認して変更を戻す。
4. Testingビューで18ファイル・82テストを検出し、単一テスト・全テスト・継続実行・カバレッジを確認する。
5. テストのブレークポイントで Debug Test / Debug current test を実行し、停止と再開を確認する。
6. Debug compiled entry を実行し、開始位置で停止して `src/index.ts` に対応付くことを確認する。
