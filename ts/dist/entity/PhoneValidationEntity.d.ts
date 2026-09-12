import { PhoneNumberValidatorEntityBase } from '../PhoneNumberValidatorEntityBase';
import type { PhoneNumberValidatorSDK } from '../PhoneNumberValidatorSDK';
import type { Control } from '../types';
import type { PhoneValidation, PhoneValidationLoadMatch } from '../PhoneNumberValidatorTypes';
declare class PhoneValidationEntity extends PhoneNumberValidatorEntityBase<PhoneValidation> {
    constructor(client: PhoneNumberValidatorSDK, entopts: any);
    make(this: PhoneValidationEntity): PhoneValidationEntity;
    load(this: any, reqmatch?: PhoneValidationLoadMatch, ctrl?: Control): Promise<PhoneValidationEntity>;
}
export { PhoneValidationEntity };
