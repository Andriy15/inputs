'use client'

import { FORM_LABELS, FormData } from '../models'
import { useFormik } from 'formik'
import { fieldsSchema } from '../schema'
import { Fields } from '../models'
import { getError } from '../getErrors'
import { Button, TextField, InputAdornment, IconButton } from '@mui/material'
import { NumericFormatCustomAmount } from '../customs/CustomAmount'
import { NumericFormatCustomCount } from '../customs/CustomCount'
import { PhoneNumberInput } from '../customs/CustomPhoneNumber'
import { DomainInputCustom } from '../customs/CustomDomain'
import Link from 'next/link'
import { updateData } from '../lib/actions'
import { useState } from 'react'
import PassChecklist from './pass-checklist'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function EditForm({ data }: { data: FormData }) {
	const [showPassword, setShowPassword] = useState(false)
	const [submitAttempted, setSubmitAttempted] = useState(false)

	const formik = useFormik({
		initialValues: {
			amount: data.amount,
			count: data.count,
			domain: data.domain,
			phone: data.phone,
			password: data.password,
		},
		validationSchema: fieldsSchema,
		onSubmit: values => {
			console.log({ ...values })
			updateData(data.id, { ...values, id: data.id })
		},
	})

	const handleShowClick = () => {
		setShowPassword(prevState => !prevState)
	}

	const handleOnSubmit = () => {
		if (formik.isValid) {
			return
		}
		setSubmitAttempted(true)
	}

	return (
		<div className="m-8">
			<form onSubmit={formik.handleSubmit} className="space-y-4">
				<TextField
					error={!!formik.errors.amount}
					className="w-full"
					label={FORM_LABELS[Fields.amount]}
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
					label={FORM_LABELS[Fields.count]}
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
					label={FORM_LABELS[Fields.domain]}
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
					className="w-full"
					label={FORM_LABELS[Fields.phone]}
					value={formik.values.phone}
					onChange={formik.handleChange(Fields.phone)}
					name="phone"
					InputProps={{
						inputComponent: PhoneNumberInput as any,
						inputProps: { maxLength: 15 },
					}}
				/>

				{formik.errors.phone && <div className="text-red-500">{formik.errors.phone}</div>}

				<TextField
					error={!!formik.errors.password}
					className="w-full"
					label={FORM_LABELS[Fields.password]}
					value={formik.values.password}
					onChange={formik.handleChange(Fields.password)}
					name="password"
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleShowClick}
									edge="end"
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>

				<PassChecklist
					rules={[
						{ rule: 'minLength', message: 'Password must be at least 8 characters' },
						{
							rule: 'containsUpperAndLowerCase',
							message: 'Password must contain an uppercase and lowercase letter',
						},
						{ rule: 'containsSpecialChar', message: 'Password must contain a special character' },
						{ rule: 'containsNumber', message: 'Password must contain a number' },
					]}
					minLength={8}
					value={formik.values.password}
					submit={submitAttempted && !formik.isValid}
				/>

				<div className="mt-6 flex gap-4">
					<Link
						href="/"
						className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
					>
						Cancel
					</Link>
					<Button
					 type="submit"
					 onClick={handleOnSubmit}
					>
						Edit Data
					</Button>
				</div>

			</form>
		</div>
	)
}
