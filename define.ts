
function define(
  name: string,
  deps: string[],
  callback: (...rest: any[]) => void
) {
  "use strict";

  const [reqName, expName, ...otherNames] = deps;
  const depInj = dep();
  const otherDeps = depInj.getAll(otherNames);
  const exp: any = {};
  const inj = [
    depInj.get.bind(depInj),
    exp,
    ...otherDeps
  ];

  callback.apply(null, inj);

  depInj.add(name, exp);
}

function dep(): Dep {
  "use strict";

  if (!module || !module.exports) throw new Error('No module.exports in scope');
  if (module.exports.dep) return module.exports.dep;

  class DepExp implements Dep {
    private _modules: any = {};
    add(name: string, exports: any): void {
      if (!this._modules[name])
        this._modules[name] = exports;
    }
    get(name: string): any {
      let res = this._modules[name];
      if (!res) res = require(name); // NodeJs module
      if (!res) console.error(`Missing module ${name}`);
      return res;
    }
    getAll(moduleNames: string[]): any[] {
      let res: any[] = [];
      for (let name of moduleNames) {
        res.push(this.get(name));
      }
      return res;
    }
  }

  return module.exports.dep = new DepExp();
}

interface Dep {
  add(name: string, exports: any): void;
  get(name: string): any;
  getAll(moduleNames: string[]): any[];
}
