import React, { forwardRef, useState } from 'react'
import { CustomPropsString } from '../models'
import { parsePhoneNumber } from 'awesome-phonenumber'
import { IMaskInput } from 'react-imask'

export const PhoneNumberInput = forwardRef<CustomPropsString, CustomPropsString>(
	function PhoneNumberInput(props, ref) {
		const { onChange, ...other } = props
		const [phoneNumber, setPhoneNumber] = useState('')
		const [mask, setMask] = useState('')

		const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target
			const pn = parsePhoneNumber(value)

			if (pn.valid) {
				const number = pn.number.e164
				const phone = number.startsWith('+') ? number.slice(1) : `+${number}`
				setPhoneNumber(phone)

				const countryCode = pn.countryCode
				setMask(getMaskForCountry(countryCode))

				onChange({
					target: {
						name: props.name,
						value: phone,
					},
				})
			} else {
				setPhoneNumber(value)

				if (value) {
					setMask(getMaskForCountry(parseInt(value)))
				}

				onChange({
					target: {
						name: props.name,
						value: value,
					},
				})
			}
		}

		const getMaskForCountry = (countryCode: number) => {
			if (countryCode === 1) {
				return '+{0} 000-000-0000'
			} else if (countryCode === 380) {
				return '+{000} 00-000-0000'
			} else {
				return ''
			}
		}

		return (
			<IMaskInput
				{...other}
				ref={ref}
				value={phoneNumber}
				onChange={handleInputChange}
				mask={mask}
				onAccept={(value: string) => {
					setPhoneNumber(value)
				}}
			/>
		)
	},
)
