module.exports = function (api) {
	api.cache(true)

	return {
		presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
		plugins: [
			[
				'babel-plugin-root-import',
				{
					rootPathSuffix: 'app/',
					rootPathPrefix: '~/'
				}
			],
			[
				'module:react-native-dotenv',
				{
					envName: 'APP_ENV',
					moduleName: '@env',
					path: '.env',
					blocklist: null,
					allowlist: null,
					blacklist: null,
					whitelist: null,
					safe: false,
					allowUndefined: true,
					verbose: false
				}
			]
		]
	}
}
