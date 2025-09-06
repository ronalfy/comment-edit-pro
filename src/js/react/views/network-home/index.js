import React from 'react';
import { createRoot } from 'react-dom/client';
import Network_Home from './network-home';

const container = document.getElementById( 'sce-tab-network-home' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Network_Home />
	</React.StrictMode>
);
