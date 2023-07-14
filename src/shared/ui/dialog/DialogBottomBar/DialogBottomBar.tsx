import styles from './DialogBottomBar.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'

interface DialogBottomBarProps extends ComponentProps<'div'> {}

export const DialogBottomBar = ({ children, className, ...otherProps }: DialogBottomBarProps) => {
	
	return (
		<div
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			{ children }
		</div>
	)
}