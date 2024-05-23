import { parsePhoneNumber } from 'awesome-phonenumber'
import * as yup from 'yup'

export const phoneNumber = yup
	.string()
	.required('This field is required')
	.test({
		name: 'phone',
		message: 'Invalid phone number',
		test: function (value) {
			if (!value) return true
			const pn = parsePhoneNumber(`+${value}`)
			return pn.valid
		},
	})

export interface CustomPropsNumber {
	onChange: (event: { target: { name: string; value: number } }) => void
	name: string
}

export interface CustomPropsAmount {
	onChange: (event: { target: { name: string; value: number } }) => void
	name: string
	value: string
}

export interface CustomPropsDomain {
	onChange: (event: { target: { name: string; value: string } }) => void
	name: string
	value: string
	maxLength: number
}

export interface CustomPropsPhone {
	onChange: (event: { target: { name: string; value: string } }) => void
	name: string
	maxLength: number
}

export interface CustomPropsPassword {
	onChange: (event: { target: { name: string; value: string } }) => void
	name: string
}

export interface Data {
	amount: number
	count: number
	domain: string
	phone: string
}

export interface FormData {
	amount: number
	count: number
	domain: string
	phone: string
	id: string
}

export enum Fields {
	amount = 'amount',
	count = 'count',
	domain = 'domain',
	phone = 'phone',
	password = 'password',
}

export const FORM_FIELDS = {
	[Fields.amount]: 'Amount',
	[Fields.count]: 'Count',
	[Fields.domain]: 'Domain',
	[Fields.phone]: 'Phone',
	[Fields.password]: 'Password',
}

export const REGEX_PATTERNS = {
	[Fields.phone]: /^(1|380)\d*$/,
	LOWER_CASE: /[a-z]/,
	UPPER_CASE: /[A-Z]/,
	NUMBERS: /\d/,
	SPECIAL_CHARACTERS: /[^A-Za-z0-9]/,
}

export const ErrorMessages = {
	required: 'This field is required',
	min: ({ min }: { min: number }) => `Minimum numbers is ${min}`,
}
