import {ChainedPromiseEventEmitter} from "@frenchex/chained-promise-event-emitter-lib"
import * as log4js from "@log4js-node/log4js-api"
import {expect} from 'chai';
import 'mocha';

const builder = (): ChainedPromiseEventEmitter => {
    const logger: log4js.Logger = log4js.getLogger('test');
    return new ChainedPromiseEventEmitter(logger);
}

describe('ChainedPromiseEventEmitter', () => {
    it('can be instantiated', () => {
        try {
            const c = builder();
            expect(c instanceof ChainedPromiseEventEmitter, 'c instanceof ChainedPromiseEventEmitter');
        } catch (e) {
            throw e;
        }
    })

    it('can chain two promises', (done) => {
        const c = builder();

        let first: Date;
        let second: Date;
        let diff: number;

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
                diff = <any>second - <any>first;
                expect(diff > 0, 'first is ran before second')

                done();
            })
            .run()
        ;
    })

})
