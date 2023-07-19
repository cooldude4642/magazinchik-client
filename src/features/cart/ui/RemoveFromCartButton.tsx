import { Button, ButtonProps } from 'shared/ui/Button'
import { useRemoveFromCart } from '../model/useRemoveFromCart'
import { IoBagRemoveOutline } from 'react-icons/io5'

export interface RemoveFromCartButtonProps extends Omit<ButtonProps, 'children'> {
	productId: number
}

export const RemoveFromCartButton = ({ productId, onClick, ...otherProps }: RemoveFromCartButtonProps) => {
	const { mutate } = useRemoveFromCart(productId)

	return (
		<Button
			LeadingIcon={ IoBagRemoveOutline }
			styleType='text'
			onClick={ (e) => {
				mutate()
				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			Удалить
		</Button>
	)
}