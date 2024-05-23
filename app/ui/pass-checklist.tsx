import { clsx } from 'clsx'
import { lusitana } from './fonts'

interface PassChecklistProps {
	rules: { rule: string; message: string }[]
	minLength: number
	value: string
	submit?: boolean
}

interface Rule {
	(value: string, minLength: number): boolean
}

interface RulesSet {
	[key: string]: Rule
	minLength: Rule
	containsNumber: Rule
	containsSpecialChar: Rule
	containsUpperAndLowerCase: Rule
}

const rulesSet: RulesSet = {
	minLength: (value: string, minLength: number) => value.length >= minLength,
	containsNumber: (value: string) => /\d/.test(value),
	containsSpecialChar: (value: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value),
	containsUpperAndLowerCase: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value),
}

export default function PassChecklist(props: PassChecklistProps) {
	const { rules, minLength, value, submit } = props

	return (
		<ul>
			{rules.map(({ rule, message }, index) => {
				const isRuleValid = rulesSet[rule](value, minLength)
				return (
					<li
						key={index}
						className={clsx(
							isRuleValid ? 'text-green-500' : submit ? 'text-red-500' : 'text-gray-500',
							'text-xs',
						)}
					>
						{isRuleValid ? '✓' : '✗'} {message}
					</li>
				)
			})}
		</ul>
	)
}
