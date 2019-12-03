module.exports = {
    parser: "@typescript-eslint/parser", // use typescript parser
    extends: ["plugin:@typescript-eslint/recommended", "react-app", "plugin:prettier/recommended"], // extends some rules
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    rules: {
        "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
        "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
    }
};
