import * as yup from 'yup'
import { ErrorMessages, Fields, phoneNumber, REGEX_PATTERNS } from './models'

export const fieldsSchema = yup.object().shape({
	[Fields.amount]: yup.number().required(ErrorMessages.required),
	[Fields.count]: yup.number().required(ErrorMessages.required),
	[Fields.domain]: yup.string().required(ErrorMessages.required),
	[Fields.phone]: phoneNumber,
	[Fields.password]: yup
		.string()
		.required(ErrorMessages.required)
		.matches(REGEX_PATTERNS.SPECIAL_CHARACTERS)
		.matches(REGEX_PATTERNS.LOWER_CASE)
		.matches(REGEX_PATTERNS.UPPER_CASE)
		.matches(REGEX_PATTERNS.NUMBERS),
})
