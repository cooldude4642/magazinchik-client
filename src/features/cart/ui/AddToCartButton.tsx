import { Button, ButtonProps } from 'shared/ui/Button'
import { useAddToCart } from '../model/useAddToCart'

export interface AddToCartButtonProps extends Omit<ButtonProps, 'children'> {
	productId: number
}

export const AddToCartButton = ({ productId, onClick, ...otherProps }: AddToCartButtonProps) => {
	const { mutate } = useAddToCart(productId)

	return (
		<Button
			onClick={ (e) => {
				mutate()
				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			Добавить в корзину
		</Button>
	)
}