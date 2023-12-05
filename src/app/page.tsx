'use client'
import React, {useState} from 'react'
import { TextField } from '@mui/material';
import {useFormik} from "formik";
import {NumericFormatCustomAmount} from "@/app/HOCs/CustomAmount";
import {NumericFormatCustomCount} from "@/app/HOCs/CustomCount";
import {MaskedInputCustom} from "@/app/HOCs/CustomDomain";


export default function Home() {
  const [amount, setAmount] = useState('')
  const formik= useFormik({
    initialValues: {
      amount: '',
      count: '',
      domain: '',
    },
    onSubmit: (values) => {
      console.log({...values})
    }
  })

  const handleBlur = () => {
    const { amount } = formik.values
    if (amount && !/\.\d{1,}$/.test(amount.toString())) {
      formik.setFieldValue('amount', amount + '.00')
      setAmount(amount + '.00')
    }
  }


  return (
     <div className="m-8">
       <h1 className="text-4xl font-bold">Form</h1>
       <form onSubmit={formik.handleSubmit}>
         <TextField
            className="ml-6 mr-6"
            label="Amount"
            value={amount}
            onBlur={handleBlur}
            onChange={formik.handleChange('amount')}
            InputProps={{
              inputComponent: NumericFormatCustomAmount as any,
              inputProps: {
                name: 'amount',
              },
            }}
         />

         <TextField
            className="ml-6 mr-6"
            label="Count"
            value={formik.values.count}
            onChange={formik.handleChange('count')}
            InputProps={{
              inputComponent: NumericFormatCustomCount as any,
              inputProps: {
                name: 'count',
              },
            }}
         />

         <TextField
            className="ml-6 mr-6"
            label="Domain"
            value={formik.values.domain}
            onChange={formik.handleChange('domain')}
            InputProps={{
              inputComponent: MaskedInputCustom as any,
              inputProps: {
                name: 'domain',
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