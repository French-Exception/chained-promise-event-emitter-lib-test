"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chained_promise_event_emitter_lib_1 = require("@frenchex/chained-promise-event-emitter-lib");
const log4js = require("@log4js-node/log4js-api");
const chai_1 = require("chai");
require("mocha");
const builder = () => {
    const logger = log4js.getLogger('test');
    return new chained_promise_event_emitter_lib_1.ChainedPromiseEventEmitter(logger);
};
describe('ChainedPromiseEventEmitter', () => {
    it('can be instantiated', () => {
        try {
            const c = builder();
            chai_1.expect(c instanceof chained_promise_event_emitter_lib_1.ChainedPromiseEventEmitter, 'c instanceof ChainedPromiseEventEmitter');
        }
        catch (e) {
            throw e;
        }
    });
    it('can chain two promises', (done) => {
        const c = builder();
        let first;
        let second;
        let diff;
        c
            .chain('first', (resolve, reject) => {
            first = new Date();
            resolve();
        })
            .chain('second', (resolve, reject) => {
            second = new Date();
            resolve();
        })
            .chain('run', (resolve, reject) => {
            diff = second - first;
            chai_1.expect(diff > 0, 'first is ran before second');
            done();
        })
            .run();
    });
});
//# sourceMappingURL=ConstructorTest.js.map