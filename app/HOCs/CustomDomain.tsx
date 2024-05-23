import React, { forwardRef, useState } from 'react'
import { CustomPropsDomain } from '../models'
import MaskedInput from 'react-text-mask'
import { IMaskInput } from 'react-imask'

export const DomainInputCustom = forwardRef<HTMLInputElement, CustomPropsDomain>(
	function MaskedInputCustom(props, ref) {
		const { onChange, ...other } = props
		const [inputValue, setInputValue] = useState('')
		const domain = 'https://'
		const MAX_LENGTH = other.maxLength ?? 31

		const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
			const { value } = event.target

			const update = (domain: string) => {
				onChange({
					target: {
						name: props.name,
						value: domain.length ? `${domain}` : '',
					},
				})
			}

			const domainReg = value.replace('https://', '')
			const maxValue = domainReg.length > MAX_LENGTH

			if (maxValue) {
				return
			}

			update(domainReg)
			setInputValue(domainReg)
		}

		return (
			<IMaskInput
				{...other}
				ref={ref}
				value={`${domain}${inputValue}`}
				onChange={handleInputChange}
				mask={`${domain}[${new Array(other.maxLength ?? 31).join('*')}]`}
			/>
		)
	},
)
