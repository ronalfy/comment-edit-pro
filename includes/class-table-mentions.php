<?php
/**
 * Create table for CommentEditPro.
 *
 * @package CommentEditPro
 */

namespace CommentEditPro\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Class for creating the mentions table.
 */
class Table_Mentions {

	/**
	 * Create Mentions table
	 *
	 * @since 1.0.0
	 * @access public
	 * @return void
	 */
	public static function create_table() {
		global $wpdb;
		$tablename = $wpdb->base_prefix . 'sce_mentions';

		$version = get_site_option( 'sce_mentions_version', '0' );
		if ( version_compare( $version, COMMENTEDITPRO_MENTIONS_TABLE_VERSION ) < 0 ) {
			$charset_collate = '';
			if ( ! empty( $wpdb->charset ) ) {
				$charset_collate = "DEFAULT CHARACTER SET $wpdb->charset";
			}
			if ( ! empty( $wpdb->collate ) ) {
				$charset_collate .= " COLLATE $wpdb->collate";
			}

			$sql = "CREATE TABLE {$tablename} (
							id BIGINT(20) NOT NULL AUTO_INCREMENT,
							email TEXT NOT NULL DEFAULT '',
							hash TEXT NOT NULL DEFAULT '',
							is_subscribed ENUM('true','false') NOT NULL DEFAULT 'false',
							date_added DATETIME NOT NULL,
							PRIMARY KEY  (id) 
							) {$charset_collate};";
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta( $sql );

			update_site_option( 'sce_mentions_version', COMMENTEDITPRO_MENTIONS_TABLE_VERSION );
		}
	}

	/**
	 * Drop comments table
	 *
	 * @since 1.0.0
	 * @access public
	 * @return void
	 */
	public static function drop() {
		global $wpdb;
		$tablename = $wpdb->base_prefix . 'sce_mentions';
		$sql       = "drop table if exists $tablename";
		$wpdb->query( $sql ); // phpcs:ignore
		delete_site_option( 'sce_mentions_version' );
	}
}
