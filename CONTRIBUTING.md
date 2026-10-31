# Contributing to Comment Edit Pro

The original maintainer is stepping back and this project is being archived. Forks are welcome. This file is the takeover guide: how the plugin is put together, how to run it locally, and which checks already exist in the repo.

GitHub's archive flag is a repository setting. Clear it when you are ready to maintain the project and accept issues and pushes. Forks keep working while the upstream repository stays archived.

## What this plugin is

Comment Edit Pro (plugin header version 4.3.0) adds comment-editing options, avatars, mentions, spam checks, integrations, webhooks, and front-end moderation on top of the free Simple Comment Editing plugin.

WordPress loads it from `comment-edit-pro.php`. That file defines the `CommentEditPro` namespace, the `Comment_Edit_Pro` singleton, and the `comment_edit_pro()` bootstrap. On `plugins_loaded` (priority 9) it constructs the feature classes in `includes/` and calls `run()` on each of them. `includes/class-admin.php` is constructed only when `is_admin()` is true.

The free plugin is detected by class `DLXPlugins\CommentEditLite\Simple_Comment_Editing` (plugin slug `simple-comment-editing`). `SCE_MIN_VERSION` is defined as `2.4.5` in `comment-edit-pro.php` and has no other readers in this repo. If the old `SCE_Options` class is present, boot stops and an admin notice is shown.

Runtime checks in the main class require PHP 5.6 (`Comment_Edit_Pro::PHP_REQUIRED`) and WordPress 4.9.8 (`Comment_Edit_Pro::WP_REQUIRED`). The plugin header also says `Requires at least: 5.0`.

Settings are registered at **Settings → Comment Edit Pro** (`options-general.php?page=comment-edit-pro`, capability `manage_options`). On a network where this plugin is network-activated, a network screen is registered at `settings.php?page=comment-edit-pro` (capability `manage_network`).

A shortcode, `[sce_comment_form]`, is registered from `includes/class-shortcode.php`.

Hooks that already have write-ups live in [actions.md](actions.md). That file is a catalog of selected filters and actions. Many more `sce_*` and `comment_edit_pro_*` hooks exist only in PHP.

## Local development

There is no Composer file and no Docker or wp-env config in this repo.

1. Install the plugin directory as `wp-content/plugins/comment-edit-pro` on a WordPress site that meets the version checks above.
2. Install and activate Simple Comment Editing (`simple-comment-editing`) so `DLXPlugins\CommentEditLite\Simple_Comment_Editing` exists. Comment editing, the timer, and several `sce_*` filters are provided by that plugin. This repo layers options and extra features on those hooks.
3. Activate Comment Edit Pro. On a single site, activation stores the `comment-edit-pro-activate` option and redirects to the settings screen. The redirect is skipped when `WP_DEBUG` is true, when the request is a bulk activation (`activate-multi`), or when the plugin is network-activated.

PHP classes load through `autoloader.php`. A class `CommentEditPro\Includes\Comment_Editing` maps to `includes/class-comment-editing.php`. The autoloader lowercases the path and turns underscores into hyphens. A class name ending in `Trait` maps to `trait-*.php`.

Front-end and admin assets are built with npm. `package-lock.json` is checked in. `package.json` has no `engines` field. From the plugin root:

```bash
npm install
npm run dev     # one-shot development webpack build
npm start       # webpack watch
npm run build   # production webpack build
```

`webpack.config.js` exports two configs:

