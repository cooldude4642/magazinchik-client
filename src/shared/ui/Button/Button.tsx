import styles from './Button.module.sass'
import cn from 'classnames'
import { ComponentProps, useState } from 'react'
import { IconType } from 'react-icons'
import { LabelText } from '../Typography'

export interface ButtonProps extends ComponentProps<'button'> {
	styleType?: 'filled' | 'tonal' | 'text'
	LeadingIcon?: IconType
	TrailingIcon?: IconType
}

export const Button = ({ children, className, styleType, type, LeadingIcon, TrailingIcon, onClick, ...otherProps }: ButtonProps) => {
	const [position, setPosition] = useState<{ y: number, x: number}>()
	const [isTimeout, setIsTimeout] = useState(false)

	return (
		<button
			type={ type ?? 'button' }
			onClick={ (e) => {
				const { clientX, clientY, currentTarget } = e

				if (!isTimeout) {
					const { top, left } = currentTarget.getBoundingClientRect()

					setPosition({ x: clientX - left, y: clientY - top })
					setIsTimeout(true)

					setTimeout(() => {
						setPosition(null)
						setIsTimeout(false)
					}, 600)
				}

				onClick && onClick(e)
			} }
			className={ cn(
				styles.container,
				styles[styleType ? styleType : 'filled'],
				className
			) }
			{ ...otherProps }
		>
			<div className={ cn(styles['state-layer']) }>
				{ LeadingIcon && <LeadingIcon className={ cn(styles.icon) }/> }
				<LabelText size='large'>{ children }</LabelText>
				{ TrailingIcon && <TrailingIcon className={ cn(styles.icon) }/> }
			</div>
			{ position && (
				<div
					className={ cn(styles['ripple-layer']) }
					style={ {
						top: position.y,
						left: position.x
					} }
				/>
			) }
		</button>
	)
}