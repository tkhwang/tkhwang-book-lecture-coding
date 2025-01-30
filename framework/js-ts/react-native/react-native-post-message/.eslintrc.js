// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier", "plugin:import/recommended", "plugin:import/typescript"],
  ignorePatterns: ["/dist/*"],
  plugins: ["prettier", "import"],
  rules: {
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // Node.js 내장 모듈
          "external", // npm 패키지
          "internal", // 프로젝트 내부 모듈
          ["parent", "sibling"], // 상위 및 형제 디렉토리
          "index", // 현재 디렉토리
          "type", // 타입 임포트
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/no-duplicates": "error",
    "import/no-unresolved": "error",
    "import/no-cycle": "error",
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
};
