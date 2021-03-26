import Rodux from "./index";

declare function makeActionCreator<
	TName extends string,
	TParams extends unknown[],
	TActionProps extends Record<string, {}>
>(
	name: TName,
	actionGeneratorFunction: (...args: TParams) => TActionProps
): Rodux.ActionCreator<TName, TParams, TActionProps>;
export = makeActionCreator;
