import {Logger} from '../core/logger';

export class LoggerProvider implements Logger {
    error(...message: unknown[]): void {
        console.log.apply(this, message);
    }
}
