import pluginVue from "eslint-plugin-vue";
import js from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        localStorage: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "vue/require-default-prop": "off",
    },
  },
];
