export = Rodux;
export as namespace Rodux;

declare namespace Rodux {
	interface Action<T = string> {
		type: T;
	}

	interface AnyAction extends Action {
		[extraProps: string]: unknown;
	}

	type Reducer<S, A extends Action = AnyAction> = (
		state: S | undefined,
		action: A,
	) => S;

	interface Dispatch<A extends Action = AnyAction> {
		<T extends A>(action: T): T;
	}

	type ReducersMapObject<S> = { [K in keyof S]?: Reducer<S[K], any> };

	interface StoreChangedSignal<S> {
		connect(
			handler: (newState: Readonly<S>, oldState: Readonly<S>) => void,
		): void;
	}

	type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

	type DispatchFunction<A> = <T extends A>(action: T) => T;
	interface Dispatcher<A extends Action = AnyAction> {
		dispatch<T extends A>(action: T): T;
	}

	interface Store<S, A extends Action = AnyAction> extends Dispatcher<A> {
		getState(): S;
		changed: StoreChangedSignal<S>;
		destruct(): void;
		flush(): void;
	}

	type EnhancedStore<S, A extends Action = AnyAction, E = {}> = Store<S, A> &
		E;

	interface StoreCreator {
		new <S, A extends Action = AnyAction>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
		): Store<S, A>;

		/**
		 * Create a store with one Middleware
		 * @param middleware The middleware list
		 * @template M The Middleware
		 */
		new <S, A extends Action, M extends Middleware<M>>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [M],
		): EnhancedStore<S, A, MiddlewareFactory<S, M>>;

		/**
		 * Create a store with two middlewares
		 * @param reducer The root reducer
		 * @param preloadedState The preloaded state
		 * @param middleware The middleware list
		 * @template M0 The first Middleware
		 * @template M1 The second middleware
		 */
		new <
			S,
			A extends Action,
			M0 extends Middleware<M0>,
			M1 extends Middleware<M1>
		>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [M0, M1],
		): EnhancedStore<S, A, MiddlewareFactory<S, M0, M1>>;

		/**
		 * Create a store with three middlewares
		 * @param reducer The root reducer
		 * @param preloadedState The preloaded state
		 * @param middleware The middleware list
		 * @template M0 The first Middleware
		 * @template M1 The second middleware
		 * @template M2 The third middleware
		 */
		new <
			S,
			A extends Action,
			M0 extends Middleware<M0>,
			M1 extends Middleware<M1>,
			M2 extends Middleware<M2>
		>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [M0, M1, M2],
		): EnhancedStore<S, A, MiddlewareFactory<S, M0, M1, M2>>;

		/**
		 * Create a store with three middlewares
		 * @param reducer The root reducer
		 * @param preloadedState The preloaded state
		 * @param middleware The middleware list
		 * @template M0 The first Middleware
		 * @template M1 The second middleware
		 * @template M2 The third middleware
		 * @template M3 The fourth middleware
		 */
		new <
			S,
			A extends Action,
			M0 extends Middleware<M0>,
			M1 extends Middleware<M1>,
			M2 extends Middleware<M2>,
			M3 extends Middleware<M3>
		>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [M0, M1, M2, M3],
		): EnhancedStore<S, A, MiddlewareFactory<S, M0, M1, M2, M3>>;

		/**
		 * Create a store with three middlewares
		 * @param reducer The root reducer
		 * @param preloadedState The preloaded state
		 * @param middleware The middleware list
		 * @template M0 The first Middleware
		 * @template M1 The second middleware
		 * @template M2 The third middleware
		 * @template M3 The fourth middleware
		 * @template M4 The fifth middleware
		 */
		new <
			S,
			A extends Action,
			M0 extends Middleware<M0>,
			M1 extends Middleware<M1>,
			M2 extends Middleware<M2>,
			M3 extends Middleware<M3>,
			M4 extends Middleware<M4>
		>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [M0, M1, M2, M3, M4],
		): EnhancedStore<S, A, MiddlewareFactory<S, M0, M1, M2, M3, M4>>;
	}

	const Store: StoreCreator;

	function combineReducers<S>(reducers: ReducersMapObject<S>): Reducer<S>;

	function combineReducers<S, A extends Action>(
		reducers: ReducersMapObject<S>,
	): Reducer<S, A>;

	function createReducer<S, K extends keyof S>(
		value: S[K],
		actionHandlers: {
			[name: string]: (state: S, action: AnyAction) => S[K] | S;
		},
	): Reducer<S[K], AnyAction>;

	function createReducer<S, K extends keyof S, A extends Action>(
		value: S[K],
		actionHandlers: { [name: string]: (state: S, action: A) => S[K] | S },
	): Reducer<S[K], A>;

	interface LoggerMiddleware extends Middleware<LoggerMiddleware> {}

	// Logger Middleware
	const loggerMiddleware: LoggerMiddleware;

	// Thunk Middleware
	type StoreThunk<S> = (store: S) => void;

	interface ThunkMiddleware extends Middleware<ThunkMiddleware> {
		dispatch<S extends Rodux.Store<any>>(thunk: StoreThunk<S>): void;
	}

	interface Middleware<M> {}

	type MiddlewareFactory<
		S,
		A,
		B = undefined,
		C = undefined,
		D = undefined,
		E = undefined
	> = E extends Middleware<E>
		? A & B & C & D & E
		: D extends Middleware<D>
		? A & B & C & D
		: C extends Middleware<C>
		? A & B & C
		: B extends Middleware<B>
		? A & B
		: A extends Middleware<A>
		? A
		: {};

	const thunkMiddleware: ThunkMiddleware;
}

type ThunkAction<R, S, A extends Rodux.Action> = (
	dispatch: Rodux.Store<S>,
) => R;

interface ThunkDispatch<S, A extends Rodux.Action> extends Rodux.Dispatcher<A> {
	<R>(thunkAction: ThunkAction<R, S, A>): R;
}
