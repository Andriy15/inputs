import React, {forwardRef} from "react";
import {NumericFormat, NumericFormatProps} from "react-number-format";
import {CustomPropsAmount, CustomPropsNumber} from "@/app/models";

export const NumericFormatCustomAmount = forwardRef<NumericFormatProps, CustomPropsAmount>(
   function NumericFormatCustom(props, ref) {
     const { onChange,...other } = props

     return (
        <NumericFormat
           {...other}
           getInputRef={ref}
           onValueChange={(values) => {
             onChange({
               target: {
                 name: props.name,
                 value: parseFloat(values.value),
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