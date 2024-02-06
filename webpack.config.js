const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );
const path = require( 'path' );
module.exports = ( env ) => {
	return [
		{
			...defaultConfig,
			module: {
				...defaultConfig.module,
				rules: [ ...defaultConfig.module.rules ],
			},
			mode: env.mode,
			devtool: 'production' === env.mode ? false : 'source-map',
			entry: {
				'avatars-admin': [ './src/js/react/views/avatars/index.js' ],
				'integrations-admin': [ './src/js/react/views/integrations/index.js' ],
				'mentions-admin': [ './src/js/react/views/mentions/index.js' ],
				'sce-license': [ './src/js/react/views/license/index.js' ],
				'sce-comment-editing': [ './src/js/react/views/comment-editing/index.js' ],
				'sce-comment-form': [ './src/js/react/views/comment-form/index.js' ],
				'sce-spam-protection': [ './src/js/react/views/spam-protection/index.js' ],
				'sce-webhooks-admin': [ './src/js/react/views/webhooks/index.js' ],
				'sce-advanced': [ './src/js/react/views/Advanced/index.js' ],
				'sce-tools-comment-activity': [ './src/js/react/views/tools/CommentActivity/index.js' ],
				'sce-tools-post-type-comment-settings': [ './src/js/react/views/tools/PostTypeCommentSettings/index.js' ],
				'sce-comment-shortcuts-settings': [ './src/js/react/views/tools/CommentShortcuts/index.js' ],
			}
		},
		{
			mode: env.mode,
			resolve: {
				alias: {
					react: path.resolve( 'node_modules/react' ),
					'react-dom': path.resolve( 'node_modules/react-dom' ),
				},
			},
			devtool: 'production' === env.mode ? false : 'source-map',
			output: {
				filename: '[name].js',
				chunkFilename: '[name].chunk.bundle.js',
				sourceMapFilename: '[file].map[query]',
				assetModuleFilename: 'fonts/[name][ext]',
				clean: true,
			},
			entry: {
				themes: [ './css/themes.scss' ],
				'sce-ccc-progress-bar': [ './css/sce-ccc-progress-bar.scss' ],
				admin: [ './css/admin.scss' ],
				avatars: [ './src/js/avatars.js' ],
				'delete-post-comments-init': [ './src/js/delete-post-comments-init.js' ],
				'delete-post-comments-view': [ './src/js/react/views/post-delete-comments/index.js' ],
				'avatars-frontend': [ './src/scss/avatars-frontend.scss' ],
				'mentions-frontend': [ './src/js/mentions/index.js' ],
				'sce-frontend': [ './src/scss/frontend.scss' ],
				'sce-frontend-editing': [ './src/scss/frontend-editing.scss' ],
				'sce-mentions-theme-white': [ './src/scss/sce-mentions-theme-white.scss' ],
				'sce-cloudflare-turnstile': [ './src/js/turnstile/index.js' ],
				'sce-webhooks-admin-css': [ './src/scss/webhooks-admin.scss' ],
				'sce-fancybox-css': [ './node_modules/@fancyapps/ui/dist/fancybox/fancybox.css' ],
				'sce-comment-activity-sidebar': [ './src/js/block-editor/activity-sidebar/index.js' ],
				'sce-selector-helper': [ './src/js/selector-helper.js' ],
				'sce-selector-helper-css': [ './src/scss/selector-helper.scss' ],
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
							{
								loader: 'resolve-url-loader',
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
								},
							},
						],
					},
					{
						test: /\.css$/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
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
