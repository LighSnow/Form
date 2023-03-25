export interface FormElement {
  id: string;
  element: HTMLInputElement;
  errorText: string;
  required: boolean;
  error: HTMLSpanElement;
  validation: (value: string) => boolean;
}

export interface InputData {
  type: string;
  id: string;
  placeholder: string;
  required: boolean;
  validation(value: string): boolean;
  errorText: string;
}
