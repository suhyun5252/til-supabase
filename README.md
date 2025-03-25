# 프로젝트 생성

```bash
npx create-next-app@latest .
```

# Git 셋팅

```bash
git init
git remote add origin 주소
git remote -v
```

# prettier 셋팅

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

- `/.prettierrc 파일 생성`

```
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

# eslint 설정

```bash
npm install --save-dev eslint-plugin-prettier eslint-config-prettier
```

- eslint.config.mjs 에 `rule 설정`

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Prettier 플러그인 추가
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      prettier: eslintPluginPrettier, //  Prettier 플러그인 추가
    },
    rules: {
      ...eslintConfigPrettier.rules, //  Prettier와 충돌하는 ESLint 규칙 비활성화
      "prettier/prettier": ["warn", { endOfLine: "auto" }], //  Prettier 스타일을 강제 적용 (오류 발생 시 ESLint에서 표시)
      "@typescript-eslint/no-unused-vars": "warn", //  기존 TypeScript 규칙 유지
      "@typescript-eslint/no-explicit-any": "off", //  any 타입 사용 허용
    },
  },
];

export default eslintConfig;
```

# VSCode 자동 포맷 설정 관리

- `/.vscode 폴더 생성`
- `/.vscode/settings.json 파일 생성`

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

# tsconfig.json 설정

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
