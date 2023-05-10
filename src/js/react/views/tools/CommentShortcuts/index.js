import React from 'react';
import { createRoot } from 'react-dom/client';
import CommentShortcuts from './CommentShortcuts';

const container = document.getElementById( 'sce-tab-tools-comment-shortcuts' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<CommentShortcuts />
	</React.StrictMode>
);
