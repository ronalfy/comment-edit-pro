import React from 'react';
import { createRoot } from 'react-dom/client';
import CharacterControl from './CharacterControl';

const container = document.getElementById( 'sce-tab-character-control' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<CharacterControl />
	</React.StrictMode>
);
