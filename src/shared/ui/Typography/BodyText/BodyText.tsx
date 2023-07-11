import styles from './BodyText.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { typescale } from '../types'

interface BodyTextProps extends ComponentProps<'div'> {
	size?: typescale
}

export const BodyText = ({ children, size, className, ...otherProps }: BodyTextProps) => {
	
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