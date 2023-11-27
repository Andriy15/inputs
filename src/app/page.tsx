'use client'
import React from 'react';
import { TextField } from '@mui/material';
import {NumericFormat, PatternFormat} from "react-number-format";
import {IMaskInput} from "react-imask";
import MaskedInput from "react-text-mask";
import InputMask from "react-input-mask";

export default function Home() {
  const [value, setValue] = React.useState("");

  const handleBlur = () => {
    if (value && !/\.\d{2}$/.test(value)) {
      setValue(value + ".00");
    }
  }

  const [url, setUrl] = React.useState('');

  const handleChange = (event: any) => {
    setUrl(event.target.value);
  };

  const urlMask = [
    'https://',
    /[a-z]/,
    /[a-z]/,
    /[a-z]/,
    /[a-z]/,
    /[a-z]/,
    /[a-z]/,
    /[a-z]/,
    /[a-z]/,
    /[a-z]/,
    '.com'
  ];

  return (
     <div className="m-8">
       <NumericFormat
          value={value}
          prefix="$"
          thousandSeparator
          customInput={TextField}
          label="Amount"
          onValueChange={({ value }) => setValue(value)}
          onBlur={handleBlur}
       />

       <NumericFormat
          className='ml-6 mr-6'
          customInput={TextField}
          label="Count"
          thousandSeparator
       />

       <PatternFormat
          format="+1 (###) #### ###"
          customInput={TextField}
          label="Phone"
       />

       <div className="m-8">
         <MaskedInput
            onChange={handleChange}
            mask={urlMask}
            guide={false}
            render={(ref, props) => (
               <TextField
                  inputRef={ref}
                  {...props}
                  label="Domain"
                  variant="outlined"
               />
            )}
         />
       </div>
     </div>
  );
}

