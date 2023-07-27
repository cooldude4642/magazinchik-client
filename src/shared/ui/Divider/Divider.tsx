import styles from './Divider.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'

interface DividerProps extends Omit<ComponentProps<'div'>, 'children'> {}

export const Divider = ({ className, ...otherProps }: DividerProps) => {
	
	return (
		<div
			className={ cn(styles.item, className) }
			{ ...otherProps }
		/>
	)
}