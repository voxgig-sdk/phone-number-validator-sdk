"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberValidatorError = void 0;
class PhoneNumberValidatorError extends Error {
    isPhoneNumberValidatorError = true;
    sdk = 'PhoneNumberValidator';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.PhoneNumberValidatorError = PhoneNumberValidatorError;
//# sourceMappingURL=PhoneNumberValidatorError.js.map