- The first spreads `@wordpress/scripts` and writes the admin React bundles to `build/` (`*.js` plus `*.asset.php`). Entries are the screens under `src/js/react/views/` (avatars, integrations, mentions, comment editing, comment form, spam protection, webhooks, advanced, network home, and the tools screens).
- The second writes to `dist/` (webpack's default output directory) and sets `clean: true`, so a build replaces the previous `dist/` output. Entries include `css/*.scss`, `src/scss/*.scss`, front-end scripts (`src/js/avatars.js`, mentions, Turnstile, the selector helper, the block-editor activity sidebar), and the Fancybox stylesheet from `node_modules`.

Files in `js/` (`simple-comment-editing-options.js`, `simple-comment-editing-options-restore.js`, `front-end-editing.js`, `comment-character-control.js`) are enqueued as plain scripts. Webpack's entry list leaves them as shipped files, so edit them in place.

`npx grunt` runs the only Grunt task (`gruntfile.js`). It writes `comment-edit-pro.zip` at the plugin root. `.gitignore` ignores that zip. The archive includes the root PHP files, `build/`, `dist/`, `includes/`, `images/`, `fancybox/`, `js/`, `languages/`, and `templates/`.

## Tests and lint

This repository has no `tests/` directory, no Composer install, and no npm `test` or `lint` script.

`phpunit.xml` bootstraps `tests/bootstrap.php` and loads `tests/test-*.php`. That directory is absent, so PHPUnit cannot run from the current tree. `.travis.yml` is the only CI config. Its matrix is PHP 5.6 with `WP_TRAVISCI=phpcs`, and the script runs `phpcs` in that case. The PHPUnit lines run when `WP_VERSION` is set. The matrix leaves that variable unset. The repo has no GitHub Actions workflow.

`phpcs.xml.dist` references the WordPress coding standards and `WordPress-Docs`, with `testVersion` `5.6-`. The ruleset name is `Info Cards Pro Standards`. The file has a stray `"` on its own line inside the `WordPress` rule block, so the XML fails to parse while that character remains. WordPress Coding Standards are absent from the tree. `.travis.yml` installs them with `composer global require wp-coding-standards/wpcs`.

ESLint config is checked in. ESLint resolves `.eslintrc.json` ahead of `.eslintrc` when both sit in the same directory. `.eslintrc.json` extends `plugin:@wordpress/eslint-plugin/recommended-with-formatting`, uses `@babel/eslint-parser`, and lists the `sce*` globals passed from `wp_localize_script`. `.eslintignore` skips `build/`, `dist/`, `node_modules/`, and `vendor/`. A local run is `npx eslint src/js js`. `package.json` depends on ESLint 4 while `@wordpress/eslint-plugin` is also listed, so a lint run may need a dependency refresh before it succeeds.

## Project layout

| Path | What it owns |
| --- | --- |
| `comment-edit-pro.php` | Plugin header, version constants, singleton, boot, activation redirect, `wp_ajax_sce_restore_comment` |
| `autoloader.php` | `CommentEditPro\` class loader |
| `uninstall.php` | Deletes site options `sce_options` and `sce_table_version` and drops `{prefix}sce_comments` |
| `includes/class-*.php` | Feature modules. Each public module exposes `run()` |
| `includes/class-options.php` | Reads and sanitizes the `sce_options` and `sce_options_network` arrays |
| `includes/class-functions.php` | Settings URLs, sanitizing helpers, branding filters |
| `includes/class-admin.php` | Settings menu and plugin action links |
| `includes/class-admin-settings.php` | Settings screen markup and tab rendering |
| `includes/admin-tabs/` | Tab registration through `comment_edit_pro_admin_tabs` |
| `includes/class-output.php` | Bridges saved options onto Simple Comment Editing filters (`sce_text_save`, timer, delete, edit history) |
| `includes/class-table.php` | `{prefix}sce_comments` edit log, created when `allow_comment_logging` is enabled |
| `includes/class-table-mentions.php` | `{prefix}sce_mentions`, created when `mentions_enabled` is enabled |
| `src/js/react/views/` | Admin React screens, one folder per settings area |
| `src/js/SendCommand.js` | Axios POST helper used by those screens (`action`, `nonce`, `ajaxurl`) |
| `src/scss/`, `css/` | Styles compiled into `dist/` |
| `js/` | Hand-written front-end scripts enqueued directly |
| `build/` | Compiled admin bundles and `*.asset.php` dependency files |
| `dist/` | Compiled CSS and the second webpack config's scripts |
| `fancybox/` | Vendored jQuery Fancybox used by front-end editing and the settings screen |
| `templates/` | Front-end editing, mentions subscribe/unsubscribe, emails, block-comments, delete-comments |
| `images/` | Logo and admin screenshots |
| `languages/simple-comment-editing-options.pot` | Stale 2020 POT. Header text domain for new strings is `comment-edit-pro` |
| `actions.md` | Documented filters and actions |

`includes/class-integrations.php` starts Mailchimp, Slack, ConvertKit, Flodesk, and MailerLite. `includes/class-spam-protection.php` starts Akismet, reCAPTCHA, and Cloudflare Turnstile.

`includes/class-help.php`, `includes/admin-tabs/class-appearance.php`, and `includes/admin-tabs/class-comment-actions.php` sit outside `Comment_Edit_Pro::plugins_loaded()` and `Admin_Tabs\Init_Tabs::run()`. On a normal site, `Init_Tabs` constructs Main, Advanced, Avatars, Comment Editing, Comment Form, Integrations, Mentions, Spam Protection, Tools, and Webhooks. When `Functions::is_multisite( true )` is true, it constructs Network Home.

`includes/class-admin.php` imports `Admin_Menu_Output`. The tree has no class by that name.

## Coding conventions

Match the surrounding file.

- Namespace `CommentEditPro\Includes` for feature classes and `CommentEditPro\Includes\Admin_Tabs` for tabs. Class names use WordPress underscores (`Comment_Editing`). File names follow the autoloader (`class-comment-editing.php`).
- Guard PHP files with `ABSPATH` and `die( 'No direct access.' );`, as the existing classes do.
- New translatable strings use the text domain `comment-edit-pro`. The plugin header sets `Domain Path: /languages`. JavaScript uses `@wordpress/i18n` with the same domain (`__( 'Mailchimp', 'comment-edit-pro' )`). Older strings still use `simple-comment-editing`, `simple-comment-editing-object`, and `ultimate-auto-updates`. Leave those until you are editing that string.
- Settings AJAX checks a feature-specific nonce and `current_user_can( 'manage_options' )` together, for example `sce-save-comment-editing-options`. Network option AJAX uses `manage_network`. Comment restore, front-end moderation, and comment deletion use `moderate_comments`.
- Nonces are created with `wp_create_nonce` and checked with `wp_verify_nonce`. Action names are mostly `wp_ajax_sce_*`. One front-end editing action is `wp_ajax_comment_edit_pro_get_frontend_comment`.
- Options are saved with `Options::update_options()` / `Options::get_options()`, which read and write the `sce_options` option. Network options use `sce_options_network`. Sanitization is the `switch` in `Options::update_options()`: booleans, absint fields, `esc_url` for the Slack webhook, and `sanitize_text_field` or `Functions::sanitize_array_recursive()` for everything else.
- Admin tabs are added with the `comment_edit_pro_admin_tabs` filter. Each item has `get` (the `tab` query arg), `action`, `url`, `label`, and `icon`. Sub-tabs use `comment_edit_pro_admin_sub_tabs`. See `includes/admin-tabs/class-tools.php` for the tools sub-tabs (`comment-tools`, `comment-activity`, `comment-shortcuts`, `post-types`).
- Hooks that extend the free plugin keep the `sce_` prefix (`sce_comment_time`, `sce_can_edit_pre`, `sce_integrations_localized_vars`). Branding hooks use `comment_edit_pro_` (`comment_edit_pro_plugin_name`, `comment_edit_pro_plugin_logo_full`).
- Admin React code lives under `src/js/react/views/<screen>/` and posts through `sendCommand`. PHP enqueues the matching `build/<bundle>.js` only when `Functions::get_admin_tab()` matches that screen, and passes nonces with `wp_localize_script`.
- Comment content and other user-generated HTML go through the escaping helpers already used at the call site (`wp_kses_post`, `esc_html`, `sanitize_text_field`).

## Settings, front-end scripts, and admin UI

Site settings are one array in the `sce_options` option. The React screens load and save slices of that array over `admin-ajax.php`. A typical pair is `sce-retrieve-*-options` and `sce-save-*-options`, localized onto a global such as `sceCommentEditing` or `sceIntegrations`.

The settings page HTML is `Admin_Settings::settings_page()`. Tabs come from `Init_Tabs`. The home tab is PHP markup in `includes/admin-tabs/class-main.php`. The other live tabs enqueue a `build/` script for the current `tab` query argument.

Front-end behavior is split:

- `comment-edit-pro.php` enqueues `js/simple-comment-editing-options.js` on the `sce_scripts_loaded` action (dependencies include `simple-comment-editing`) and prints a `sceFrontend` selector map in `wp_footer`.
- `includes/class-output.php` maps options onto Simple Comment Editing filters and enqueues `js/simple-comment-editing-options-restore.js` for the comment-history meta box. Restore uses `wp_ajax_sce_restore_comment` and the nonce `restore-comment-{comment_id}`.
- `includes/class-frontend-editing.php` enqueues Fancybox, `dist/sce-frontend.css`, and `js/simple-comment-editing-options.js` on singular views, and registers the moderation and front-end save/delete AJAX actions.
- Avatars, mentions, Turnstile, the selector helper, character control, and the block-editor activity sidebar enqueue their own `dist/` or `js/` files from the matching class.

Webhooks are a private post type `sce_webhooks`, registered in `includes/class-webhooks.php`. The `sce_webhook_post_type_args` filter is documented in `actions.md`.

## Versioning

The plugin version is the `Version` header in `comment-edit-pro.php` and the `COMMENTEDITPRO_VERSION` constant. Both are `4.2.0`. Keep them the same when you release. Table schema versions are separate constants: `COMMENTEDITPRO_TABLE_VERSION` (`1.0.0`, option `sce_table_version`) and `COMMENTEDITPRO_MENTIONS_TABLE_VERSION` (`0.0.9`, option `sce_mentions_version`).

`package.json` `"version"` is `1.5.0` and `"name"` is `simple-comment-editing-options`. WordPress reads the plugin header and `COMMENTEDITPRO_VERSION`.

There is no changelog file and no WordPress.org `readme.txt`. The zip step is `npx grunt`, described above. There is no other release script.

## Taking over an archived repo

Work on a fork. Clear the upstream archive flag only when you intend to maintain the canonical repository.

This repo has no `SECURITY.md`, and `readme.md` and `package.json` (`bugs.url`, `homepage`) leave the security contact empty. There is no `readme.txt`. The 2020 POT header names a translator email. That header is a translation credit.

Report vulnerabilities through a private security advisory on your fork, or a private issue if your host provides one.

License is GPL-3.0-or-later (`LICENSE`, and `package.json` `"license"`). Leave the license file as it is unless you are changing the license on purpose.

`AGENTS.md` is the short guide for coding agents. `.cursor/rules/` points agents at these two files.
