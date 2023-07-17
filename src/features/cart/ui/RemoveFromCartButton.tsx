import { Button, ButtonProps } from 'shared/ui/Button'
import { useRemoveFromCart } from '../model/useRemoveFromCart'

export interface RemoveFromCartButtonProps extends Omit<ButtonProps, 'children'> {
	productId: number
}

export const RemoveFromCartButton = ({ productId, onClick, ...otherProps }: RemoveFromCartButtonProps) => {
	const { mutate } = useRemoveFromCart(productId)

	return (
		<Button
			styleType='text'
			onClick={ (e) => {
				mutate()
				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			Убрать из корзины
		</Button>
	)
}