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
		state: S,
		action: A,
	) => S;

	interface Dispatch<A extends Action = AnyAction> {
		<T extends A>(action: T): T;
	}

	type ReducersMapObject<S> = { [K in keyof S]: Reducer<S[K], any> };

	interface StoreChangedSignal<S> {
		connect(
			handler: (newState: Readonly<S>, oldState: Readonly<S>) => void,
		): void;
	}

	type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

	interface Dispatcher<A extends Action = AnyAction> {
		dispatch<T extends A>(this: {}, action: T): T;
	}

	interface ThunkDispatcher<S, A extends Action = AnyAction> {
		/**
		 * Thunk action
		 * @param action The action
		 */
		dispatch<R>(this: {}, action: (store: S) => R): R;
		/**
		 * Async thunk action
		 * @param action The action
		 */
		dispatch<R>(this: {}, action: (store: S) => Promise<R>): Promise<R>;
	}

	interface Store<S, A extends Action = AnyAction> extends Dispatcher<A> {
		getState(): S;
		changed: StoreChangedSignal<S>;
		destruct(): void;
		flush(): void;
	}

	type EnhancedStore<S, A extends Action, E = {}> = Store<S, A> & E;

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
			middleware?: [Middleware<Ext1, S>],
		): EnhancedStore<S, A, Ext1>;

		/**
		 * Create a store with two Middlewares
		 */
		new <S, A extends Action, Ext1, Ext2>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [Middleware<Ext1, S>, Middleware<Ext2, S>],
		): EnhancedStore<S, A, Ext1 & Ext2>;

		/**
		 * Create a store with three Middlewares
		 */
		new <S, A extends Action, Ext1, Ext2, Ext3>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [
				Middleware<Ext1, S>,
				Middleware<Ext2, S>,
				Middleware<Ext3, S>,
			],
		): EnhancedStore<S, A, Ext1 & Ext2 & Ext3>;

		/**
		 * Create a store with four Middlewares
		 */
		new <S, A extends Action, Ext1, Ext2, Ext3, Ext4>(
			reducer: Reducer<S, A>,
			preloadedState?: DeepPartial<S>,
			middleware?: [
				Middleware<Ext1, S>,
				Middleware<Ext2, S>,
				Middleware<Ext3, S>,
				Middleware<Ext4, S>,
			],
		): EnhancedStore<S, A, Ext1 & Ext2 & Ext3 & Ext4>;
	}

	const Store: StoreCreator;

	function combineReducers<S>(reducers: ReducersMapObject<S>): Reducer<S>;

	function combineReducers<S, A extends Action>(
		reducers: ReducersMapObject<S>,
	): Reducer<S, A>;

	/**
	 * Creates a reducer that handles actions under `actionHandlers`.
	 * Use the second overload for more explicit action handling
	 * @param value
	 * @param actionHandlers
	 */
	function createReducer<S, K extends keyof S>(
		value: S[K],
		actionHandlers: {
			[name: string]: (state: S[K], action: AnyAction) => S[K] | S;
		},
	): Reducer<S[K], AnyAction>;

	type ActionFromName<TActions, T extends string> = TActions extends { type: T } ? TActions : never;
	type ActionHandlers<V, A extends Action> = { [TType in A["type"]]: (reducerState: V, action: ActionFromName<A, TType>) => V };

	/**
	 * Creates a reducer that handles each action under `actionHandlers`.
	 *
	 * ```ts
	 * interface ExampleReducer {
	 * 	Example: Array<string>;
	 * }
	 * type TestActions = Action<"test">;
	 * const exampleReducer = Rodux.createReducer<
	 * 	ExampleReducer,
	 * 	"Example",
	 * 	TestActions
	 * >(["initialString"], {
	 * 	test: (state, action) => {
	 * 		return state;
	 * 	}
	 * })
	 * ```
	 *
	 * @param initialValue The initial value
	 * @param actionHandlers The action handlers
	 */
	function createReducer<S, K extends keyof S, A extends Action>(
		initialValue: S[K],
		actionHandlers: ActionHandlers<S[K], A>
	): Reducer<S[K], A>;

		/**
	 * Creates a reducer that handles each action under `actionHandlers`.
	 *
	 * ```ts
	 * interface ExampleReducer {
	 * 	Example: Array<string>;
	 * }
	 * type TestActions = Action<"test">;
	 * const exampleReducer = Rodux.createReducer<
	 * 	ExampleReducer["Example"],
	 * 	TestActions
	 * >(["initialString"], {
	 * 	test: (state, action) => {
	 * 		return state;
	 * 	}
	 * })
	 * ```
	 *
	 * @param initialValue The initial value
	 * @param actionHandlers The action handlers
	 */
	function createReducer<TValue, TAction extends Action>(
		initialValue: TValue,
		actionHandlers: ActionHandlers<TValue, TAction>,
	): Reducer<TValue, TAction>;

	// * Middleware *

	interface Middleware<DispatchExt = {}, S = any> {
		(nextDispatch: Dispatch<AnyAction>, store: S): (action: any) => any;
	}

	const loggerMiddleware: Middleware;

	// * THUNKS *

	interface ThunkAction<R, S, E, A extends Action> {
		(this: {}, dispatch: Rodux.Store<S, A>): R;
	}

	type ThunkMiddleware<
		S = {},
		A extends Action = AnyAction,
		E = undefined
	> = Middleware<ThunkDispatcher<EnhancedStore<S, A>, A>, S>;

	const thunkMiddleware: ThunkMiddleware;

	type DispatchParam<TStore> = TStore extends Rodux.EnhancedStore<
		infer S,
		infer A,
		infer E
	>
		? E extends ThunkDispatcher<any, any>
			? {
					(action: A): A;
					<R>(
						thunkAction: (store: Rodux.EnhancedStore<S, A, E>) => R,
					): R;
			  }
			: {
					(action: A): A;
			  }
		: TStore extends Rodux.Store<any, infer A>
		? {
				(action: A): A;
		  }
		: never;
}
