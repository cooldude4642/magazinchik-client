import cn from 'classnames'
import { ComponentProps, ElementType } from 'react'

interface ColumnOwnProps<E extends ElementType = ElementType> {
	as?: E
}

export type ColumnProps<E extends ElementType> = ColumnOwnProps<E> & Omit<ComponentProps<E>, keyof ColumnOwnProps>

const defaultTagName = 'div'

export const Column = <E extends ElementType = typeof defaultTagName>({
	as,
	children,
	className,
	...otherProps
}: ColumnProps<E>) => {
	const TagName = as || defaultTagName

	return (
		<TagName
			className={ cn('dis-flex dir-column nowrap', className) }
			{ ...otherProps }
		>
			{ children }
		</TagName>
	)
}