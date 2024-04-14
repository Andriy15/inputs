'use client'
import { TextField } from '@mui/material';
import {useFormik} from "formik";
import {NumericFormatCustomAmount} from "@/app/HOCs/CustomAmount";
import {NumericFormatCustomCount} from "@/app/HOCs/CustomCount";
import {DomainInputCustom} from "@/app/HOCs/CustomDomain";
import {PhoneNumberInput} from "@/app/HOCs/CustomPhoneNumber";

export default function Home() {
  const formik= useFormik({
    initialValues: {
      amount: '',
      count: '',
      domain: '',
      phone: '',
    },
    onSubmit: (values) => {
      console.log({...values})
    }
  })

  return (
     <div className="m-8">
       <h1 className="text-4xl font-bold">Form</h1>
       <form onSubmit={formik.handleSubmit}>
         <TextField
            className="ml-6 mr-6"
            label="Amount"
            value={formik.values.amount}
            name='amount'
            onChange={formik.handleChange('amount')}
            InputProps={{
              inputComponent: NumericFormatCustomAmount as any,
            }}
         />

         <TextField
            className="ml-6 mr-6"
            label="Count"
            value={formik.values.count}
            onChange={formik.handleChange('count')}
            name='count'
            InputProps={{
              inputComponent: NumericFormatCustomCount as any,
            }}
         />

         <TextField
            className="ml-6 mr-6"
            label="Domain"
            value={formik.values.domain}
            onChange={formik.handleChange('domain')}
            name='domain'
            InputProps={{
              inputComponent: DomainInputCustom as any
            }}
         />

         <TextField
            className="ml-6 mr-6"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange('phone')}
            name='phone'
            InputProps={{
              inputComponent: PhoneNumberInput as any,
            }}
         />

         <div>Amount: {formik.values.amount}</div>
         <div>Count: {formik.values.count}</div>
         <div>Domain: {formik.values.domain}</div>
         <div>Phone: {formik.values.phone}</div>
       </form>
     </div>
  )
}