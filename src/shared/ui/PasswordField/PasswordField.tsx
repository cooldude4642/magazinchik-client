import styles from './PasswordField.module.sass'
import cn from 'classnames'
import { ComponentProps, useEffect, useRef, useState } from 'react'
import { IoAlertCircle, IoEye, IoEyeOff, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { IconButton } from '../IconButton'
import { BodyText } from '../Typography'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'

export interface PasswordFieldProps extends Omit<ComponentProps<'input'>, 'type'> {
	invalid?: boolean
	errorMessage?: string
	supportingText?: string 
}

export const PasswordField = ({
	supportingText, errorMessage, invalid, placeholder,
	defaultValue, className, value,
	onFocus, onBlur, onChange, onMouseEnter, onMouseLeave,
	...otherProps
}: PasswordFieldProps) => {
	const [isFocused, setIsFocused] = useState(false)
	const [text, setText] = useState(defaultValue)
	const [isInvalid, setIsInvalid] = useState(invalid)
	const [isHovered, setIsHovered] = useState(false)
	const [isTextVisible, setIsTextVisible] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		setIsInvalid(invalid)
	}, [invalid, errorMessage])

	useEffect(() => {
		setText(value)
	}, [value])
	
	return (
		<div className={ cn(
			styles.container,
			styles[isInvalid && 'invalid'],
			styles[isHovered && 'hovered']
		) }
		>
			<input
				ref={ ref }
				onMouseEnter={ (e) => {
					ref.current !== document.activeElement && setIsHovered(true)
					onMouseEnter && onMouseEnter(e)
				} }
				onMouseLeave={ (e) => {
					isHovered && setIsHovered(false)
					onMouseLeave && onMouseLeave(e)
				} }
				type={ isTextVisible ? 'text' : 'password' }
				onFocus={ (e) => {
					setIsFocused(true)
					isHovered && setIsHovered(false)
					onFocus && onFocus(e)
				} }
				onBlur={ (e) => {
					setIsFocused(false)
					onBlur && onBlur(e)
				} }
				className={ cn(styles.input, className) }
				{ ...otherProps }
				onChange={ (e) => {
					setText(e.currentTarget.value)
					onChange && onChange(e)
					isInvalid && setIsInvalid(false)
				} }
				value={ text }
			/>
			<div
				className={ cn(
					styles.placeholder,
					styles[(isFocused || !!text) && 'populated']
				) }
				onMouseEnter={ () => ref.current !== document.activeElement && setIsHovered(true) }
				onMouseLeave={ () => setIsHovered(false) }
			>
				{ placeholder ?? 'Label Text' }
			</div>
			{ !isInvalid &&  (
				<IconButton
					className={ cn(styles.eye) }
					IconOutlined={ isTextVisible ? IoEyeOffOutline : IoEyeOutline }
					IconFilled={ isTextVisible ? IoEyeOff : IoEye }
					onClick={ () => isTextVisible ? setIsTextVisible(false) : setIsTextVisible(true) }
				/>
			) }
			{ isInvalid && <IoAlertCircle className={ cn(styles.warn) }/> }
			{ supportingText && (!errorMessage || !isInvalid) && (
				<BodyText
					size='small'
					className={ cn(styles.supporting) }
				>
					{ supportingText }
				</BodyText>
			) }
			{ errorMessage && isInvalid && (
				<ErrorMessage
					className={ cn(styles.supporting) }
				>
					{ errorMessage }
				</ErrorMessage>
			)}
		</div>
	)
}