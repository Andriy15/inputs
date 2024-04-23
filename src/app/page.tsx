'use client'
import {TextField} from '@mui/material';
import {useFormik} from "formik";
import {NumericFormatCustomAmount} from "@/app/HOCs/CustomAmount";
import {NumericFormatCustomCount} from "@/app/HOCs/CustomCount";
import {DomainInputCustom} from "@/app/HOCs/CustomDomain";
import {PhoneNumberInput} from "@/app/HOCs/CustomPhoneNumber";
import {fieldsSchema} from "@/app/schema";
import {FORM_FIELDS} from "@/app/models";
import {Fields} from "@/app/models";
import {getError} from "@/app/getErrors";
import {useState} from "react";

export default function Home() {
  const [submittedData, setSubmittedData] = useState({
    amount: '',
    count: '',
    domain: '',
    phone: '',
  })

  const formik = useFormik({
    initialValues: {
      amount: '',
      count: '',
      domain: '',
      phone: '',
    },
    validationSchema: fieldsSchema,
    onSubmit: (values) => {
      console.log({...values})
      setSubmittedData({...values})
    }
  })

  return (
     <div className="m-8">
       <h1 className="text-4xl font-bold mb-4">Form</h1>
       <form onSubmit={formik.handleSubmit} className="space-y-4">
         <TextField
            error={!!formik.errors.amount}
            className="w-full"
            label={FORM_FIELDS[Fields.amount]}
            helperText={getError(Fields.amount, formik.errors)}
            value={formik.values.amount}
            name='amount'
            onChange={formik.handleChange(Fields.amount)}
            InputProps={{
              inputComponent: NumericFormatCustomAmount as any,
            }}
         />

         {formik.errors.domain && <div className="text-red-500">{formik.errors.amount}</div>}


         <TextField
            error={!!formik.errors.count}
            helperText={getError(Fields.count, formik.errors)}
            className="w-full"
            label={FORM_FIELDS[Fields.count]}
            value={formik.values.count}
            onChange={formik.handleChange(Fields.count)}
            name='count'
            InputProps={{
              inputComponent: NumericFormatCustomCount as any,
            }}
         />

         {formik.errors.domain && <div className="text-red-500">{formik.errors.count}</div>}


         <TextField
            error={!!formik.errors.domain}
            helperText={getError(Fields.domain, formik.errors)}
            className="w-full"
            label={FORM_FIELDS[Fields.domain]}
            value={formik.values.domain}
            onChange={formik.handleChange(Fields.domain)}
            name='domain'
            InputProps={{
              inputComponent: DomainInputCustom as any
            }}
         />

         {formik.errors.domain && <div className="text-red-500">{formik.errors.domain}</div>}

         <TextField
            error={!!formik.errors.phone}
            helperText={getError(Fields.phone, formik.errors)}
            className="w-full"
            label={FORM_FIELDS[Fields.phone]}
            value={formik.values.phone}
            onChange={formik.handleChange(Fields.phone)}
            name='phone'
            InputProps={{
              inputComponent: PhoneNumberInput as any,
            }}
         />

         {formik.errors.domain && <div className="text-red-500">{formik.errors.phone}</div>}

         <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
         >
           Submit
         </button>

         <div>Amount: {submittedData.amount}</div>
         <div>Count: {submittedData.count}</div>
         <div>Domain: {submittedData.domain}</div>
         <div>Phone: {submittedData.phone}</div>
       </form>
     </div>
  )
}