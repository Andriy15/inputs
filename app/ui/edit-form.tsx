'use client'

import { FormData } from '../models'
import { useFormik } from 'formik'
import { fieldsSchema } from '../schema'
import { FORM_FIELDS } from '../models'
import { Fields } from '../models'
import { getError } from '../getErrors'
import { Button, TextField } from '@mui/material'
import { NumericFormatCustomAmount } from '../HOCs/CustomAmount'
import { NumericFormatCustomCount } from '../HOCs/CustomCount'
import { PhoneNumberInput } from '../HOCs/CustomPhoneNumber'
import { DomainInputCustom } from '../HOCs/CustomDomain'
import Link from 'next/link'
import { updateData } from '../lib/actions'

export default function EditForm({ data }: { data: FormData }) {
	const formik = useFormik({
		initialValues: {
			amount: data.amount,
			count: data.count,
			domain: data.domain,
			phone: data.phone,
		},
		validationSchema: fieldsSchema,
		onSubmit: values => {
			console.log({ ...values })
			updateData(data.id, { ...values, id: data.id })
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
					name="amount"
					onChange={formik.handleChange(Fields.amount)}
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
					inputProps={{
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

				<div className="mt-6 flex gap-4">
					<Link
						href="/"
						className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
					>
						Cancel
					</Link>
					<Button type="submit">Edit Data</Button>
				</div>

				<span>{formik.values.phone}</span>
			</form>
		</div>
	)
}
