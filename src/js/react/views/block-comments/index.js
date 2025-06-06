import React from 'react';
import { createRoot } from 'react-dom/client';
import BlockComments from './block-comments';

const container = document.getElementById( 'sce-block-comments' );
const root = createRoot( container );

root.render(
	<React.StrictMode>
		<BlockComments />
	</React.StrictMode>
);
