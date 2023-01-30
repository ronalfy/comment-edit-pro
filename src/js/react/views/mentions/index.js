import React from 'react';
import { createRoot } from 'react-dom/client';
import Mentions from './mentions';

const container = document.getElementById( 'sce-tab-mentions' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Mentions />
	</React.StrictMode>
);
