import styles from './Button.module.sass'
import cn from 'classnames'
import { ComponentProps, useRef, useState } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
	styleType?: 'filled' | 'tonal' | 'text' 
}

export const Button = ({ children, className, styleType, disabled, ...otherProps }: ButtonProps) => {
	const [position, setPosition] = useState<{ y: number, x: number}>()
	const [isTimeout, setIsTimeout] = useState(false)
	const ref = useRef<HTMLButtonElement>(null)

	return (
		<button
			ref={ ref }
			onMouseDown={ (e) => {
				if (!isTimeout && !disabled) {
					setPosition({ y: e.clientY - ref.current.offsetTop, x: e.clientX - ref.current.offsetLeft })
					setIsTimeout(true)

					setTimeout(() => {
						setPosition(null)
						setIsTimeout(false)
					}, 500)
				}
			} }
			className={ cn(
				styles.container,
				styles[styleType ? styleType : 'filled'],
				styles[disabled && 'disabled'],
				className
			) }
			{ ...otherProps }
		>
			<div className={ cn(styles['state-layer']) }>
				{ children }
			</div>
			{ position && (
				<div
					className={ cn(styles['active-layer']) }
					style={ {
						top: position.y,
						left: position.x
					} }
				/>
			) }
		</button>
	)
}