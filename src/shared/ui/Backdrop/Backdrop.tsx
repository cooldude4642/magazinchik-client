import styles from './Backdrop.module.sass'
import cn from 'classnames'
import { Children, ComponentProps, cloneElement, useEffect, useState } from 'react'
import { DialogContainerProps } from '../dialog'
import { store } from 'shared/lib/store'

interface BackdropProps extends Omit<ComponentProps<'div'>, 'children'> {
	children: JSX.Element[]
}

export const Backdrop = ({ onClick, onMouseDown, children, className, ...otherProps }: BackdropProps) => {
	const [isMouseDown, setIsMouseDown] = useState(false)
	
	useEffect(() => {
		document.body.classList.add('locked')

		return () => {
			document.body.classList.remove('locked')
		}
	}, [])

	children = Children.toArray(children) as JSX.Element[]

	children = children.map(element => cloneElement<DialogContainerProps>(element, {
		onClick: (e) => e.stopPropagation(),
		onMouseDown: (e) => e.stopPropagation(),
		onMouseUp: () => setIsMouseDown(false),
		onMouseLeave: () => setIsMouseDown(false)
	}))

	return (
		<div
			onClick={ (e) => {
				if (isMouseDown) {
					store.setIsBackdropVisible(false)
					setIsMouseDown(false)
					onClick && onClick(e)
				}
			} }
			onMouseDown={ (e) => {
				setIsMouseDown(true)
				onMouseDown && onMouseDown(e)
			} }
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			{ children }
		</div>
	)
}