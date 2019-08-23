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
		 */
		new <S, A extends Action, Ext1>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [Middleware<Ext1, S, any>],
		): EnhancedStore<S, A, { dispatch: Ext1 }>;

		/**
		 * Create a store with two Middlewares
		 */
		new <S, A extends Action, Ext1, Ext2>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [Middleware<Ext1, S, any>, Middleware<Ext2, S, any>],
		): EnhancedStore<S, A, { dispatch: Ext1 & Ext2 }>;

		/**
		 * Create a store with three Middlewares
		 */
		new <S, A extends Action, Ext1, Ext2, Ext3>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [
				Middleware<Ext1, S, any>,
				Middleware<Ext2, S, any>,
				Middleware<Ext3, S, any>
			],
		): EnhancedStore<S, A, { dispatch: Ext1 & Ext2 & Ext3 }>;

		/**
		 * Create a store with three Middlewares
		 */
		new <S, A extends Action, Ext1, Ext2, Ext3, Ext4>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [
				Middleware<Ext1, S, any>,
				Middleware<Ext2, S, any>,
				Middleware<Ext3, S, any>,
				Middleware<Ext4, S, any>
			],
		): EnhancedStore<S, A, { dispatch: Ext1 & Ext2 & Ext3 & Ext4 }>;
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

	// * Middleware *

	interface Middleware<
		DispatchExt = {},
		S = any,
		D extends Dispatch = Dispatch
	> {
		(nextDispatch: Dispatch<AnyAction>, store: S): (action: any) => any;
	}

	const loggerMiddleware: Middleware;

	// * THUNKS *

	interface ThunkAction<R, S, E, A extends Action> {
		(dispatch: Rodux.Store<S, A>): R;
	}

	interface ThunkExt {
		dispatch<A extends Action, S, E, R extends Action<any>>(
			asyncAction: (store: S) => void,
		): R;
	}

	interface ThunkDispatch<S, E, A extends Action> {
		<T extends A>(action: T): T;
		<R>(asyncAction: ThunkAction<R, S, E, A>): R;
	}

	type ThunkMiddleware<
		S = {},
		A extends Action = AnyAction,
		E = undefined
	> = Middleware<
		ThunkDispatch<Store<S>, E, A>,
		S,
		ThunkDispatch<Store<S>, E, A>
	>;

	const thunkMiddleware: ThunkMiddleware;
}
