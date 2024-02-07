module.exports = function( grunt ) {
	grunt.initConfig( {
		compress: {
			main: {
				options: {
					archive: 'comment-edit-pro.zip',
				},
				files: [
					{ src: [ 'comment-edit-pro.php' ], dest: '/', filter: 'isFile' }, // includes files in path
					{ src: [ 'uninstall.php' ], dest: '/', filter: 'isFile' }, // includes files in path
					{ src: [ 'autoloader.php' ], dest: '/', filter: 'isFile' }, // includes files in path
					{ src: [ 'build/**' ], dest: '/' }, // includes files in path and its subdirs
					{ src: [ 'dist/**' ], dest: '/' }, // includes files in path and its subdirs
					{ src: [ 'includes/**' ], dest: '/' }, // includes files in path and its subdirs
					{ src: [ 'images/**' ], dest: '/' }, // includes files in path and its subdirs
					{ src: [ 'fancybox/**' ], dest: '/' }, // includes files in path and its subdirs
					{ src: [ 'js/**' ], dest: '/' }, // includes files in path and its subdirs
					{ src: [ 'languages/**' ], dest: '/' }, // includes files in path and its subdirs
					{ src: [ 'templates/**' ], dest: '/' }, // includes files in path and its subdirs
				],
			},
		},
	} );
	grunt.registerTask( 'default', [ 'compress' ] );

	grunt.loadNpmTasks( 'grunt-contrib-compress' );
};
