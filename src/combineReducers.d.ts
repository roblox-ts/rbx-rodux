import Rodux from "./index";
type ReducerMap<S, A extends Rodux.Action> = { [K in keyof S]: Rodux.Reducer<S[K], A> };
declare function combineReducers<S, A extends Rodux.Action>(
    reducers: ReducerMap<S, A>,
): Rodux.Reducer<S, A>;
export = combineReducers;