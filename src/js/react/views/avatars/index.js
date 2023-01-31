import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Avatars from './Avatars';
import GravatarProtection from './GravatarProtection.';
import AvatarsContext from './Context';

const container = document.getElementById( 'sce-tab-avatars' );
const root = createRoot( container );

const AvatarInterface = () => {
	const [ avatarsEnabled, setAvatarsEnabled ] = useState( sceAvatars.avatars_enabled );

	return (
		<AvatarsContext.Provider
			value={ {
				avatarsEnabled,
				setAvatarsEnabled,
			} }
		>
			<div className="sce-admin-panel-area">
				<div className="sce-panel-row">
					<Avatars />
				</div>
			</div>
			<div className="sce-admin-panel-area">
				<div className="sce-panel-row">
					<GravatarProtection />
				</div>
			</div>
		</AvatarsContext.Provider>
	);
};
root.render(
	<React.StrictMode>
		<AvatarInterface />
	</React.StrictMode>
);
