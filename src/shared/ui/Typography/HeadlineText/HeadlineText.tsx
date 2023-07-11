import styles from './HeadlineText.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { typescale } from '../types'

interface HeadlineTextProps extends ComponentProps<'div'> {
	size?: typescale
}

export const HeadlineText = ({ children, size, className, ...otherProps }: HeadlineTextProps) => {
	
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