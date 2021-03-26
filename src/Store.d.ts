import Rodux from "./index";

type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

interface Store<S, A extends Rodux.Action = Rodux.AnyAction>
	extends Rodux.Dispatcher<A> {
	/**
	 * Gets the store's current state.
	 */
	getState(): Readonly<S>;
	/**
	 * A `Signal` that is fired when the store's state is changed up to once per frame.
	 */
	changed: Rodux.StoreChangedSignal<S>;
	/**
	 * Destroys the store, cleaning up its connections.
	 * 
	 * > Attempting to use the store after destruct has been called will cause problems.
	 */
	destruct(): void;
	/**
	 * Flushes the store's pending actions, firing the `changed` event if necessary.
	 * 
	 * > `flush` is called by Rodux automatically every frame and usually doesn't need to be called manually.
	 */
	flush(): void;
}

interface StoreCreator {
	/**
	 * Creates and returns a new Store.
	 * 
	 * @param reducer is the store's root reducer function, and is invoked whenever an action is dispatched. 
	 * 	It must be a pure function.
	 * @param initialState is the store's initial state. This should be used to load a saved state from storage.
	 * @param middleware A is a list of middleware to apply to the store.
	 * @param errorReporter A custom error handler
	 */
	new <S, A extends Rodux.Action = Rodux.AnyAction>(
		reducer: Rodux.Reducer<S, A>,
		initialState?: DeepPartial<S>,
		errorReporter?: Rodux.ErrorReporter<S, A>
	): Store<S, A>;

	new <S, A extends Rodux.Action, Ext1>(
		reducer: Rodux.Reducer<S, A>,
		initialState?: DeepPartial<S>,
		middleware?: [Rodux.Middleware<Ext1, S>],
		errorReporter?: Rodux.ErrorReporter<S, A>
	): Rodux.EnhancedStore<S, A, Ext1>;

	new <S, A extends Rodux.Action, Ext1, Ext2>(
		reducer: Rodux.Reducer<S, A>,
		initialState?: DeepPartial<S>,
		middleware?: [Rodux.Middleware<Ext1, S>, Rodux.Middleware<Ext2, S>],
		errorReporter?: Rodux.ErrorReporter<S, A>
	): Rodux.EnhancedStore<S, A, Ext1 & Ext2>;

	new <S, A extends Rodux.Action, Ext1, Ext2, Ext3>(
		reducer: Rodux.Reducer<S, A>,
		initialState?: DeepPartial<S>,
		middleware?: [
			Rodux.Middleware<Ext1, S>,
			Rodux.Middleware<Ext2, S>,
			Rodux.Middleware<Ext3, S>
		],
		errorReporter?: Rodux.ErrorReporter<S, A>
	): Rodux.EnhancedStore<S, A, Ext1 & Ext2 & Ext3>;

	new <S, A extends Rodux.Action, Ext1, Ext2, Ext3, Ext4>(
		reducer: Rodux.Reducer<S, A>,
		initialState?: DeepPartial<S>,
		middleware?: [
			Rodux.Middleware<Ext1, S>,
			Rodux.Middleware<Ext2, S>,
			Rodux.Middleware<Ext3, S>,
			Rodux.Middleware<Ext4, S>
		],
		errorReporter?: Rodux.ErrorReporter<S, A>
	): Rodux.EnhancedStore<S, A, Ext1 & Ext2 & Ext3 & Ext4>;
}

/**
 * The Store class is the core piece of Rodux. It is the state container that you create and use.
 */
declare const Store: StoreCreator;
export = Store;
