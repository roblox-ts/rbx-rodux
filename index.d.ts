export = Rodux;
export as namespace Rodux;

declare namespace Rodux {
	interface Action<T = any> {
		type: T;
	}

	interface AnyAction extends Action {
		[extraProps: string]: any;
	}

	type Reducer<S = any, A extends Action = AnyAction> = (
		state: S | undefined,
		action: A,
	) => S;

	interface Dispatch<A extends Action = AnyAction> {
		<T extends A>(action: T): T;
	}

	type ReducersMapObject<S = any, A extends Action = Action> = {
		[K in keyof S]?: Reducer<S[K], A>
	};

	class Store<S = any, A extends Action = AnyAction> {
		constructor(reducer: Reducer<S>, initialState?: S, middleware?: any);
		public getState(): S;
		public dispatch<T extends A>(action: T): T;
	}

	function combineReducers<S>(
		reducers: ReducersMapObject<S, any>,
	): Reducer<S>;

	function combineReducers<S, A extends Action = AnyAction>(
		reducers: ReducersMapObject<S, A>,
	): Reducer<S, A>;

	function createReducer<S, K extends keyof S, A extends Action = AnyAction>(
		value: S[K],
		reducerHandlers: { [key in K]: (state: S, action: A) => S[K] },
	): Reducer<S[K], A>;
}
