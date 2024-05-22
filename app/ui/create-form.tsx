'use client'
import { TextField, InputAdornment, IconButton, OutlinedInput } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useFormik } from 'formik'
import { NumericFormatCustomAmount } from '../HOCs/CustomAmount'
import { NumericFormatCustomCount } from '../HOCs/CustomCount'
import { DomainInputCustom } from '../HOCs/CustomDomain'
import { PhoneNumberInput } from '../HOCs/CustomPhoneNumber'
import { fieldsSchema } from '../schema'
import { FORM_FIELDS, Fields } from '../models'
import { getError } from '../getErrors'
import { createData } from '../lib/actions'
import { CustomPassword } from '../HOCs/CustomPassword'
import { useState } from 'react'
import PassChecklist from './pass-checklist'

export default function CreateForm() {
	const [showPassword, setShowPassword] = useState(false)
	const formik = useFormik({
		initialValues: {
			amount: '',
			count: '',
			domain: '',
			phone: '',
			password: '',
		},
		validationSchema: fieldsSchema,
		onSubmit: values => {
			console.log({ ...values })
			createData({ ...values, id: Date.now().toString() })
		},
	})

	const handleShowClick = () => {
		setShowPassword(prevState => !prevState)
	}

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	return (
		<div className="m-8">
			<form onSubmit={formik.handleSubmit} className="space-y-4">
				<TextField
					error={!!formik.errors.amount}
					helperText={getError(Fields.amount, formik.errors)}
					className="w-full"
					label={FORM_FIELDS[Fields.amount]}
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
						inputProps: { maxLength: 31 },
					}}
					InputLabelProps={{ shrink: true }}
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
						inputProps: { maxLength: 15 },
					}}
				/>

				{formik.errors.phone && <div className="text-red-500">{formik.errors.phone}</div>}

				<TextField
					error={!!formik.errors.password}
					className='w-full'
					label={FORM_FIELDS[Fields.password]}
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
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>


				<PassChecklist
					rules={[
						{ rule: 'minLength', message: 'Password must be at least 8 characters' },
						{ rule: 'containsUpperAndLowerCase', message: 'Password must contain an uppercase and lowercase letter' },
						{ rule: 'containsSpecialChar', message: 'Password must contain a special character' },
						{ rule: 'containsNumber', message: 'Password must contain a number' },
					]}
					minLength={8}
					value={formik.values.password}
				/>

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
