# TypeScript Unit Test Practice (Jest版)

TypeScript のユニットテストを **初級10問 / 中級10問 / 上級10問** で練習できる教材です。

## 構成

- `src/beginner` : 初級のテスト対象コード 10問
- `src/middle` : 中級のテスト対象コード 10問
- `src/pro` : 上級のテスト対象コード 10問
- `templates/...` : 自分で書く用のテストテンプレート
- `answers/...` : 回答例のテストコード

## 使い方

```bash
npm install
npm test
```

回答例だけを実行する場合:

```bash
npm run test:answers
```

カバレッジを確認する場合:

```bash
npm run coverage
```

## 学習の進め方

1. `src/beginner` の問題コードを読む
2. `templates/beginner` に自分でテストを書く
3. `answers/beginner` で答え合わせする
4. 同じ流れで `middle` → `pro` に進む

## 想定技術

- TypeScript
- Jest
- ts-jest

## 補足

- テストコードは `@jest/globals` を使った書き方にしています。
- 非同期処理、例外、モック、状態を持つ関数なども段階的に練習できます。
# typescript-unit-test-practice-jest
