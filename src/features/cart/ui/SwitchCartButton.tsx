import { useEffect, useState } from 'react'
import { Button, ButtonProps } from 'shared/ui/Button'
import { useAddToCart } from '../model/useAddToCart'
import { useRemoveFromCart } from '../model/useRemoveFromCart'
import { observer } from 'mobx-react-lite'
import { productStore } from 'entities/product/lib/productStore'
import { viewerStore } from 'entities/viewer'
import { authStore } from 'features/auth'

export interface SwitchCartButtonProps extends Omit<ButtonProps, 'children'> {
	productId: number
	isInCart: boolean
}

export const SwitchCartButton = observer(({ productId, isInCart, onClick, ...otherProps }: SwitchCartButtonProps) => {
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

	useEffect(() => {
		console.log('effect')
	}, [productStore.products])

	return (
		<Button
			styleType={ added ? 'text' : 'filled' }
			onClick={ (e) => {
				if (viewerStore.isAuth === true) {
					if (added) {
						add.reset()
						remove.mutate()
					} else {
						remove.reset()
						add.mutate()
					}
				} else if (viewerStore.isAuth === false) {
					authStore.setIsAuthModalWindowVisble(true)
				}
				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			{ added ? 'Убрать из корзины' : 'Добавить в корзину' }
		</Button>
	)
})