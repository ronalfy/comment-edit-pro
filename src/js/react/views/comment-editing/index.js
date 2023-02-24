import React from 'react';
import { createRoot } from 'react-dom/client';
import CommentEditing from './comment-editing';

const container = document.getElementById( 'sce-tab-comment-editing' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<CommentEditing />
	</React.StrictMode>
);
