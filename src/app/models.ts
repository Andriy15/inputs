export interface CustomPropsNumber {
  onChange: (event: { target: { name: string; value: number } }) => void;
  name: string;
}

export interface CustomPropsAmount {
  onChange: (event: { target: { name: string; value: number } }) => void;
  name: string;
  value: string;
}

export interface CustomPropsString {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export enum Fields {
  amount = 'amount',
  count = 'count',
  domain = 'domain',
  phone = 'phone',
}

export const FORM_FIELDS = {
  [Fields.amount]: 'Amount',
  [Fields.count]: 'Count',
  [Fields.domain]: 'Domain',
  [Fields.phone]: 'Phone',
}

export const ErrorMessages = {
  required: 'This field is required',
  min: ({ min }: { min: number }) => `Minimum numbers is ${min}`
}



