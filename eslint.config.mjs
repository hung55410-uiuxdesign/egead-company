import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "public/**", "scratch/**"],
  },
  ...nextConfig,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
