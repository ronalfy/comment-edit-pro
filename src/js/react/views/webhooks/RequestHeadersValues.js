import { __ } from '@wordpress/i18n';
const RequestHeadersValues = [
	{ label: __( 'Select a Name', 'comment-edit-pro' ), value: 'none' },
	{
		label: 'Accept',
		value: 'Accept',
	},
	{
		label: 'Accept-Charset',
		value: 'Accept-Charset',
	},
	{
		label: 'Accept-Encoding',
		value: 'Accept-Encoding',
	},
	{
		label: 'Accept-Language',
		value: 'Accept-Language',
	},
	{
		label: 'Accept-Datetime',
		value: 'Accept-Datetime',
	},
	{
		label: 'Authorization',
		value: 'Authorization',
	},
	{
		label: 'Cache-Control',
		value: 'Cache-Control',
	},
	{
		label: 'Connection',
		value: 'Connection',
	},
	{
		label: 'Cookie',
		value: 'Cookie',
	},
	{
		label: 'Content-Length',
		value: 'Content-Length',
	},
	{
		label: 'Content-Type',
		value: 'Content-Type',
	},
	{
		label: 'Date',
		value: 'Date',
	},
	{
		label: 'Expect',
		value: 'Expect',
	},
	{
		label: 'Forwarded',
		value: 'Forwarded',
	},
	{
		label: 'From',
		value: 'From',
	},
	{
		label: 'Host',
		value: 'Host',
	},
	{
		label: 'If-Match',
		value: 'If-Match',
	},
	{
		label: 'If-Modified-Since',
		value: 'If-Modified-Since',
	},
	{
		label: 'If-None-Match',
		value: 'If-None-Match',
	},
	{
		label: 'If-Range',
		value: 'If-Range',
	},
	{
		label: 'If-Unmodified-Since',
		value: 'If-Unmodified-Since',
	},
	{
		label: 'Max-Forwards',
		value: 'Max-Forwards',
	},
	{
		label: 'Origin',
		value: 'Origin',
	},
	{
		label: 'Pragma',
		value: 'Pragma',
	},
	{
		label: 'Proxy-Authorization',
		value: 'Proxy-Authorization',
	},
	{
		label: 'Range',
		value: 'Range',
	},
	{
		label: 'Referer',
		value: 'Referer',
	},
	{
		label: 'TE',
		value: 'TE',
	},
	{
		label: 'User-Agent',
		value: 'User-Agent',
	},
	{
		label: 'Upgrade',
		value: 'Upgrade',
	},
	{
		label: 'Via',
		value: 'Via',
	},
	{
		label: 'Warning',
		value: 'Warning',
	},
	{
		label: 'Custom Name',
		value: 'custom',
	},
];
export default RequestHeadersValues;
