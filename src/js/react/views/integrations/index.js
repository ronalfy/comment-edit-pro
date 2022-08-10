import React from 'react';
import { createRoot } from 'react-dom/client';
import Mailchimp from './Mailchimp';
import Akismet from './Akismet';
import Recaptcha from './Recapcha';

const container = document.getElementById( 'sce-tab-mailchimp' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Mailchimp />
	</React.StrictMode>
);
const akismetContainer = document.getElementById( 'sce-tab-akismet' );
const akismetProtection = createRoot( akismetContainer );
akismetProtection.render(
	<React.StrictMode>
		<Akismet />
	</React.StrictMode>
);

const recaptchaContainer = document.getElementById( 'sce-tab-recaptcha' );
const recaptchaProtection = createRoot( recaptchaContainer );
recaptchaProtection.render(
	<React.StrictMode>
		<Recaptcha />
	</React.StrictMode>
);
