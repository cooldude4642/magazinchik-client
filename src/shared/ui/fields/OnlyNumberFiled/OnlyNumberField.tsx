import styles from './OnlyNumberFiled.module.sass'
import cn from 'classnames'
import { InputField, InputFieldProps } from '../InputField'
import { useEffect, useState } from 'react'

export type OnlyNumberFiledProps = Omit<InputFieldProps, 'type'>

export const OnlyNumberFiled = ({ value, className, ...otherProps }: OnlyNumberFiledProps) => {
	const [text, setText] = useState(value ?? 1)

	useEffect(() => {
		if (Number.isInteger(Number(value))) {
			if (value && value[0] !== '0') {
				setText(value)
			} else if (!value || value[0] === '0') {
				setText('1')
			}
		}
	}, [value])

	return (
		<InputField
			style={ { width: 60, textAlign: 'center' } }
			value={ text }
			onChange={ (e) => {
				const value = e.target.value.replace(/\D/, '')
				
				if (Number.isInteger(Number(value))) {
					if (value && value[0] !== '0') {
						e.target.value = value
						setText(value)
					} else if (!value || value[0] === '0') {
						e.target.value = '1'
						setText('1')
					}
				} else {
					e.preventDefault()
				}
			} }
			className={ cn(styles.container, className) }
			{ ...otherProps }
		/>
	)
}