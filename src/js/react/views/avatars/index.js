import React from 'react';
import {createRoot} from 'react-dom/client';
import Avatars from './Avatars';

const container = document.getElementById('sce-tab-avatars');
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Avatars />
	</React.StrictMode>
);
