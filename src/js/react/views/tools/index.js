import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import Tools from './Tools';

const container = document.getElementById( 'sce-tab-tools' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Tools />
	</React.StrictMode>
);
