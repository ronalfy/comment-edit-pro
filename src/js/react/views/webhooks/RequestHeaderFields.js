import { __ } from '@wordpress/i18n';
const RequestHeaderFields = [
	{ label: __( 'Select a Field', 'comment-edit-pro' ), value: 'none' },
	{
		label: __( 'Commenter Name', 'comment-edit-pro' ),
		value: 'commenter_name',
	},
	{
		label: __( 'Commenter Email', 'comment-edit-pro' ),
		value: 'commenter_email',
	},
	{
		label: __( 'Commenter Website', 'comment-edit-pro' ),
		value: 'commenter_website',
	},
	{
		label: __( 'Comment Content', 'comment-edit-pro' ),
		value: 'comment_content',
	},
	{
		label: __( 'Comment ID', 'comment-edit-pro' ),
		value: 'comment_id',
	},
	{
		label: __( 'Comment Parent ID', 'comment-edit-pro' ),
		value: 'comment_parent_id',
	},
	{
		label: __( 'Comment Post ID', 'comment-edit-pro' ),
		value: 'comment_post_id',
	},
	{
		label: __( 'Comment Post Title', 'comment-edit-pro' ),
		value: 'comment_post_title',
	},
	{
		label: __( 'Comment Post URL', 'comment-edit-pro' ),
		value: 'comment_post_url',
	},
	{
		label: __( 'Comment Author IP', 'comment-edit-pro' ),
		value: 'comment_author_ip',
	},
	{
		label: __( 'Comment Author User Agent', 'comment-edit-pro' ),
		value: 'comment_author_user_agent',
	},
	{
		label: __( 'Comment Date', 'comment-edit-pro' ),
		value: 'comment_date',
	},
	{
		label: __( 'Comment Date GMT', 'comment-edit-pro' ),
		value: 'comment_date_gmt',
	},
	{
		label: __( 'Comment Approved', 'comment-edit-pro' ),
		value: 'comment_approved',
	},
	{
		label: __( 'Comment Type', 'comment-edit-pro' ),
		value: 'comment_type',
	},
	{
		label: __( 'Custom Value', 'comment-edit-pro' ),
		value: 'custom',
	},
];
export default RequestHeaderFields;
