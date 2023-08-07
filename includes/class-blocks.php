<?php
/**
 * Helper fuctions for blocks.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Blocks
 */
class Blocks {

	/**
	 * Class runner.
	 */
	public function run() {

		// Add block editor assets.
		add_action( 'enqueue_block_editor_assets', array( $this, 'add_block_editor_assets' ) );

		// Register blocks.
		add_action( 'init', array( $this, 'register_blocks' ) );

		// Register block category.
		add_filter( 'block_categories_all', array( $this, 'register_block_category' ), 10, 2 );
	}

	/**
	 * Register block category.
	 *
	 * @param array                   $categories Block categories.
	 * @param WP_Block_Editor_Context $block_editor_context The current block editor context.
	 *
	 * @return array Block categories.
	 */
	public function register_block_category( $categories, $block_editor_context ) {
		// Add block category.
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'comment-edit-pro',
					'title' => __( 'Comment Edit Pro', 'comment-edit-pro' ),
				),
			)
		);
	}

	/**
	 * Register blocks.
	 */
	public function register_blocks() {
		// Register featured comments block.
		register_block_type(
			Functions::get_plugin_dir( 'build/js/blocks/featured-comments/block.json' ),
			array(
				'render_callback' => array( $this, 'render_featured_comments_block' ),
			)
		);
	}

	/**
	 * Render featured comments block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $inner_blocks Inner blocks content.
	 * @param array  $context Context.
	 *
	 * @return string block content on the frontend.
	 */
	public function render_featured_comments_block( $attributes, $inner_blocks, $context ) {
		/**
		 * Allow featured comments block to be output in /includes/class-featured-comments.php.
		 */
		return apply_filters( 'cep_block_featured_comments_output', '', $attributes, $inner_blocks, $context );
	}

	/**
	 * Add block editor assets.
	 */
	public function add_block_editor_assets() {

		// Add block editor styles.
		wp_register_style(
			'cep-blocks-css',
			Functions::get_plugin_url( 'build/index.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);

		// Add block editor scripts.
		wp_register_script(
			'cep-blocks-js',
			Functions::get_plugin_url( 'build/index.js' ),
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-data' ),
			Functions::get_plugin_version(),
			true
		);

		$cep_block_localized = array(
			'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
			'restNonce' => wp_create_nonce( 'wp_rest' ),
			'restUrl'   => rest_url( 'dlxplugins/comment-edit-pro/v1' ),
		);

		/**
		 * Allow third-parties to add localized data to the block editor.
		 *
		 * @param array $cep_block_localized Localized data.
		 */
		$cep_block_localized = (array) apply_filters( 'cep_block_localized_vars', $cep_block_localized );

		// Add block editor data.
		wp_localize_script(
			'cep-blocks-js',
			'cepBlocksJS',
			$cep_block_localized
		);
	}
}
