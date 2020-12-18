
const LogLevel: any = {
  Error: 1,
  Warn: 2,
  Info: 3,
  Debug: 4,
  Trace: 5
};

function toLogLevelNum(text?: string): number {
  const what: string = (text || 'info').toUpperCase();
  let res = LogLevel.Info;

  for (let key in LogLevel) {
    if (key.toUpperCase() === what) {
      res = LogLevel[key];
      break;
    }
  }
  return Math.max(LogLevel.Error, res);
}

const nodeEnv = typeof (process) !== 'undefined' ? process.env : undefined;
const HIDE_TIMESTAMP = nodeEnv && nodeEnv.HIDE_TIMESTAMP === 'hide';
const LOG_LEVEL = toLogLevelNum(nodeEnv && nodeEnv.LOG_LEVEL);

class Log {

  t(...rest: any[]) {
    if (!Log.canLog(LogLevel.Trace)) return;
    this.logLevel('T', rest);
  }

  d(...rest: any[]) {
    if (!Log.canLog(LogLevel.Debug)) return;
    this.logLevel('D', rest);
  }

  w(...rest: any[]) {
    if (!Log.canLog(LogLevel.Warn)) return;
    this.logLevel('W', rest);
  }

  i(...rest: any[]) {
    if (!Log.canLog(LogLevel.Info)) return;
    this.logLevel('I', rest);
  }

  e(...rest: any[]) {
    if (!Log.canLog(LogLevel.Error)) return;
    this.logLevel('E', rest);
  }

  private logLevel(level: string, args: any[]) {
    args.unshift(`[${level}]`);
    if (!HIDE_TIMESTAMP) {
      args.unshift(Log.dt());
    }
    console.log.apply(console, args);
  }

  private static canLog(level: number): boolean {
    const res = level <= LOG_LEVEL;
    return res;
  }

  private static dt() {
    return new Date().toISOString();
  }

}

export const log = new Log();
