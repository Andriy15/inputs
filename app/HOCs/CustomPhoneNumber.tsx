import React, { forwardRef, useState } from 'react'
import { CustomPropsPhone } from '../models'
import { parsePhoneNumber } from 'awesome-phonenumber'
import { IMaskInput } from 'react-imask'
import { IMaskInputProps } from 'react-imask'

export const PhoneNumberInput = forwardRef<IMaskInputProps<HTMLInputElement>, CustomPropsPhone>(
	function PhoneNumberInput(props, ref) {
		const { onChange, ...other } = props
		const [phoneNumber, setPhoneNumber] = useState('')
		const MAX_LENGTH = other.maxLength ?? 16

		const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target

			const update = (phone: string) => {
				onChange({
					target: {
						name: props.name,
						value: phone.length ? phone : '',
					},
				})
			}

			const pn = parsePhoneNumber(value)

			const number = pn?.number?.input
			let phoneReg = number ? number.replace(/\D/g, '') : ''
			const maxValue = phoneReg.length > MAX_LENGTH

			if (maxValue) {
				phoneReg = phoneReg.slice(0, MAX_LENGTH)
			}

			if (maxValue || pn.possibility === 'too-long') {
				return
			}
			const formattedPhoneNumber = phoneReg.length >= 1 ? `+${phoneReg}` : phoneReg

			setPhoneNumber(pn?.number?.international ?? formattedPhoneNumber)
			update(phoneReg)
		}

		return (
			<IMaskInput
				{...other}
				ref={ref}
				value={phoneNumber}
				onChange={handleInputChange}
			/>
		)
	},
)
