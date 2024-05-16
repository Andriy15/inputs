import React, {forwardRef, useEffect, useState} from "react";
import {NumberFormatValues, NumericFormat, NumericFormatProps} from "react-number-format";
import {CustomPropsAmount} from "../models";

export const NumericFormatCustomAmount = forwardRef<NumericFormatProps, CustomPropsAmount>(
   function NumericFormatCustom(props, ref) {
     const { onChange,...other } = props
     const [amount, setAmount] = useState(other.value)

     const handleBlur = () => {
       if (amount && !/\.\d{2}$/.test(amount.toString())) {
         setAmount(amount + '.00')
       }
     }

     useEffect(() => {
         setAmount(other.value)
     }, [other.value])

     return (
        <NumericFormat
           {...other}
           getInputRef={ref}
           value={amount}
           onBlur={handleBlur}
           onValueChange={(values: NumberFormatValues): void => {
             onChange({
               target: {
                 name: props.name,
                 value: parseFloat(values.value),
               },
             })
           }}
           inputMode={'decimal'}
           thousandSeparator
           valueIsNumericString
           prefix="$"
           decimalScale={2}
        />
     )
   }
)