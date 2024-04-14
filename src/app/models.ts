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



