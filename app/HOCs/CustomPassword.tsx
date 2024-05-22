import { forwardRef } from 'react'
import { CustomPropsPassword } from '../models'

export const CustomPassword = forwardRef<HTMLInputElement, CustomPropsPassword>(
	function CustomPassword(props, ref) {
		const { onChange, ...other } = props

		const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target

			onChange({
				target: {
					name: props.name,
					value,
				},
			})
		}

		return (
			<input
				{...other}
				ref={ref}
				onChange={handleInputChange}
			/>
		)
	}
)