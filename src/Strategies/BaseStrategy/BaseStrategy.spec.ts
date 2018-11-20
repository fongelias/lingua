import * as assert from 'assert';
import * as EventEmitter from 'events';

import {
    IProcessed,
    IPreProcessed,
    IStrategy
} from '../../';

import { BaseStrategy } from './BaseStrategy';


describe('class BaseStrategy', () => {
    describe('#execute', () => {
        it('should transform an IPreProcessed to an IProcessed', () => {
            const strategy: IStrategy  = new BaseStrategy();
            const preProcessed: IPreProcessed = {
                isPreProcessed: () => true,
                data: "someString",
            }
            assert(strategy.execute(preProcessed).isProcessed());
        })
    });
});