import styles from './MenuContainer.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'

export interface MenuContainerProps extends ComponentProps<'div'> {}

export const MenuContainer = ({ children, className, ...otherProps }: MenuContainerProps) => {
	
	return (
		<div
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			{ children }
		</div>
	)
}