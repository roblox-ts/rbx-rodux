import Rodux from "./index";

type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

interface Store<S, A extends Rodux.Action = Rodux.AnyAction> extends Rodux.Dispatcher<A> {
    getState(): S;
    changed: Rodux.StoreChangedSignal<S>;
    destruct(): void;
    flush(): void;
}

interface StoreCreator {
    new <S, A extends Rodux.Action = Rodux.AnyAction>(
        reducer: Rodux.Reducer<S, A>,
        preloadedState?: DeepPartial<S>,
    ): Store<S, A>;

    /**
     * Create a store with one Middleware
     * @param middleware The middleware list
     */
    new <S, A extends Rodux.Action, Ext1>(
        reducer: Rodux.Reducer<S, A>,
        preloadedState?: DeepPartial<S>,
        middleware?: [Rodux.Middleware<Ext1, S>],
    ): Rodux.EnhancedStore<S, A, Ext1>;

    /**
     * Create a store with two Middlewares
     */
    new <S, A extends Rodux.Action, Ext1, Ext2>(
        reducer: Rodux.Reducer<S, A>,
        preloadedState?: DeepPartial<S>,
        middleware?: [Rodux.Middleware<Ext1, S>, Rodux.Middleware<Ext2, S>],
    ): Rodux.EnhancedStore<S, A, Ext1 & Ext2>;

    /**
     * Create a store with three Middlewares
     */
    new <S, A extends Rodux.Action, Ext1, Ext2, Ext3>(
        reducer: Rodux.Reducer<S, A>,
        preloadedState?: DeepPartial<S>,
        middleware?: [
            Rodux.Middleware<Ext1, S>,
            Rodux.Middleware<Ext2, S>,
            Rodux.Middleware<Ext3, S>,
        ],
    ): Rodux.EnhancedStore<S, A, Ext1 & Ext2 & Ext3>;

    /**
     * Create a store with four Middlewares
     */
    new <S, A extends Rodux.Action, Ext1, Ext2, Ext3, Ext4>(
        reducer: Rodux.Reducer<S, A>,
        preloadedState?: DeepPartial<S>,
        middleware?: [
            Rodux.Middleware<Ext1, S>,
            Rodux.Middleware<Ext2, S>,
            Rodux.Middleware<Ext3, S>,
            Rodux.Middleware<Ext4, S>,
        ],
    ): Rodux.EnhancedStore<S, A, Ext1 & Ext2 & Ext3 & Ext4>;
}

declare const Store: StoreCreator;
export = Store;