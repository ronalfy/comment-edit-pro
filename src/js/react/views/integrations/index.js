import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
const Mailchimp = lazy( () =>
	import( './Mailchimp' )
);
const Akismet = lazy( () =>
	import( './Akismet' )
);
const Recaptcha = lazy( () =>
	import( './Recapcha' )
);
const Slack = lazy( () =>
	import( './Slack' )
);

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

const slackContainer = document.getElementById( 'sce-tab-slack' );
const slackIntegration = createRoot( slackContainer );
slackIntegration.render(
	<React.StrictMode>
		<Slack />
	</React.StrictMode>
);
