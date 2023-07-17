import { useEffect, useState } from 'react'
import { Button, ButtonProps } from 'shared/ui/Button'
import { useAddToCart } from '../model/useAddToCart'
import { useRemoveFromCart } from '../model/useRemoveFromCart'

export interface SwitchCartButtonProps extends Omit<ButtonProps, 'children'> {
	productId: number
	isInCart: boolean
}

export const SwitchCartButton = ({ productId, isInCart, onClick, ...otherProps }: SwitchCartButtonProps) => {
	const [added, setAdded] = useState(isInCart)
	const add = useAddToCart(productId)
	const remove = useRemoveFromCart(productId)

	useEffect(() => {
		if (add.isSuccess) {
			setAdded(true)
		} else if (remove.isSuccess) {
			setAdded(false)
		}
	}, [add.isSuccess, remove.isSuccess])

	return (
		<Button
			styleType={ added ? 'text' : 'filled' }
			onClick={ (e) => {
				if (added) {
					add.reset
					remove.mutate()
				} else {
					remove.reset()
					add.mutate()
				}
				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			{ added ? 'Убрать из корзины' : 'Добавить в корзину' }
		</Button>
	)
}