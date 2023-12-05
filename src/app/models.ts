import React from "react";

export interface CustomPropsNumber {
  onChange: (event: { target: { name: string; value: number } }) => void;
  name: string;
}

export interface CustomPropsAmount {
    onChange: (event: { target: { name: string; value: number } }) => void;
    name: string;
}

export interface CustomPropsString {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export interface PhoneNumber {
  isValid(): boolean;
  getNumber(format?: "international" | "national" | "rfc3966" | "e164"): string;
}

export interface PhoneInputProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


