import React, { lazy, useState } from 'react';
import { createRoot } from 'react-dom/client';
import SpamProtectionContext from './Context';

const Akismet = lazy( () =>
	import( /* webpackChunkName: "Akismet0.0.2" */ './Akismet' )
);
const Recaptcha = lazy( () =>
	import( /* webpackChunkName: "Recaptcha0.0.2" */ './Recapcha' )
);
const Turnstile = lazy( () =>
	import( /* webpackChunkName: "Turnstile0.0.2" */ './Turnstile' )
);

const SpamProtectionInterface = () => {
	const [ recaptchaEnabled, setRecaptchaEnabled ] = useState( false );
	const [ turnstileEnabled, setTurnstileEnabled ] = useState( false );

	return (
		<SpamProtectionContext.Provider
			value={ {
				recaptchaEnabled,
				setRecaptchaEnabled,
				turnstileEnabled,
				setTurnstileEnabled,
			} }
		>
			<div className="sce-admin-panel-area">
				<div className="sce-panel-row">
					<Akismet />
				</div>
			</div>
			<div className="sce-admin-panel-area">
				<div className="sce-panel-row">
					<Recaptcha />
				</div>
			</div>
			<div className="sce-admin-panel-area">
				<div className="sce-panel-row">
					<Turnstile />
				</div>
			</div>
		</SpamProtectionContext.Provider>
	);
};

const spamProtectionContainer = document.getElementById( 'sce-tab-spam-protection' );
const spamProtection = createRoot( spamProtectionContainer );
spamProtection.render(
	<React.StrictMode>
		<SpamProtectionInterface />
	</React.StrictMode>
);
