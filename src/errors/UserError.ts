class UserError extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'UserError';
        
        Object.setPrototypeOf(this, UserError.prototype);
    }
}

export default UserError;
