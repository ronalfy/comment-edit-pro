import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import PostDeleteComments from './post-delete-comments';

const container = document.getElementById( 'sce-post-delete-comments' );
const root = createRoot( container );

root.render(
	<React.StrictMode>
		<PostDeleteComments />
	</React.StrictMode>
);
