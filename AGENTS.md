# Agent guide: Comment Edit Pro

Comment Edit Pro is a WordPress plugin (PHP namespace `CommentEditPro`, header version 4.3.0) that extends the free Simple Comment Editing plugin. Humans taking over the archive should read [CONTRIBUTING.md](CONTRIBUTING.md). This file is the working map.

The original maintainer is archiving the repository. Leave version numbers, the license, and unrelated modules alone unless the task is specifically about them.

## Stack

- PHP, WordPress hooks, a custom autoloader (`autoloader.php`). No Composer.
- Runtime gates in `comment-edit-pro.php`: PHP 5.6 and WordPress 4.9.8. The plugin header says `Requires at least: 5.0`.
- Comment editing expects the free plugin class `DLXPlugins\CommentEditLite\Simple_Comment_Editing` (slug `simple-comment-editing`). `SCE_MIN_VERSION` (`2.4.5`) is defined once and has no readers. Boot aborts if the legacy `SCE_Options` class exists.
- Admin UI: PHP tab shell plus React 18 screens compiled with webpack (`@wordpress/scripts` in the first config). `@wordpress/i18n` text domain is `comment-edit-pro`.
- `npm install`, then `npm run dev`, `npm start` (watch), or `npm run build`. `package.json` has no `engines` field. Its `"version"` is `1.5.0`. WordPress reads `COMMENTEDITPRO_VERSION`.
- No `tests/` directory. `phpunit.xml` points at a missing `tests/bootstrap.php`. No npm test script. ESLint config is `.eslintrc.json` (ESLint prefers it over `.eslintrc`). `phpcs.xml.dist` is invalid XML until the stray `"` inside the WordPress rule block is removed. Details are in CONTRIBUTING.md.

## Key files

| File | Role |
| --- | --- |
| `comment-edit-pro.php` | Header, `COMMENTEDITPRO_VERSION`, singleton `Comment_Edit_Pro`, `plugins_loaded` boot, activation redirect, restore-comment AJAX |
| `includes/class-options.php` | `sce_options` and `sce_options_network` get/update and sanitization |
| `includes/class-functions.php` | `get_settings_url()`, tab query args, branding filters |
| `includes/class-admin.php` | Menu: `options-general.php?page=comment-edit-pro` and network `settings.php?page=comment-edit-pro` |
| `includes/class-admin-settings.php` | Settings markup. Calls `Admin_Tabs\Init_Tabs` |
| `includes/admin-tabs/class-init-tabs.php` | Which tabs are actually registered |
| `includes/class-output.php` | Applies options to `sce_*` filters from the free plugin. Comment edit history meta box |
| `includes/class-comment-editing.php` | Comment-editing options AJAX and `build/sce-comment-editing.js` |
| `includes/class-frontend-editing.php` | Front-end moderation and edit/delete AJAX. Capability `moderate_comments` |
| `includes/class-integrations.php` | Mailchimp, Slack, ConvertKit, Flodesk, MailerLite |
| `includes/class-spam-protection.php` | Akismet, reCAPTCHA, Turnstile |
| `includes/class-webhooks.php` | Post type `sce_webhooks` and webhook AJAX |
| `includes/class-avatars.php` | Avatars, including `wp_ajax_nopriv_sce_save_user_avatar` |
| `includes/class-table.php` | `{wpdb prefix}sce_comments` |
| `includes/class-table-mentions.php` | `{wpdb prefix}sce_mentions` |
| `src/js/SendCommand.js` | Admin AJAX client. Sends `action` and `nonce` |
| `src/js/react/views/` | One folder per admin screen. Built to `build/` |
| `js/*.js` | Hand-written scripts enqueued directly. Webpack's entry list leaves them as shipped files |
| `webpack.config.js` | Config 1 → `build/`. Config 2 → `dist/` with `clean: true` |
| `actions.md` | Hooks that already have a short doc |
| `uninstall.php` | Drops `sce_comments` and deletes `sce_options` and `sce_table_version` |

`includes/class-help.php` and the admin tab classes `Appearance` and `Comment_Actions` sit outside the bootstrap. On a normal site, `Init_Tabs` registers home, advanced, avatars, comment-editing, comment-form, integrations, mentions, spam-protection, tools, and webhooks. When `Functions::is_multisite( true )` is true, it registers the network home tab.

## Dangerous areas

Comment text, author fields, emails, avatar uploads, webhook URLs, and integration API keys all come from users or site admins. Read the existing nonce and capability check in the method you touch and keep that check on the same request.

