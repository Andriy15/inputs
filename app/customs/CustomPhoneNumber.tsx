import React, { forwardRef, useState, useEffect } from 'react'
import { CustomPropsPhone } from '../models'
import { parsePhoneNumber } from 'awesome-phonenumber'

export const PhoneNumberInput = forwardRef<HTMLInputElement, CustomPropsPhone>(
	function PhoneNumberInput(props, ref) {
		const { onChange, ...other } = props
		const [phoneNumber, setPhoneNumber] = useState(other.value ?? '')
		const MAX_LENGTH = other.maxLength ?? 16

		const update = (phone: string) => {
			onChange({
				target: {
					name: props.name,
					value: phone.length ? phone : '',
				},
			})
		}

		const setMask = (value = "") => {
			const pn = parsePhoneNumber(`+${value}`)

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

		useEffect(() => {
			setMask(other.value)
		}, [other.value])

		const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setMask(event.target.value)
		}

		return (
			<input
				{...other}
				inputMode='tel'
				ref={ref}
				value={phoneNumber}
				onChange={handleInputChange} />
		)
	},
)