import cn from 'classnames'
import { ComponentProps, ElementType } from 'react'

interface RowOwnProps<E extends ElementType = ElementType> {
	as?: E
}

export type RowProps<E extends ElementType> = RowOwnProps<E> & Omit<ComponentProps<E>, keyof RowOwnProps>

const defaultTagName = 'div'

export const Row = <E extends ElementType = typeof defaultTagName>({
	as,
	children,
	className,
	...otherProps
}: RowProps<E>) => {
	const TagName = as || defaultTagName

	return (
		<TagName
			className={ cn('dis-flex dir-row', className) }
			{ ...otherProps }
		>
			{ children }
		</TagName>
	)
}