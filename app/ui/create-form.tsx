'use client'
import { Link, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { NumericFormatCustomAmount } from '../HOCs/CustomAmount'
import { NumericFormatCustomCount } from '../HOCs/CustomCount'
import { DomainInputCustom } from '../HOCs/CustomDomain'
import { PhoneNumberInput } from '../HOCs/CustomPhoneNumber'
import { fieldsSchema } from '../schema'
import { FORM_FIELDS, Fields } from '../models'
import { getError } from '../getErrors'
import { createData } from '../lib/actions'

export default function CreateForm() {
	const formik = useFormik({
		initialValues: {
			amount: '',
			count: '',
			domain: '',
			phone: '',
		},
		validationSchema: fieldsSchema,
		onSubmit: (values) => {
			console.log({ ...values })
			createData({ ...values, id: Date.now().toString() })
		},
	})

	return (
		<div className="m-8">
			<form onSubmit={formik.handleSubmit} className="space-y-4">
				<TextField
					error={!!formik.errors.amount}
					className="w-full"
					label={FORM_FIELDS[Fields.amount]}
					helperText={getError(Fields.amount, formik.errors)}
					value={formik.values.amount}
					onChange={formik.handleChange(Fields.amount)}
					name="amount"
					InputProps={{
						inputComponent: NumericFormatCustomAmount as any,
					}}
				/>

				{formik.errors.amount && <div className="text-red-500">{formik.errors.amount}</div>}


				<TextField
					error={!!formik.errors.count}
					helperText={getError(Fields.count, formik.errors)}
					className="w-full"
					label={FORM_FIELDS[Fields.count]}
					value={formik.values.count}
					onChange={formik.handleChange(Fields.count)}
					name="count"
					InputProps={{
						inputComponent: NumericFormatCustomCount as any,
					}}
				/>

				{formik.errors.count && <div className="text-red-500">{formik.errors.count}</div>}


				<TextField
					error={!!formik.errors.domain}
					helperText={getError(Fields.domain, formik.errors)}
					className="w-full"
					label={FORM_FIELDS[Fields.domain]}
					value={formik.values.domain}
					onChange={formik.handleChange(Fields.domain)}
					name="domain"
					InputProps={{
						inputComponent: DomainInputCustom as any,
					}}
				/>

				{formik.errors.domain && <div className="text-red-500">{formik.errors.domain}</div>}

				<TextField
					error={!!formik.errors.phone}
					helperText={getError(Fields.phone, formik.errors)}
					className="w-full"
					label={FORM_FIELDS[Fields.phone]}
					value={formik.values.phone}
					onChange={formik.handleChange(Fields.phone)}
					name="phone"
					InputProps={{
						inputComponent: PhoneNumberInput as any,
					}}
				/>

				{formik.errors.phone && <div className="text-red-500">{formik.errors.phone}</div>}

				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	)
}