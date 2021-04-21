import Rodux from "./index";

/**
 * A helper function that can be used to create reducers.
 * 
 * Reducers often have a structure that looks like this:
 * 
 * ```ts
 * const INITIAL_STATE: S = {
 * 		...
 * }
 * function reducer(state: S = INITIAL_STATE, action: A): S {
 * 		switch(action.type) {
 * 			case "setFoo":
 * 				// handle the setFoo action
 * 			case "setBar":
 * 				// handle the setBar action
 * 			default:
 * 				return state;
 * 		}
 * }
 * ```
 * 
 * `createReducer` can replace the switch statements in a reducer:
 * 
 * ```ts
 * const INITIAL_STATE: S = {
 * 		...
 * }
 * 
 * const reducer = createReducer<S, SetFooAction | SetBarAction>(INITIAL_STATE, {
 * 		setFoo: (state: S, action: SetFooAction) => {
 * 			// handle the setFoo action
 * 		},
 * 		setBar: (state: S, action: SetBarAction) => {
 * 			// handle the setBar action
 * 		}
 * })
 * ```
 * 
 * @param value The default value of this reducer
 * @param actionHandlers The action handlers
 * 
 */
declare function createReducer<S, A extends Rodux.Action>(
	value: S,
	actionHandlers: Rodux.ActionHandlers<S, A>
): Rodux.Reducer<S, A>;

export = createReducer;
