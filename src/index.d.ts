import combineReducers from "./combineReducers";
import createReducer from "./createReducer";
import Store from "./Store";
import makeActionCreator from "./makeActionCreator";

/**
 * The `Rodux` library for Roblox
 */
declare namespace Rodux {
	export {
		createReducer,
		combineReducers,
		Store,
		makeActionCreator,
	};
}

declare namespace Rodux {
	/**
	 * A middleware that logs actions and the new state that results from them.
	 *
	 * `loggerMiddleware` is useful for getting a quick look at what actions are being dispatched.
	 * In the future, Rodux will have tools similar to [Redux's DevTools](https://github.com/gaearon/redux-devtools).
	 */
	export const loggerMiddleware: Rodux.Middleware;

	/**
	 * A middleware that allows thunks to be dispatched.
	 * Thunks are functions that perform asynchronous tasks or side effects, and can dispatch actions.
	 *
	 * `thunkMiddleware` is comparable to Redux's [redux-thunk](https://github.com/gaearon/redux-thunk).
	 */
	export const thunkMiddleware: Rodux.ThunkMiddleware;
}

// Error Reporting (v3.0)
declare namespace Rodux {
	export interface ErrorResult {
		message: string;
		thrownValue: unknown;
	}

	type ErrorReporterCallback<S, A> = (
		prevState: Readonly<S>,
		action: Rodux.Action<A>,
		errorResult: ErrorResult
	) => void;

	/**
	 * An error reporter for a Rodux store
	 *
	 * https://github.com/Roblox/rodux/pull/60
	 * @version 3.0
	 */
	export interface ErrorReporter<S, A> {
		reportReducerError: ErrorReporterCallback<S, A>;
		reportUpdateError: ErrorReporterCallback<S, A>;
	}
}

// Store extras
declare namespace Rodux {
	interface Signal {
		disconnect(): void;
	}
	interface StoreChangedSignal<S> {
		connect(
			handler: (newState: Readonly<S>, oldState: Readonly<S>) => void
		): Signal;
	}

	type EnhancedStore<S, A extends Rodux.Action, E = {}> = Store<S, A> & E;
}

declare type ActionFromName<TActions, T extends string> = TActions extends {
	type: T;
}
	? TActions
	: never;

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
	type ActionHandlers<TState, TAction extends Action> = {
		[TType in TAction["type"]]: (
			reducerState: TState,
			action: ActionFromName<TAction, TType>
		) => TState;
	};

	/**
	 * An action creator, made with `Rodux.makeActionCreator`.
	 */
	interface ActionCreator<
		TName extends string,
		TArgument extends unknown[],
		TActionProps
	> {
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
	type InferActionFromCreator<
		T extends ActionCreator<string, any, any>
	> = T extends ActionCreator<infer N, any, infer P> ? Action<N> & P : never;
}

// Reducers
declare namespace Rodux {
	/**
	 * A reducer
	 */
	type Reducer<S, A extends Action = AnyAction> = (state: S, action: A) => S;
}

// Dispatch
declare namespace Rodux {
	interface Dispatch<A extends Action = AnyAction> {
		<T extends A>(action: T): T;
	}

	interface Dispatcher<A extends Action = AnyAction> {
		/**
		 * Dispatches an action. The action will travel through all of the store's middlewares before reaching the store's reducer.
		 *
		 * Unless handled by middleware, `action` must contain a type field to indicate what type of action it is. No other fields are required.
		 */
		dispatch<T extends A>(this: {}, action: T): T;
	}
}

// Middleware
declare namespace Rodux {
	interface Middleware<DispatchExt = {}, S = any> {
		(nextDispatch: Dispatch<AnyAction>, store: S): (action: any) => any;
	}

	interface ThunkAction<R, S, E, A extends Action> {
		(this: void, dispatch: Rodux.Store<S, A>): R;
	}

	interface ThunkDispatcher<S, A extends Action = AnyAction> {
		/**
		 * Thunk action
		 * @param action The action
		 */
		dispatch<R>(this: {}, action: (store: Store<S,A>) => R): R;
		/**
		 * Async thunk action
		 * @param action The action
		 */
		dispatch<R>(this: {}, action: (store: Store<S,A>) => Promise<R>): Promise<R>;
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
					<R>(thunkAction: (store: Rodux.EnhancedStore<S, A, E>) => R): R;
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
