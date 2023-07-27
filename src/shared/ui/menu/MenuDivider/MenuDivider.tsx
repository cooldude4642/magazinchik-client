import styles from './MenuDivider.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'

export interface MenuDividerProps extends Omit<ComponentProps<'div'>, 'children'> {}

export const MenuDivider = ({ className, ...otherProps }: MenuDividerProps) => {
	
	return (
		<div
			className={ cn(styles.item, className) }
			{ ...otherProps }
		/>
	)
}