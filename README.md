<div align="center"><img src="https://assets.vorlias.com/i1/rodux-ts.png?v=3"/></div>
<h1 align="center">Rodux-TS</h1>
<div align="center">
	<a href="https://roblox.github.io/roact-rodux">
		<img src="https://img.shields.io/badge/docs-lua-purple.svg" alt="Documentation"></img>
	</a>
	<a href="https://github.com/roblox-ts/roblox-ts">
		<img src="https://img.shields.io/badge/github-roblox_typescript-red.svg" alt="roblox-ts"></img>
	</a>
	<a href="https://www.npmjs.com/package/@rbxts/roact-rodux">
		<img src="https://badge.fury.io/js/%40rbxts%2Frodux.svg"></img>
	</a>
</div>

<div align="center">
	A typescript port of <a href='https://github.com/Roblox/rodux'>Rodux</a>, the Rodux extension for Roact.
</div>

<div>&nbsp;</div>

## Installation
You can install it via `npm i @rbxts/rodux`.


## Using Thunk Middleware
if you decide to use the thunk middleware, you will have to explictly set the template argments when creating Rodux.Store, otherwise it will not type correctly.

Example:
```ts
import Rodux, { combineReducers, applyMiddleware } from "@rbxts/rodux";
import characterReducer, {
	ICharacterReducer,
	CharacterActions,
} from "./CharacterReducer";

export interface IStore {
	Character: ICharacterReducer;
}

export type StoreActions = CharacterActions;

const reducers = combineReducers<IStore, StoreActions>({
	Character: characterReducer,
});

const store = new Rodux.Store<IStore, StoreActions, Rodux.ThunkDispatch<IStore, {}, StoreActions>>(
	reducers,
	{},
	[Rodux.thunkMiddleware],
);
```

Explicitly defining the type for Rodux.thunkMiddleware will allow you to get the correct types for the store, otherwise it will be `Rodux.Store<any>`

If you also use `Rodux.loggerMiddleware` (or any other middleware) :

```ts
const store = new Rodux.Store<IStore, StoreActions, Rodux.ThunkDispatch<IStore, {}, StoreActions>, Rodux.Middleware>(
	reducers,
	{},
	[Rodux.thunkMiddleware, Rodux.loggerMiddleware],
);
```

## License
The original Rodux library's License can be found here: [Rodux License](https://github.com/Roblox/rodux/blob/master/LICENSE)
