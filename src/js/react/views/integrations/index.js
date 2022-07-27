import React from 'react';
import { createRoot } from 'react-dom/client';
import Mailchimp from './Mailchimp';
import Akismet from './Akismet';

const container = document.getElementById( 'sce-tab-mailchimp' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Mailchimp />
	</React.StrictMode>
);
const avatarProtectionContainer = document.getElementById( 'sce-tab-akismet' );
const avatarProtection = createRoot( avatarProtectionContainer );
avatarProtection.render(
	<React.StrictMode>
		<Akismet />
	</React.StrictMode>
);
