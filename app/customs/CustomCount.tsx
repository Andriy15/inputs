import React, { forwardRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { CustomPropsNumber } from '../models'

export const NumericFormatCustomCount = forwardRef<NumericFormatProps, CustomPropsNumber>(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={values => {
					onChange({
						target: {
							name: props.name,
							value: parseFloat(values.value),
						},
					})
				}}
				thousandSeparator
				valueIsNumericString
			/>
		)
	},
)
