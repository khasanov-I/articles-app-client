module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'xo',
		'plugin:react/recommended',
		'plugin:i18next/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [
				'.eslintrc.{js,cjs}',
			],
			parserOptions: {
				sourceType: 'script',
			},

		},
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
			rules: {
				indent: [2, 4],
				'@typescript-eslint/indent': [2, 4],
				'@typescript-eslint/naming-convention': 'warn',
				'react/react-in-jsx-scope': 'off',
				'i18next/no-literal-string': ['error', {markupOnly: true}],
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'i18next',
	],
	rules: {
	},
	globals: {
		__IS_DEV__: true,
	},
};
