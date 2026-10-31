# Comment Edit Pro - Filters and Actions Documentation

## Table of Contents

- [Button & Timer Filters](#button--timer-filters)
- [Webhook Filters](#webhook-filters)
- [Output Filters](#output-filters)
- [Mentions Filters](#mentions-filters)
- [Integration Filters](#integration-filters)
- [Avatar Filters](#avatar-filters)
- [Help Tab Actions](#help-tab-actions)
- [Mentions Subscribe Actions](#mentions-subscribe-actions)
- [Mentions Unsubscribe Actions](#mentions-unsubscribe-actions)

---

## Button & Timer Filters

### `sce_button_extra_stop_timer`

Filter the SVG content for the stop timer button.

**Parameters:**
- `string $stop_timer_svg` - The SVG content for the stop timer button. Default: empty string.

**Return:** `string` - The filtered SVG content.

**Example:**
```php
add_filter( 'sce_button_extra_stop_timer', function( $svg ) {
    return '<svg>...</svg>';
} );
```

---

## Webhook Filters

### `sce_webhook_post_type_args`

Filter the post type arguments used when registering the webhook post type.

**Parameters:**
- `array $post_type_args` - Post type arguments prior to registering the post type.

**Return:** `array` - The filtered post type arguments.

**Since:** 3.0.0

**Example:**
```php
add_filter( 'sce_webhook_post_type_args', function( $args ) {
    $args['public'] = true;
    return $args;
} );
```

---

## Output Filters

### `sce_can_view_pending_comments`

Filter to allow moderators to view pending comments.

**Parameters:**
- `bool $can_view_pending_comments` - Whether to allow moderators to view pending comments. Default: `true`.
- `WP_Comment_Query $query` - The comment query object.

**Return:** `bool` - Whether moderators can view pending comments.

**Example:**
```php
add_filter( 'sce_can_view_pending_comments', function( $can_view, $query ) {
    // Only allow viewing pending comments for administrators
    return current_user_can( 'manage_options' );
}, 10, 2 );
```

---

## Mentions Filters

### `sce_mentions_subscribe_body_text`

Filter the body text of the subscription success screen.

**Parameters:**
- `string $body` - The body of the subscription success screen.
- `string $unsubscribe_url` - The unsubscribe URL.

**Return:** `string` - The filtered body text.

**Example:**
```php
add_filter( 'sce_mentions_subscribe_body_text', function( $body, $unsubscribe_url ) {
    return '<p>Custom subscription message</p>';
}, 10, 2 );
```

### `sce_mentions_subscribe_template`

Filter the template file path used for the subscription page.

**Parameters:**
- `string $template` - The template file path.

**Return:** `string` - The filtered template file path.

**Example:**
```php
add_filter( 'sce_mentions_subscribe_template', function( $template ) {
    return get_stylesheet_directory() . '/templates/custom-subscribe.php';
} );
```

### `sce_mentions_unsubscribe_body_text`

Filter the body text of the unsubscribe success screen.

**Parameters:**
- `string $body` - The body of the unsubscribe success screen.

**Return:** `string` - The filtered body text.

**Example:**
```php
add_filter( 'sce_mentions_unsubscribe_body_text', function( $body ) {
    return '<p>Custom unsubscribe message</p>';
} );
```

### `sce_mentions_unsubscribe_template`

Filter the template file path used for the unsubscribe page.

**Parameters:**
- `string $template` - The template file path.

**Return:** `string` - The filtered template file path.

**Example:**
```php
add_filter( 'sce_mentions_unsubscribe_template', function( $template ) {
    return get_stylesheet_directory() . '/templates/custom-unsubscribe.php';
} );
```

### `sce_mentions_subscribe_scripts_header`

Filter the script handles to print in the header on the subscribe page.

**Parameters:**
- `array $script_header_handles` - Array of script handles to output. Default: empty array.
- `string $sce_mentions_theme_name` - The theme name.

**Return:** `array` - Array of script handles.

**Since:** 1.0.0

**Example:**
```php
add_filter( 'sce_mentions_subscribe_scripts_header', function( $handles, $theme_name ) {
    $handles[] = 'my-custom-script';
    return $handles;
}, 10, 2 );
```

### `sce_mentions_subscribe_styles_header`

Filter the style handles to print in the header on the subscribe page.

**Parameters:**
- `array $style_header_handles` - Array of style handles to output. Default: empty array.
- `string $sce_mentions_theme_name` - The theme name.

**Return:** `array` - Array of style handles.

**Since:** 1.0.0

**Example:**
```php
add_filter( 'sce_mentions_subscribe_styles_header', function( $handles, $theme_name ) {
    $handles[] = 'my-custom-style';
    return $handles;
}, 10, 2 );
```

### `sce_mentions_subscribe_scripts_footer`

Filter the script handles to print in the footer on the subscribe page.

**Parameters:**
- `array $script_footer_handles` - Array of script handles to output. Default: empty array.
- `string $eff_theme_name` - The theme name.

**Return:** `array` - Array of script handles.

**Since:** 1.0.0

**Example:**
```php
add_filter( 'sce_mentions_subscribe_scripts_footer', function( $handles, $theme_name ) {
    $handles[] = 'my-custom-footer-script';
    return $handles;
}, 10, 2 );
```

### `sce_mentions_unsubscribe_scripts_header`

Filter the script handles to print in the header on the unsubscribe page.

**Parameters:**
- `array $script_header_handles` - Array of script handles to output. Default: empty array.
- `string $sce_mentions_theme_name` - The theme name.

**Return:** `array` - Array of script handles.

**Since:** 1.0.0

**Example:**
```php
add_filter( 'sce_mentions_unsubscribe_scripts_header', function( $handles, $theme_name ) {
    $handles[] = 'my-custom-script';
    return $handles;
}, 10, 2 );
```

### `sce_mentions_unsubscribe_styles_header`

Filter the style handles to print in the header on the unsubscribe page.

**Parameters:**
- `array $style_header_handles` - Array of style handles to output. Default: empty array.
- `string $sce_mentions_theme_name` - The theme name.

**Return:** `array` - Array of style handles.

**Since:** 1.0.0

**Example:**
```php
add_filter( 'sce_mentions_unsubscribe_styles_header', function( $handles, $theme_name ) {
    $handles[] = 'my-custom-style';
    return $handles;
}, 10, 2 );
```

### `sce_mentions_unsubscribe_scripts_footer`

Filter the script handles to print in the footer on the unsubscribe page.

**Parameters:**
- `array $script_footer_handles` - Array of script handles to output. Default: empty array.
- `string $eff_theme_name` - The theme name.

**Return:** `array` - Array of script handles.

**Since:** 1.0.0

**Example:**
```php
add_filter( 'sce_mentions_unsubscribe_scripts_footer', function( $handles, $theme_name ) {
    $handles[] = 'my-custom-footer-script';
    return $handles;
}, 10, 2 );
```

---

## Integration Filters

### `sce_integrations_localized_vars`

Filter the localized variables for the integrations admin script. Other integrations can add their own variables here.

**Parameters:**
- `array $localized_vars` - The localized variables array.

**Return:** `array` - The filtered localized variables.

**Since:** 3.0.0

**Example:**
```php
add_filter( 'sce_integrations_localized_vars', function( $vars ) {
    $vars['myCustomVar'] = 'value';
    return $vars;
} );
```

---

## Avatar Filters

### `sce_avatar_size`

Filter the avatar size (used for both width and height).

**Parameters:**
- `int $size` - The avatar size in pixels.

**Return:** `int` - The filtered avatar size.

**Example:**
```php
add_filter( 'sce_avatar_size', function( $size ) {
    return 100; // Set avatar size to 100px
} );
```

### `sce_avatar_classes`

Filter the CSS classes applied to the avatar image.

**Parameters:**
- `array $classes` - Array of CSS classes for the avatar output.

**Return:** `array` - The filtered array of CSS classes.

**Example:**
```php
add_filter( 'sce_avatar_classes', function( $classes ) {
    $classes[] = 'my-custom-class';
    return $classes;
} );
```

### `sce_gravatar_protection_size`

Filter the gravatar protection size (used for both width and height).

**Parameters:**
- `int $size` - The gravatar protection size in pixels.

**Return:** `int` - The filtered gravatar protection size.

**Example:**
```php
add_filter( 'sce_gravatar_protection_size', function( $size ) {
    return 120; // Set gravatar protection size to 120px
} );
```

### `sce_gravatar_protection_classes`

Filter the CSS classes applied to the gravatar protection image.

**Parameters:**
- `array $classes` - Array of CSS classes for the gravatar protection output.

**Return:** `array` - The filtered array of CSS classes.

**Example:**
```php
add_filter( 'sce_gravatar_protection_classes', function( $classes ) {
    $classes[] = 'my-gravatar-class';
    return $classes;
} );
```

---

## Help Tab Actions

### `sce_help_tab_{$tab}`

Fires when a help tab can be added. This is a dynamic action where `{$tab}` is the current tab name.

**Parameters:**
- `string $tab` - The current tab name.
- `string $settings_hook` - The current settings hook.
- `object $screen` - The current screen object.

**Example:**
```php
// For appearance tab
add_action( 'sce_help_tab_appearance', function( $tab, $settings_hook, $screen ) {
    // Add custom help content for appearance tab
    $screen->add_help_tab( array(
        'id'      => 'custom-appearance-help',
        'title'   => 'Custom Help',
        'content' => '<p>Custom help content here.</p>',
    ) );
}, 10, 3 );
```

---

## Mentions Subscribe Actions

### `sce_mentions_subscribe_after_scripts`

Fires after scripts are printed in the header on the subscribe page.

**Parameters:**
- `string $sce_mentions_theme_name` - The theme name.

**Since:** 1.0.0

**Example:**
```php
add_action( 'sce_mentions_subscribe_after_scripts', function( $theme_name ) {
    // Add custom inline script after header scripts
    echo '<script>console.log("Subscribe page loaded");</script>';
} );
```

### `sce_mentions_subscribe_after_styles`

Fires after styles are printed in the header on the subscribe page.

**Parameters:**
- `string $sce_mentions_theme_name` - The theme name.

**Since:** 1.0.0

**Example:**
```php
add_action( 'sce_mentions_subscribe_after_styles', function( $theme_name ) {
    // Add custom inline styles after header styles
    echo '<style>.custom-class { color: red; }</style>';
} );
```

### `sce_mentions_subscribe_body_open`

Fires when the body tag opens on the subscribe page.

**Example:**
```php
add_action( 'sce_mentions_subscribe_body_open', function() {
    // Add custom content at the start of the body
    echo '<div class="custom-wrapper">';
} );
```

### `sce_mentions_subscribe_body`

Fires inside the main content area of the subscribe page.

**Example:**
```php
add_action( 'sce_mentions_subscribe_body', function() {
    // Add custom content to the subscribe page body
    echo '<p>Thank you for subscribing!</p>';
} );
```

---

## Mentions Unsubscribe Actions

### `sce_mentions_unsubscribe_after_scripts`

Fires after scripts are printed in the header on the unsubscribe page.

**Parameters:**
- `string $sce_mentions_theme_name` - The theme name.

**Since:** 1.0.0

**Example:**
```php
add_action( 'sce_mentions_unsubscribe_after_scripts', function( $theme_name ) {
    // Add custom inline script after header scripts
    echo '<script>console.log("Unsubscribe page loaded");</script>';
} );
```

### `sce_mentions_unsubscribe_after_styles`

Fires after styles are printed in the header on the unsubscribe page.

**Parameters:**
- `string $sce_mentions_theme_name` - The theme name.

**Since:** 1.0.0

**Example:**
```php
add_action( 'sce_mentions_unsubscribe_after_styles', function( $theme_name ) {
    // Add custom inline styles after header styles
    echo '<style>.custom-class { color: blue; }</style>';
} );
```

### `sce_mentions_unsubscribe_body_open`

Fires when the body tag opens on the unsubscribe page.

**Example:**
```php
add_action( 'sce_mentions_unsubscribe_body_open', function() {
    // Add custom content at the start of the body
    echo '<div class="custom-wrapper">';
} );
```

### `sce_mentions_unsubscribe_body`

Fires inside the main content area of the unsubscribe page.

**Example:**
```php
add_action( 'sce_mentions_unsubscribe_body', function() {
    // Add custom content to the unsubscribe page body
    echo '<p>You have been unsubscribed successfully.</p>';
} );
```

