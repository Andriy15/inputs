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

export interface Data {
  amount: number;
  count: number;
  domain: string;
  phone: string;
}

export interface FormData {
  amount: number;
  count: number;
  domain: string;
  phone: string;
  id: string;
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

export const REGEX_PATTERNS = {
  [Fields.phone]: /^(1|380)\d*$/,
}

export const ErrorMessages = {
  required: 'This field is required',
  min: ({ min }: { min: number }) => `Minimum numbers is ${min}`,
  format: 'Country code is not supported. Supported country codes: +380, +1'
}




