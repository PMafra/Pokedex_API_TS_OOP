class ConflictError extends Error {
  constructor (message: string) {
      super(`Erro de conflito: ${message}`);
      this.name = 'ConflictError';
      
      Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export default ConflictError;
