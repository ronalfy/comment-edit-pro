import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
const Mailchimp = lazy( () =>
	import( /* webpackChunkName: "Mailchimp0.0.2" */ './Mailchimp' )
);
const Slack = lazy( () =>
	import( /* webpackChunkName: "Slack0.0.3" */ './Slack' )
);
const ConvertKit = lazy( () =>
	import( /* webpackChunkName: "ConvertKit0.0.1" */ './ConvertKit' )
);

const Flodesk = lazy( () =>
	import( /* webpackChunkName: "FloDesk0.0.3" */ './Flodesk' )
);

const container = document.getElementById( 'sce-tab-mailchimp' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Mailchimp />
	</React.StrictMode>
);

const slackContainer = document.getElementById( 'sce-tab-slack' );
const slackIntegration = createRoot( slackContainer );
slackIntegration.render(
	<React.StrictMode>
		<Slack />
	</React.StrictMode>
);

const convertkitContainer = document.getElementById( 'sce-tab-convertkit' );
const convertkitIntegration = createRoot( convertkitContainer );
convertkitIntegration.render(
	<React.StrictMode>
		<ConvertKit />
	</React.StrictMode>
);

const flodeskContainer = document.getElementById( 'sce-tab-flodesk' );
const flodeskIntegration = createRoot( flodeskContainer );
flodeskIntegration.render(
	<React.StrictMode>
		<Flodesk />
	</React.StrictMode>
);
