import React from 'react';
import { createRoot } from 'react-dom/client';
import Advanced from './advanced';

const container = document.getElementById( 'sce-tab-advanced' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Advanced />
	</React.StrictMode>
);
