'use client'
import React, {useState} from 'react';
import { TextField } from '@mui/material';
import {NumericFormat, PatternFormat} from "react-number-format";
import MaskedInput from "react-text-mask";

export default function Home() {
  const [value, setValue] = useState("")
  const [url, setUrl] = useState('')


  const handleBlur = () => {
    if (value && !/\.\d{2}$/.test(value)) {
      setValue(value + ".00");
    }
  }

  const handleFocus = () => {
    let updatedUrl = url;
    if (!url.includes('.com')) {
      updatedUrl += '.com';
    }
    setUrl(updatedUrl)
  }


  const handleChange = (event: any) => {
    setUrl(event.target.value)
  }

  const urlMask = [
    'https://',
    ...Array.from({ length: 30 }, () => /[a-z.]/),
  ]

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

       <MaskedInput
          value={url}
          onBlur={handleFocus}
          className='ml-6'
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
  );
}

