"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloAsServiceError = void 0;
class HelloAsServiceError extends Error {
    isHelloAsServiceError = true;
    sdk = 'HelloAsService';
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
exports.HelloAsServiceError = HelloAsServiceError;
//# sourceMappingURL=HelloAsServiceError.js.map