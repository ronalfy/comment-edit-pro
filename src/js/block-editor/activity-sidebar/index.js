const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;

import Sidebar from './sidebar';

registerPlugin( 'sce-comment-activity-expiration', {
	render: () => {
		return (
			<>
				<PluginDocumentSettingPanel
					title={ __( 'Comment Activity Expiration', 'comment-edit-pro' ) }
				>
					<Sidebar />
				</PluginDocumentSettingPanel>
			</>
		);
	},
} );
