class UnknownError extends Error {
  constructor (message: string) {
      super(`Erro desconhecido: ${message}`);
      this.name = 'UnknownError';
      
      Object.setPrototypeOf(this, UnknownError.prototype);
  }
}

export default UnknownError;
