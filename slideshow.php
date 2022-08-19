<?php

/**
 * Plugin Name:       Meisa slideshow
 * Description:       Create a slideshow
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       slideshow
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_slideshow_block_init()
{
	$plugin_url = plugin_dir_url(__FILE__);
	register_block_type(__DIR__ . '/build');
	wp_register_script('eisa-slideshow', $plugin_url . '/assets/js/eisa-slideshow.js', array(), '1.0', true);
	wp_enqueue_script('eisa-slideshow');
}
add_action('init', 'create_block_slideshow_block_init');
