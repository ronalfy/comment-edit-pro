import React from 'react';
import { createRoot } from 'react-dom/client';
import Avatars from './Avatars';
import GravatarProtection from './GravatarProtection.';

const container = document.getElementById( 'sce-tab-avatars' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Avatars />
	</React.StrictMode>
);
const avatarProtectionContainer = document.getElementById( 'sce-tab-avatar-protection' );
const avatarProtection = createRoot( avatarProtectionContainer );
avatarProtection.render(
	<React.StrictMode>
		<GravatarProtection />
	</React.StrictMode>
);
