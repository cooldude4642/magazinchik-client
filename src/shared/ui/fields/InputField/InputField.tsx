import styles from './InputField.module.sass'
import cn from 'classnames'
import { ComponentProps, cloneElement, useEffect, useRef, useState } from 'react'
import { IoAlertCircle } from 'react-icons/io5'
import { BodyText } from 'shared/ui/Typography'

export interface InputFieldProps extends ComponentProps<'input'> {
	invalid?: boolean
	errorMessage?: string
	supportingText?: string
	iconButton?: JSX.Element
}

export const InputField = ({
	supportingText, errorMessage, invalid, type, placeholder,
	className, value, onFocus, onBlur, onChange, 
	onMouseEnter, onMouseLeave, iconButton, ...otherProps
}: InputFieldProps) => {
	const [isFocused, setIsFocused] = useState(false)
	const [text, setText] = useState(value ?? '')
	const [isInvaild, setIsInvaild] = useState(invalid)
	const [isHovered, setIsHovered] = useState(false)
	const ref = useRef(null)
	iconButton && (iconButton = cloneElement<ComponentProps<'button'>>(iconButton, { className: styles['icon-button'] }))

	useEffect(() => {
		setIsInvaild(invalid)
	}, [invalid, errorMessage])
	
	return (
		<div className={ cn(
			styles.field,
			styles[isInvaild && 'invalid'],
			styles[isHovered && 'hovered'],
			styles[isFocused && 'focused'],
			styles[iconButton && 'with-icon-button']
		) }
		>
			<input
				ref={ ref.current }
				onMouseEnter={ (e) => {
					ref.current !== document.activeElement && setIsHovered(true)
					onMouseEnter && onMouseEnter(e)
				} }
				onMouseLeave={ (e) => {
					isHovered && setIsHovered(false)
					onMouseLeave && onMouseLeave(e)
				} }
				onFocus={ (e) => {
					setIsFocused(true)
					isHovered && setIsHovered(false)
					onFocus && onFocus(e)
				} }
				onBlur={ (e) => {
					setIsFocused(false)
					onBlur && onBlur(e)
				} }
				onChange={ (e) => {
					setText(e.currentTarget.value)
					onChange && onChange(e)
					isInvaild && setIsInvaild(false)
				} }
				type={ type ?? 'text' }
				value={ value }
				className={ cn(styles.input, className) }
				{ ...otherProps }
			/>
			{ placeholder && (
				<div
					onMouseEnter={ () => ref.current !== document.activeElement && setIsHovered(true) }
					onMouseLeave={ () => setIsHovered(false) }
					className={ cn(
						styles.placeholder,
						styles[(isFocused || !!text) && 'populated']
					) }
				>
					{ placeholder }
				</div>
			) }
			{ !isInvaild && iconButton && iconButton }
			{ isInvaild && <IoAlertCircle className={ cn(styles.warn) }/> }
			{ supportingText && (!errorMessage || !isInvaild) && (
				<BodyText
					size='small'
					className={ cn(styles.supporting) }
				>
					{ supportingText }
				</BodyText>
			) }
			{ errorMessage && isInvaild && (
				<BodyText
					size='small'
					className={ cn(styles.supporting, styles.error) }
				>
					{ errorMessage }
				</BodyText>
			) }
		</div>
	)
}