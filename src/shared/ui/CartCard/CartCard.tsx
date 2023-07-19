import styles from './CartCard.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { CartItem } from 'shared/api/cart/types'

interface CartCardProps extends Omit<ComponentProps<'div'>, 'children'> {
	cart: CartItem[]
}

export const CartCard = ({ className, ...otherProps }: CartCardProps) => {
	
	return (
		<div
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			123
		</div>
	)
}