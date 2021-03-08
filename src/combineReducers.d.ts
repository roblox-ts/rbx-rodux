import Rodux from "./index";
type ReducerMap<S> = { [K in keyof S]: Rodux.Reducer<S[K], any> };
declare function combineReducers<S>(reducers: ReducerMap<S>): Rodux.Reducer<S>;
declare function combineReducers<S, A extends Rodux.Action>(
    reducers: ReducerMap<S>,
): Rodux.Reducer<S, A>;
export = combineReducers;