class SessionError extends Error {
  constructor (message: string) {
      super(message);
      this.name = 'SessionError';
      
      Object.setPrototypeOf(this, SessionError.prototype);
  }
}

export default SessionError;
