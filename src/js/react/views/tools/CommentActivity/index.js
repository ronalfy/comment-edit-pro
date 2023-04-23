import React from 'react';
import { createRoot } from 'react-dom/client';
import CommentActivity from './CommentActivity';

const container = document.getElementById( 'sce-tab-tools-comment-activity' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<CommentActivity />
	</React.StrictMode>
);
