import styles from './Backdrop.module.sass'
import cn from 'classnames'
import { ComponentProps, useEffect } from 'react'

interface BackdropProps extends ComponentProps<'div'> {}

export const Backdrop = ({ children, className, ...otherProps }: BackdropProps) => {
	useEffect(() => {
		document.body.classList.add('locked')

		return () => {
			document.body.classList.remove('locked')
		}
	}, [])

	return (
		<div
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			{ children }
		</div>
	)
}