import React, {forwardRef, useState} from 'react';
import {CustomPropsString} from "@/app/models";
import {parsePhoneNumber} from 'awesome-phonenumber';
import MaskedInput from "react-text-mask";

export const PhoneNumberInput = forwardRef<CustomPropsString, CustomPropsString>(
   function PhoneNumberInput(props, ref) {
     const { onChange, ...other } = props
     const [phoneNumber, setPhoneNumber] = useState('')
     const [mask, setMask] = useState(['+', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/])

     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
       const { value } = event.target
       const pn = parsePhoneNumber( value )
       if ( pn.valid ) {
         const number = pn.number.e164
         const phone = number.startsWith('+') ? number.slice(1) : `+${number}`
         setPhoneNumber( phone )

         if (pn.countryCode === 380) {
           setMask(['+', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/])
         } else if (pn.countryCode === 1) {
           setMask(['+', /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/])
         } else {
           console.log('Country code is not supported. Supported country codes: +380, +1')
         }

         onChange({
           target: {
             name: props.name,
             value: phone,
           },
         })
       }
       else {
         setMask(['+', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/])
         onChange({
           target: {
             name: props.name,
             value: value,
           },
         })
       }
     }

     return (
        <MaskedInput
           {...other}
           onChange={handleInputChange}
           mask={mask}
           guide={false}
        />
     )
   }
)