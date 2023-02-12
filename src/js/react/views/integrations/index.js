import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
const Mailchimp = lazy( () =>
	import( /* webpackChunkName: "Mailchimp0.0.1" */ './Mailchimp' )
);
const Akismet = lazy( () =>
	import( /* webpackChunkName: "Akismet0.0.1" */ './Akismet' )
);
const Recaptcha = lazy( () =>
	import( /* webpackChunkName: "Recaptcha0.0.1" */ './Recapcha' )
);
const Slack = lazy( () =>
	import( /* webpackChunkName: "Slack0.0.1" */ './Slack' )
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
