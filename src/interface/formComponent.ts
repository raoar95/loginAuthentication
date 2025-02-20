export interface IInput {
  key?: number;
  type: string;
  id?: string;
  name?: string;
  labelName?: string;
  class?: string;
  placeholder: string;
  value?: string;
  autoFocus?: boolean;
  required: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMsg?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ISubmit {
  id?: string;
  class?: string;
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
}
