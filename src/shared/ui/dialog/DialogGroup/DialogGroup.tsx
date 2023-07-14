import styles from './DialogGroup.module.sass'
import cn from 'classnames'
import { ComponentProps, ElementType } from 'react'

interface DialogGroupOwnProps<E extends ElementType = ElementType> {
	gap?: 'large' | 'medium' | 'small' | 'extra-small'
	as?: E
}

type DialogGroupProps<E extends ElementType> = DialogGroupOwnProps<E> & Omit<ComponentProps<E>, keyof DialogGroupOwnProps>

const defaultTagName = 'div'

export const DialogGroup = <E extends ElementType = typeof defaultTagName>({ as, gap, children, className, ...otherProps }: DialogGroupProps<E>) => {
	const TagName = as || defaultTagName

	return (
		<TagName
			className={ cn(
				styles.container,
				styles[gap ?? 'medium'],
				className
			) }
			{ ...otherProps }
		>
			{ children }
		</TagName>
	)
}