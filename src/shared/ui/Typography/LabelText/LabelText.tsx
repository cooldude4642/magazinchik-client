import styles from './LabelText.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { typescale } from '../types'

interface LabelTextProps extends ComponentProps<'div'> {
	size?: typescale
}

export const LabelText = ({ children, size, className, ...otherProps }: LabelTextProps) => {
	
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