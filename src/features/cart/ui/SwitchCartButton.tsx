import { useEffect, useState } from 'react'
import { Button, ButtonProps } from 'shared/ui/Button'
import { useAddToCart } from '../model/useAddToCart'
import { useRemoveFromCart } from '../model/useRemoveFromCart'
import { observer } from 'mobx-react-lite'
import { viewerStore } from 'entities/viewer'
import { authStore } from 'features/auth'
import { IoBagAddOutline, IoBagCheckOutline } from 'react-icons/io5'

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
			add.reset()
			setAdded(true)
		} else if (remove.isSuccess) {
			remove.reset()
			setAdded(false)
		}
	}, [add.isSuccess, remove.isSuccess])

	useEffect(() => {
		setAdded(isInCart)
	}, [isInCart])

	return added ? (
		<Button
			LeadingIcon={ IoBagCheckOutline }
			styleType='text'
			onClick={ (e) => {
				if (viewerStore.isAuth === true) {
					remove.mutate()
				} else {
					authStore.setIsAuthModalWindowVisble(true)
				}

				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			В корзине
		</Button>
	) : (
		<Button
			LeadingIcon={ IoBagAddOutline }
			onClick={ (e) => {
				if (viewerStore.isAuth === true) {
					add.mutate()
				} else {
					authStore.setIsAuthModalWindowVisble(true)
				}

				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			В корзину
		</Button>
	)
})