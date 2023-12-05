export interface CustomPropsNumber {
  onChange: (event: { target: { name: string; value: number } }) => void;
  name: string;
}

export interface CustomPropsAmount {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export interface CustomPropsString {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}