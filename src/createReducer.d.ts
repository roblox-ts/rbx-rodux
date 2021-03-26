import Rodux from "./index";

/**
 * Creates a reducer that handles actions under `actionHandlers`.
 * Use the second overload for more explicit action handling
 * @param value
 * @param actionHandlers
 */
declare function createReducer<S, A extends Rodux.Action>(
	value: S,
	actionHandlers: Rodux.ActionHandlers<S, A>,
): Rodux.Reducer<S, A>;

export = createReducer;