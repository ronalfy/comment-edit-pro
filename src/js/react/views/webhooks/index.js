import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Webhooks from './webhooks';
import WebhooksContext from './Context';

const container = document.getElementById( 'sce-tab-webhooks' );
const root = createRoot( container );

const WebhookApp = () => {
	const [ existingWebhooks, setExistingWebhooks ] = useState( [] );
	return (
		<WebhooksContext.Provider
			value={ {
				existingWebhooks,
				setExistingWebhooks,
			} }
		>
			<Webhooks />
		</WebhooksContext.Provider
		>
	);
};
root.render(
	<React.StrictMode>
		<WebhookApp />
	</React.StrictMode>
);
