import styles from './TitleText.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { typescale } from '../types'

interface TitleTextProps extends ComponentProps<'div'> {
	size?: typescale
}

export const TitleText = ({ children, size, className, ...otherProps }: TitleTextProps) => {
	
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