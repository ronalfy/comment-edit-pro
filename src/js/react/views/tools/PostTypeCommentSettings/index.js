import React from 'react';
import { createRoot } from 'react-dom/client';
import PostTypeCommentSettings from './PostTypeCommentSettings';

const container = document.getElementById( 'sce-tab-tools-post-type-comment-settings' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<PostTypeCommentSettings />
	</React.StrictMode>
);
