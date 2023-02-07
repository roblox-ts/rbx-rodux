import Rodux from "./index";

interface LoggerMiddleware {
    middleware: Rodux.Middleware;
    outputFunction: (outputString: string) => void;
}

declare const LoggerMiddleware: LoggerMiddleware

export = LoggerMiddleware
