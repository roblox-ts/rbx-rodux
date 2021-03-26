import Rodux from "./index";
type ReducerMap<S, A extends Rodux.Action> = {
	[K in keyof S]: Rodux.Reducer<S[K], A>;
};

/**
 * A helper function that can be used to combine multiple reducers into a new reducer.
 * 
 * `combineReducers` is functionally equivalent to writing:
 * ```ts
 * function reducer(state: S, action: A) {
 * 		return {
 * 			Key1: reducer1(state.Key1, action),
 * 			Key2: reducer2(state.Key2, action)
 * 		}
 * }
 * ```
 * 
 * @param reducers The reducers to combine
 * 
 * https://roblox.github.io/rodux/api-reference/#roduxcombinereducers
 */
declare function combineReducers<S, A extends Rodux.Action>(
	reducers: ReducerMap<S, A>
): Rodux.Reducer<S, A>;
export = combineReducers;
