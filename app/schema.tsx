import * as yup from 'yup'
import { ErrorMessages, Fields, phoneNumber, REGEX_PATTERNS } from './models'

export const fieldsSchema = yup.object().shape({
	[Fields.amount]: yup.number().required(ErrorMessages.required),
	[Fields.count]: yup.number().required(ErrorMessages.required),
	[Fields.domain]: yup.string().required(ErrorMessages.required),
	[Fields.phone]: phoneNumber
})