- **Who may edit or moderate.** Front-end save, delete, spam, approve, and the restore endpoint in `comment-edit-pro.php` (`wp_ajax_sce_restore_comment`) require `moderate_comments` plus a per-comment nonce (`restore-comment-{id}`, `sce-modify-comment-{id}`, and the matching moderation nonces). Settings endpoints require `manage_options`. Network settings require `manage_network`.
- **Logged-out AJAX.** `includes/class-avatars.php` registers `wp_ajax_nopriv_sce_save_user_avatar` on the same callback as the logged-in action. `can_change_avatar()` allows moderators, and otherwise depends on `enable_avatars`, `enable_avatars_logged_in`, and `enable_avatars_anonymous`.
- **Nonce shape.** Settings handlers combine `wp_verify_nonce( $nonce, 'sce-save-…' )` with `current_user_can` in one condition. Nonces are localized onto globals such as `sceCommentEditing` and `sceIntegrations`. `SendCommand` posts `nonce` with the `action`.
- **Stored HTML.** Edit history writes raw comment content into `{prefix}sce_comments` and prints it with `wp_kses_post` on restore. Front-end save in `class-frontend-editing.php` runs content through `wp_kses_post`. Keep that path when you change save or restore.
- **Options sanitization.** `Options::update_options()` is the single writer for `sce_options`. New keys fall through to `sanitize_text_field` unless you add a `case`. Booleans and the Slack webhook URL have explicit cases. Turning `allow_comment_logging` or `mentions_enabled` on creates a table. Turning either off drops that table.
- **Webhooks and integrations.** Webhook configs and mailing-list credentials are admin-managed and leave the site (HTTP to Slack, Mailchimp, Flodesk, MailerLite, ConvertKit, Akismet, reCAPTCHA, Turnstile). Treat URL and API-key fields as secrets in logs and localized script data.
- **Free-plugin hooks.** `includes/class-output.php` filters `sce_can_edit_pre`, `sce_unlimited_editing`, `sce_allow_delete`, `sce_force_delete`, and the timer/button text hooks. Those filters decide whether a visitor can change a comment. The free plugin must be active for that behavior.

## How to verify a change

There is no automated test suite to run. Verify the screen you changed.

1. PHP-only change: load the plugin on a site with Simple Comment Editing active. Open **Settings → Comment Edit Pro** and the tab that owns the code (`tab` query arg matches the tab `get` value, for example `tab=comment-editing`).
2. Admin React or SCSS under `src/` or `css/`: run `npm run dev` or `npm run build`. Confirm the enqueue path (`build/<name>.js` or `dist/<name>.css`) and hard-refresh the settings tab. The second webpack config wipes `dist/` on each build.
3. A file in `js/`: reload the front end. Those files ship as written.
4. AJAX: save the settings form or trigger the front-end action while logged in as an administrator, then repeat as a subscriber or logged-out visitor and confirm the capability check still rejects it.
5. Comment editing: post a comment, edit it inside the timer, and check the edit-history meta box if comment logging is on.
6. Optional: `npx eslint src/js js` after dependencies install. PHP_CodeSniffer needs the WordPress standards installed separately, and `phpcs.xml.dist` needs the stray quote removed before it will load.

Single-site activation redirects to the settings URL. With `WP_DEBUG` true, that redirect is skipped.

## Leave these alone

- Leave `Version` in `comment-edit-pro.php` and `COMMENTEDITPRO_VERSION` at the current value unless you are publishing a release. Table constants `COMMENTEDITPRO_TABLE_VERSION` and `COMMENTEDITPRO_MENTIONS_TABLE_VERSION` move only when the matching `dbDelta` schema changes.
- Leave `package.json` `"version"` out of WordPress releases. WordPress reads the PHP header.
- Keep a change inside the module that owns the behavior. A mentions fix stays in `class-mentions.php` and `src/js/react/views/mentions/` (or `src/js/mentions/` for the front end).
- New strings use text domain `comment-edit-pro`. The POT at `languages/simple-comment-editing-options.pot` is from 2020 and still describes removed files.
- `build/` and `dist/` are generated. Edit `src/`, `css/`, or the hand-written `js/` files.
- `actions.md` documents public hooks. Update it when you add or change a hook that file already lists.
- `uninstall.php` deletes `sce_options` and `sce_table_version` and drops `{prefix}sce_comments`. The mentions table `{prefix}sce_mentions` stays in place.
- This archive has no security contact. Send vulnerability reports through a private advisory or private issue on the fork you maintain. See CONTRIBUTING.md.
