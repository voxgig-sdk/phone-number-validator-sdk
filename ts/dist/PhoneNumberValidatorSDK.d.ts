import { PhoneValidationEntity } from './entity/PhoneValidationEntity';
export type * from './PhoneNumberValidatorTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PhoneNumberValidatorEntityBase } from './PhoneNumberValidatorEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class PhoneNumberValidatorSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    PhoneValidation(entopts?: Record<string, any>): PhoneValidationEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PhoneNumberValidatorSDK;
    tester(testopts?: any, sdkopts?: any): PhoneNumberValidatorSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PhoneNumberValidatorSDK;
export { stdutil, config, BaseFeature, PhoneNumberValidatorEntityBase, PhoneNumberValidatorSDK, SDK, };
export type { DirectResult };
