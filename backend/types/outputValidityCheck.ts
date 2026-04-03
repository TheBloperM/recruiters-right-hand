export interface OutputValidityCheck<T> {
  isValid: (data: T) => boolean;
  message: string;
  status: number;
}
