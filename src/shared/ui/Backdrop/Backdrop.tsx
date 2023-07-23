import styles from './Backdrop.module.sass'
import cn from 'classnames'
import { Children, ComponentProps, cloneElement, useEffect, useState } from 'react'
import { store } from 'shared/lib/store'
import { createPortal } from 'react-dom'
import { DialogProps } from '../Dialog/Dialog'

export interface BackdropProps extends Omit<ComponentProps<'div'>, 'children'> {
	children: JSX.Element[] | JSX.Element
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

	children = children.map(element => {
		console.log(element)
		return cloneElement<DialogProps>(element, {
			onClick: (e) => e.stopPropagation(),
			onMouseDown: (e) => e.stopPropagation(),
			onMouseUp: () => setIsMouseDown(false),
			onMouseLeave: () => setIsMouseDown(false)
		})
	})

	return createPortal((
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
	), document.getElementById('layout'))
}