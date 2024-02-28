const path = require("path");

module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"airbnb",
		"airbnb/hooks",
		"plugin:import/typescript",
		"plugin:react/jsx-runtime",
		"plugin:prettier/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module",
		useJSXTextNode: true,
		project: [path.resolve(__dirname, "tsconfig.eslint.json")],
		ecmaVersion: 12,
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: [
		"@typescript-eslint",
		"prefer-arrow",
		"react",
		"react-hooks",
		"prettier",
		"import",
	],
	root: true,
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		//prettier for correct build
		"prettier/prettier": [
			"warn",
			{
				endOfLine: "auto",
			},
		],
		"prefer-const": "warn",
		"no-new": ["off", { requireReturn: false }],

		//base ESLint
		"no-restricted-exports": 0,
		"import/order": "off",
		"no-plusplus": 0,
		"no-param-reassign": "off",
		"padding-line-between-statements": "off",
		"lines-between-class-members": [
			"error",
			"always",
			{
				exceptAfterSingleLine: true,
			},
		],
		"no-void": [
			"warn",
			{
				allowAsStatement: true,
			},
		],
		"arrow-body-style": "off",
		"@typescript-eslint/no-var-requires": "off",
		//import
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never",
			},
		],
		//@typescript-eslint
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				vars: "all",
				args: "after-used",
				ignoreRestSiblings: true,
				caughtErrors: "none",
				argsIgnorePattern: "^(_|doc$|req$|res$|next$|props$|params$|opts$|e$)",
			},
		],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				vars: "all",
				args: "after-used",
				argsIgnorePattern: "_",
				ignoreRestSiblings: false,
				varsIgnorePattern: "_",
			},
		],
		//react
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"react/jsx-props-no-spreading": "off",
		"react/jsx-filename-extension": [
			"error",
			{
				extensions: [".jsx", "tsx"],
			},
		],
		"react/function-component-definition": [
			"error",
			{
				namedComponents: [
					"function-declaration",
					"function-expression",
					"arrow-function",
				],
				unnamedComponents: "function-expression",
			},
		],
		"react/prop-types": "off",
		"react/require-default-props": "off",
		"react/button-has-type": "off",
		//react-hooks
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"jsx-a11y/click-events-have-key-events": "off",
		"jsx-a11y/no-static-element-interactions": "off",
	},
	overrides: [
		{
			files: ["*.tsx"],
			rules: {
				"react/prop-types": "off",
			},
		},
	],
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
			},
			/* node: {
        paths: ["./"],
      }, */
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
};
