import React, {forwardRef, useState} from "react";
import {CustomPropsString} from "@/app/models";
import MaskedInput from "react-text-mask";

export const MaskedInputCustom = forwardRef<CustomPropsString, CustomPropsString>(
   function MaskedInputCustom(props, ref) {
     const [domainMaskLength, setDomainMaskLength] = useState(0)
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
             ...Array.from({ length:  domainMaskLength }, () => /[a-z0-9.]/),
           ]}
           guide={false}
        />
     )
   }
)