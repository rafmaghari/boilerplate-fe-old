export class UnauthorizedError extends Error {
    statusCode = 401

    constructor(message: string) {
        super(message)

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }

    getErrorMessage() {
        return 'Something went wrong: ' + this.message
    }
}
