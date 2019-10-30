<?php

use Bluehost\UpgradeHandler;
use Endurance_WP_Plugin_Updater\Updater;

// Define constants
define( 'MM_BASE_DIR', plugin_dir_path( __FILE__ ) );
define( 'MM_BASE_URL', plugin_dir_url( __FILE__ ) );
define( 'MM_ASSETS_URL', 'https://www.mojomarketplace.com/mojo-plugin-assets/' );

// Composer autoloader
require __DIR__ . '/vendor/autoload.php';

// Handle any upgrade routines
if ( is_admin() ) {

	// Handle plugin updates
	new Updater( 'bluehost', 'bluehost-wordpress-plugin', 'bluehost-wordpress-plugin/bluehost-wordpress-plugin.php' );

	// Handle plugin upgrades
	$upgrade_handler = new UpgradeHandler(
		__DIR__ . '/upgrades',
		get_option( 'bluehost_plugin_version', BLUEHOST_PLUGIN_VERSION ),
		BLUEHOST_PLUGIN_VERSION
	);

	$did_upgrade = $upgrade_handler->maybe_upgrade();
	if ( $did_upgrade ) {
		update_option( 'bluehost_plugin_version', BLUEHOST_PLUGIN_VERSION, true );
	}
}

// Require files
require __DIR__ . '/inc/class-access-token.php';
require __DIR__ . '/inc/class-response-utilities.php';
require __DIR__ . '/inc/class-site-meta.php';
require __DIR__ . '/inc/admin.php';
require __DIR__ . '/inc/base.php';
require __DIR__ . '/inc/checkout.php';
require __DIR__ . '/inc/menu.php';
require __DIR__ . '/inc/shortcode-generator.php';
require __DIR__ . '/inc/mojo-themes.php';
require __DIR__ . '/inc/styles.php';
require __DIR__ . '/inc/plugin-search.php';
require __DIR__ . '/inc/jetpack.php';
require __DIR__ . '/inc/user-experience-tracking.php';
require __DIR__ . '/inc/updates.php';
require __DIR__ . '/inc/coming-soon.php';
require __DIR__ . '/inc/track-last-login.php';
require __DIR__ . '/inc/performance.php';
require __DIR__ . '/inc/partners.php';
require __DIR__ . '/inc/rest-api/rest-api.php';

// Check proper PHP and bring CLI loader online
if ( version_compare( PHP_VERSION, '5.3.29' ) >= 0 ) {
	require __DIR__ . '/inc/cli-init.php';
}

mm_require( __DIR__ . '/inc/admin-page-notifications-blocker.php' );

if ( is_admin() ) {
	// Keep the Bluehost API access token fresh.
	add_action( 'shutdown', array( 'Bluehost_Access_Token', 'maybe_refresh_token' ) );
}