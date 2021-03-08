import combineReducers from "./combineReducers";
import createReducer from "./createReducer";
import Store from "./Store";
import loggerMiddleware from "./loggerMiddleware";
import thunkMiddleware from "./thunkMiddleware";
import makeActionCreator from "./makeActionCreator";

declare namespace Rodux {
    export {
        createReducer,
        combineReducers,
        Store,
        loggerMiddleware,
        thunkMiddleware,
        makeActionCreator,
    }
}

// Store extras
declare namespace Rodux {
    interface StoreChangedSignal<S> {
        connect(
            handler: (newState: Readonly<S>, oldState: Readonly<S>) => void,
        ): void;
    }

    type EnhancedStore<S, A extends Rodux.Action, E = {}> = Store<S, A> & E;
}

declare type ActionFromName<TActions, T extends string> = TActions extends { type: T } ? TActions : never;

// Actions
declare namespace Rodux {
    /**
     * An action in Rodux
     */
    interface Action<T = string> {
		type: T;
    }
    
    /**
     * Any action
     */
    interface AnyAction extends Action {
		[extraProps: string]: unknown;
    }

	/**
     * An object of action handlers
     */
	type ActionHandlers<TState, TAction extends Action> = { [TType in TAction["type"]]: (reducerState: TState, action: ActionFromName<TAction, TType>) => TState };

    /**
     * An action creator, made with `Rodux.makeActionCreator`.
     */
    interface ActionCreator<TName extends string, TArgument extends unknown[], TActionProps> {
        name: TName;
        (...values: TArgument): TActionProps & Rodux.Action<TName>;
    }

    /**
     * Infers the action type from an action creator, e.g.
     * 
     * ```ts
     * const setFoo = Rodux.makeActionCreator("SetFoo", (value: string) => {
     *      return {
     *          value = value,
     *      }
     * });
     * 
     * interface SetFooAction extends Rodux.InferActionFromCreator<typeof setFoo> {}
     * // or
     * type SetFooAction = Rodux.InferActionFromCreator<typeof setFoo>;
     * ```
     */
    type InferActionFromCreator<T extends ActionCreator<string, any, any>> = T extends ActionCreator<infer N, any, infer P> ? Action<N> & P : never;
}

// Reducers
declare namespace Rodux {
    /**
     * A reducer
     */
	type Reducer<S, A extends Action = AnyAction> = (
		state: S,
		action: A,
	) => S;
}

// Dispatch
declare namespace Rodux {
	interface Dispatch<A extends Action = AnyAction> {
		<T extends A>(action: T): T;
    }

    interface Dispatcher<A extends Action = AnyAction> {
        dispatch<T extends A>(this: {}, action: T): T;
    }
}

// Middleware
declare namespace Rodux {
	interface Middleware<DispatchExt = {}, S = any> {
		(nextDispatch: Dispatch<AnyAction>, store: S): (action: any) => any;
    }
    
    interface ThunkAction<R, S, E, A extends Action> {
		(this: {}, dispatch: Rodux.Store<S, A>): R;
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

	type ThunkMiddleware<
		S = {},
		A extends Action = AnyAction,
		E = undefined
    > = Middleware<Rodux.ThunkDispatcher<Rodux.EnhancedStore<S, A>, A>, S>;
    
	type DispatchParam<TStore> = TStore extends Rodux.EnhancedStore<
		infer S,
		infer A,
		infer E
	>
		? E extends Rodux.ThunkDispatcher<any, any>
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

export = Rodux;