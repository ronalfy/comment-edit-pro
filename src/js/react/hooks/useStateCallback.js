import React, { useState, useEffect, useRef, useCallback } from 'react';
function useStateCallback( initialState ) {
	const [ state, setState ] = useState( initialState );
	const cbRef = useRef( null ); // init mutable ref container for callbacks

	const setStateCallback = useCallback( ( newState, cb ) => {
		cbRef.current = cb; // store current, passed callback in ref
		setState( newState );
	}, [] ); // keep object reference stable, exactly like `useState`

	useEffect( () => {
		// cb.current is `null` on initial render,
		// so we only invoke callback on state *updates*
		if ( cbRef.current ) {
			cbRef.current( state );
			cbRef.current = null; // reset callback after execution
		}
	}, [ state ] );

	return [ state, setStateCallback ];
}
export default useStateCallback;
