import React from 'react';
import { createRoot } from 'react-dom/client';
import CommentForm from './comment-form';

const container = document.getElementById( 'sce-tab-comment-form' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<CommentForm />
	</React.StrictMode>
);
