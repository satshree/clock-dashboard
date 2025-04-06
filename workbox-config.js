module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,html,ttf,svg,ico,png,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};