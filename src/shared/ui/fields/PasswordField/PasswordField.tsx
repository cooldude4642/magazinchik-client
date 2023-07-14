import { InputField, InputFieldProps } from '../InputField'
import { IconButton } from '../../IconButton'
import { IoEye, IoEyeOff, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useState } from 'react'

export interface PasswordFieldProps extends Omit<InputFieldProps, 'iconButton'> {}

export const PasswordField = ({ className, ...otherProps }: PasswordFieldProps) => {
	const [isTextVisible, setIsTextVisible] = useState(false)
	
	const eye = (
		<IconButton
			IconOutlined={ IoEyeOutline }
			IconFilled={ IoEye }
			onClick={ () => setIsTextVisible(true) }
		/>
	)

	const eyeOff = (
		<IconButton
			IconOutlined={ IoEyeOffOutline }
			IconFilled={ IoEyeOff }
			onClick={ () => setIsTextVisible(false) }
		/>
	)

	return (
		<InputField
			type={ isTextVisible ? 'text' : 'password' }
			iconButton={ isTextVisible ? eyeOff : eye }
			{ ...otherProps }
		/>
	)
}