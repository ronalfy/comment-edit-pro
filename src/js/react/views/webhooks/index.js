import React from 'react';
import { createRoot } from 'react-dom/client';
import Webhooks from './webhooks';

const container = document.getElementById( 'sce-tab-webhooks' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Webhooks />
	</React.StrictMode>
);
