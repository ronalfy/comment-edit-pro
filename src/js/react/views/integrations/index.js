import React from 'react';
import { createRoot } from 'react-dom/client';
import Mailchimp from './Mailchimp';

const container = document.getElementById( 'sce-tab-avatars' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Mailchimp />
	</React.StrictMode>
);
// const avatarProtectionContainer = document.getElementById( 'sce-tab-avatar-protection' );
// const avatarProtection = createRoot( avatarProtectionContainer );
// avatarProtection.render(
// 	<React.StrictMode>
// 		<GravatarProtection />
// 	</React.StrictMode>
// );
