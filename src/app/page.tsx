'use client'
import React from 'react';
import { TextField } from '@mui/material';
import {NumericFormat, PatternFormat} from "react-number-format";
import MaskedInput from "react-text-mask";
import {useFormik} from "formik";

export default function Home() {
  const formik = useFormik({
    initialValues: {
      amount: '',
      count: '',
      phone: '',
      domain: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  })

  const handleBlur = () => {
    const { amount } = formik.values;
    if (amount && !/\.\d{2}$/.test(amount)) {
      formik.setFieldValue('amount', amount + '.00');
    }
  }

  const domainMask = [
    'https://',
    ...Array.from({ length: 30 }, () => /[a-z.]/),
  ]

  return (
     <div className="m-8">
       <h1 className="text-4xl font-bold">Form</h1>
       <form onSubmit={formik.handleSubmit}>
         <NumericFormat
            value={formik.values.amount}
            prefix="$"
            thousandSeparator
            customInput={TextField}
            label="Amount"
            onValueChange={({ value }) => formik.handleChange('amount')(value)}
            onBlur={handleBlur}
         />

         <NumericFormat
            value={formik.values.count}
            className="ml-6 mr-6"
            customInput={TextField}
            label="Count"
            thousandSeparator
            onValueChange={({ value }) => formik.handleChange('count')(value)}
         />

         <PatternFormat
            value={formik.values.phone}
            format="+1 (###) #### ###"
            customInput={TextField}
            label="Phone"
            onValueChange={({ value }) => formik.handleChange('phone')(value)}
         />

         <TextField
            className="ml-6 mr-6"
            label="Domain"
            value={formik.values.domain}
            onChange={formik.handleChange('domain')}
            InputProps={{
              inputComponent: MaskedInput as any,
              inputProps: {
                mask: domainMask,
              },
            }}
         />

         <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
         >
           Submit
         </button>
       </form>
     </div>
  )
}