<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Plugin_Name
 * @subpackage Plugin_Name/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Plugin_Name
 * @subpackage Plugin_Name/admin
 * @author     Your Name <email@example.com>
 */
class Plugin_Name_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	private $columns;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		$this->columns = array(
			'empty' => array(
				'icon'    => null,
				'title'   => null,
				'classes' => 'table-25',
			),
			'state' => array(
				'icon'    => null,
				'title'   => __( 'State', 'task-manager' ),
				'classes' => 'table-50',
			),
			'name' => array(
				'icon'    => null,
				'title'   => __( 'Name', 'task-manager' ),
				'classes' => 'table-300',
			),
			'id' => array(
				'icon'    => null,
				'title'   => __( 'ID', 'task-manager' ),
				'classes' => 'table-50',
			),
			'last_update' => array(
				'icon'    => null,
				'title'   => __( 'Last Update', 'task-manager' ),
				'classes' => 'table-100',
			),
			'time' => array(
				'icon'    => null,
				'title'   => __( 'Time', 'task-manager' ),
				'classes' => 'table-100',
			),
			'created_date' => array(
				'icon'    => null,
				'title'   => __( 'Created Date', 'task-manager' ),
				'classes' => 'table-150',
			),
			'ended_date' => array(
				'icon'    => null,
				'title'   => __( 'Ended Date', 'task-manager' ),
				'classes' => 'table-150',
			),
			'indicators'  => array(
				'icon'    => null,
				'title'   => __( 'Indicators', 'task-manager' ),
				'classes' => 'table-100',
			),
			'affiliated_with' => array(
				'icon'    => null,
				'title'   => __( 'Affiliated With', 'task-manager' ),
				'classes' => 'table-100',
			),
			'categories' => array(
				'icon'    => null,
				'title'   => __( 'Categories', 'task-manager' ),
				'classes' => 'table-150',
			),
			'attachments' => array(
				'icon'    => null,
				'title'   => __( 'Attachments', 'task-manager' ),
				'classes' => 'table-75',
			),
			'number_comments' => array(
				'icon'  => null,
				'title' => __( 'Number Comments', 'task-manager' ),
				'classes' => 'table-50',
			),
			'author' => array(
				'icon'    => null,
				'title'   => __( 'Author', 'task-manager' ),
				'classes' => 'table-100',
			),
			'associated_users' => array(
				'icon'    => null,
				'title'   => __( 'Associated Users', 'task-manager' ),
				'classes' => 'table-200',
			),
			'participants' => array(
				'icon'    => null,
				'title'   => __( 'Participants', 'task-manager' ),
				'classes' => 'table-200',
			),
			'waiting_for' => array(
				'icon'    => null,
				'title'   => __( 'Waiting For', 'task-manager' ),
				'classes' => 'table-200',
			)
		);
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Plugin_Name_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name . '-eoframework', plugin_dir_url( __FILE__ ) . 'css/plugin-name-eoframework.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/plugin-name-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Plugin_Name_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . '/js/output/js/admin.js', array(), rand(), false );

		wp_localize_script( $this->plugin_name, 'wpr_object', array(
				'api_nonce' => wp_create_nonce( 'wp_rest' ),
				'api_url'	  => rest_url(),
				'columns'   => $this->columns,
			)
		);

	}

	public function init() {
		$args = array(
      'public'       => true,
      'show_in_rest' => true,
      'label'        => 'Projects'
    );
    register_post_type( 'wpeo-task', $args );
	}

	public function admin_menu() {
		add_menu_page(
        __( 'Task Manager', 'textdomain' ),
        'Task Manager',
        'manage_options',
        'plugin-name/admin/partials/plugin-name-admin-display.php'
    );
	}

	public function create_api_posts_meta_field() {
		register_rest_field( 'wpeo-task', 'post-meta-fields', array(
				'get_callback' => array( $this, 'get_post_meta_for_api' ),
				'schema' => null,
			)
		);
	}

	public function get_post_meta_for_api( $object ) {
	 //get the id of the post object array
	 $post_id = $object['id'];

	 $meta = get_post_meta( $post_id );
 	 $meta['wpeo_task'] = json_decode( $meta['wpeo_task'][0] );

	 //return the post meta
	 return $meta;
	}

}
