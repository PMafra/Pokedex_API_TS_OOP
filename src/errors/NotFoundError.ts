class NotFoundError extends Error {
  constructor (message: string) {
      super(`Erro! Não encontrado: ${message}`);
      this.name = 'NotFoundError';
      
      Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
