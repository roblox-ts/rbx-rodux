	/**
	 * Creates a reducer that handles actions under `actionHandlers`.
	 * Use the second overload for more explicit action handling
	 * @param value
	 * @param actionHandlers
	 */
	declare function createReducer<S, K extends keyof S>(
		value: S[K],
		actionHandlers: {
			[name: string]: (state: S[K], action: AnyAction) => S[K] | S;
		},
    ): Reducer<S[K], AnyAction>;
    
export = createReducer;