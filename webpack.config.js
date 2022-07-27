const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );
const path = require( 'path' );
module.exports = ( env ) => {
	return [
		{
			mode: env.mode,
			resolve: {
				alias: {
					react: path.resolve( 'node_modules/react' ),
				},
			},
			devtool: 'source-map',
			entry: {
				themes: [ './css/themes.scss' ],
				'sce-cc-progress-bar': [ './css/sce-ccc-progress-bar.scss' ],
				admin: [ './css/admin.scss' ],
				avatars: [ './src/js/avatars.js' ],
				'avatars-frontend': [ './src/scss/avatars-frontend.scss' ],
				'avatars-admin': [ './src/js/react/views/avatars/index.js' ],
				'integrations-admin': [ './src/js/react/views/integrations/index.js' ],
			},
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', '@babel/preset-react' ],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-transform-arrow-functions',
							],
						},
					},
					{
						test: /\.scss$/,
						exclude: /(node_modules|bower_components)/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									url: false,
								},
							},
							'sass-loader',
						],
					},
				],
			},
			plugins: [ new FixStyleOnlyEntriesPlugin(), new MiniCssExtractPlugin() ],
		},
	];
};
