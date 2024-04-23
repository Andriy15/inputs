import * as yup from 'yup'
import {ErrorMessages, Fields} from './models'

export const fieldsSchema = yup.object().shape({
  [Fields.amount]: yup
     .number()
     .required(ErrorMessages.required),
  [Fields.count]: yup
     .number()
     .required(ErrorMessages.required),
  [Fields.domain]: yup
     .string()
     .required(ErrorMessages.required),
  [Fields.phone]: yup
     .string()
     .required(ErrorMessages.required)
     .min(11, ErrorMessages.min)
     // .test(Fields.phone, 'Invalid phone number', (value) => {
     //   if (value.startsWith('+1')) {
     //     return value.length === 11
     //   } else if (value.startsWith('+380')) {
     //     return value.length === 12
     //   }
     //   return false
     // })
})