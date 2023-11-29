'use client'
import React from 'react';
import { TextField } from '@mui/material';
import {NumericFormat, PatternFormat, NumericFormatProps} from "react-number-format";
import MaskedInput from "react-text-mask";
import {useFormik} from "formik";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustomAmount = React.forwardRef<NumericFormatProps, CustomProps>(
   function NumericFormatCustom(props, ref) {
     const { onChange, ...other } = props;
     return (
        <NumericFormat
           {...other}
           getInputRef={ref}
           onValueChange={(values) => {
             onChange({
               target: {
                 name: props.name,
                 value: values.value,
               },
             });
           }}
           thousandSeparator
           valueIsNumericString
           prefix="$"
        />
     )
   }
)

const NumericFormatCustomCount = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
          <NumericFormat
              {...other}
              getInputRef={ref}
              onValueChange={(values) => {
                 onChange({
                target: {
                  name: props.name,
                  value: values.value,
                },
                 });
              }}
              thousandSeparator
              valueIsNumericString
          />
      )
    }
)

export default function Home() {
  const formik = useFormik({
    initialValues: {
      amount: '',
      count: '',
      domain: '',
    },
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        amount: parseFloat(values.amount),
        count: parseFloat(values.count)
      }
      alert(JSON.stringify(formattedValues, null, 2));
    }
  })

  const handleBlur = () => {
    const { amount } = formik.values;
    if (amount && !/\.\d{2}$/.test(amount.toString())) {
      formik.setFieldValue('amount', amount + '.00')
    }
  }

  const domainMask = [
    'https://',
    ...Array.from({ length: formik.values.domain.length }, () => /[a-z0-9.]/),
  ]

  const amountRef = React.useRef<NumericFormatProps>(null);

  return (
     <div className="m-8">
       <h1 className="text-4xl font-bold">Form</h1>
       <form onSubmit={formik.handleSubmit}>
         <TextField
            className="ml-6 mr-6"
            label="Amount"
            value={formik.values.amount}
            onChange={formik.handleChange('amount')}
            onBlur={handleBlur}
            InputProps={{
              inputComponent: NumericFormatCustomAmount as any,
              inputProps: {
                ref: amountRef,
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

         {/*<PatternFormat*/}
         {/*   value={formik.values.phone}*/}
         {/*   format="+1 (###) #### ###"*/}
         {/*   customInput={TextField}*/}
         {/*   label="Phone"*/}
         {/*   onValueChange={({ value }) => formik.handleChange('phone')(value)}*/}
         {/*/>*/}

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