import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';

const Akismet = lazy( () =>
	import( /* webpackChunkName: "Akismet0.0.1" */ './Akismet' )
);
const Recaptcha = lazy( () =>
	import( /* webpackChunkName: "Recaptcha0.0.1" */ './Recapcha' )
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

