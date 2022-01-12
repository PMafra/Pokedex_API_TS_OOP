export interface Encrypter {
    encrypt (value: string): string;
    compare (value: string, compareValue: string): boolean;
  }