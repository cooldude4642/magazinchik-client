import styles from './DisplayText.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { typescale } from '../types'

interface DisplayTextProps extends ComponentProps<'div'> {
	size?: typescale
}

export const DisplayText = ({ children, size, className, ...otherProps }: DisplayTextProps) => {
	
	return (
		<div
			className={ cn(
				styles.container,
				styles[size ?? 'medium'],
				className
			) }
			{ ...otherProps }
		>
			{ children }
		</div>
	)
}