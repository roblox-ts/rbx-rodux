export = Rodux;
export as namespace Rodux;

declare namespace Rodux {
	export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
		dispatch: D;
		getState(): S;
	}

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

	interface StoreChangedSignal<S> {
		connect(
			handler: (oldState: Readonly<S>, newState: Readonly<S>) => void,
		): void;
	}

	type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

	interface Store<S = any, A extends Action = AnyAction> {
		// dispatch<T extends A>(action: T): T;
		getState(): S;
		changed: StoreChangedSignal<S>;
		destruct(): void;
		flush(): void;
	}

	interface Middleware {
		dispatch<A extends Action = AnyAction>(action: A): A;
	}

	interface StoreCreator {
		new <S, A extends Action = AnyAction>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
		): Store<S, A>;
		new <
			S,
			A extends Action = AnyAction,
			B extends Middleware = Middleware
		>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: B[],
		): Store<S, A> & B;
	}

	const Store: StoreCreator;

	function combineReducers<S>(
		reducers: ReducersMapObject<S, any>,
	): Reducer<S>;

	function combineReducers<S, A extends Action = AnyAction>(
		reducers: ReducersMapObject<S, A>,
	): Reducer<S, A>;

	function createReducer<S, K extends keyof S, A extends Action = AnyAction>(
		value: S[K],
		actionHandlers: { [name: string]: (state: S, action: A) => S[K] | S },
	): Reducer<S[K], A>;

	// Logger Middleware
	const loggerMiddleware: Middleware;

	// Thunk Middleware

	interface ThunkMiddleware extends Middleware {
		dispatch<A extends Action = AnyAction>(action: A): A;
		dispatch<R, S, A extends Action = AnyAction>(
			thunkAction: ThunkAction<R, S, A>,
		): R;
	}

	const thunkMiddleware: ThunkMiddleware;
}

type ThunkAction<R, S, A extends Rodux.Action> = (
	dispatch: { dispatch: ThunkDispatch<S, A> } & Rodux.Store<any>,
) => R;

interface ThunkDispatch<S, A extends Rodux.Action> {
	<T extends A>(action: T): T;
	<R>(thunkAction: ThunkAction<R, S, A>): R;
}
