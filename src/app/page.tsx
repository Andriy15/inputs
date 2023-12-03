'use client'
import React, {forwardRef} from 'react';
import { TextField } from '@mui/material';
import {NumericFormat, PatternFormat, NumericFormatProps} from "react-number-format";
import MaskedInput from "react-text-mask";
import {useFormik} from "formik";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustomAmount = forwardRef<NumericFormatProps, CustomProps>(
   function NumericFormatCustom(props, ref) {
     const { onChange, ...other } = props

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
             })
           }}
           thousandSeparator
           valueIsNumericString
           prefix="$"
           decimalScale={2}
        />
     )
   }
)

const NumericFormatCustomCount = forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props

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

const MaskedInputCustom = forwardRef<CustomProps, CustomProps>(
    function MaskedInputCustom(props) {
      const [domainMaskLength, setDomainMaskLength] = React.useState(0)
      const { onChange, ...other } = props
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        const domainWithoutProtocol = value.startsWith('https://') ? value.slice(8) : value
        setDomainMaskLength(domainWithoutProtocol.length + 8)

        onChange({
          target: {
            name: props.name,
            value: domainWithoutProtocol,
          },
        })
      }

      return (
          <MaskedInput
              {...other}
              onChange={handleInputChange}
              mask={[
                'https://',
                ...Array.from({ length:  domainMaskLength }, () => /[a-z0-9.]/), // need to fix a character limit
              ]}
              guide={false}
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
        count: parseFloat(values.count),
      }
      console.log(JSON.stringify(formattedValues, null, 2))
    }
  })

  const handleBlur = () => {
    const { amount } = formik.values;
    if (amount && !/\.\d{2}$/.test(amount.toString())) {
      formik.setFieldValue('amount', amount + '.00')
    }
  }

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