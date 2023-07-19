import { IconButton, IconButtonProps } from 'shared/ui/IconButton'
import { useAddToCart } from '../model/useAddToCart'
import { IoAdd, IoAddOutline } from 'react-icons/io5'

export interface AddToCartIconButtonProps extends Omit<IconButtonProps, 'IconFilled' | 'IconOutlined'> {
	productId: number
}

export const AddToCartIconButton = ({ productId, onClick, ...otherProps }: AddToCartIconButtonProps) => {
	const { mutate } = useAddToCart(productId)

	return (
		<IconButton
			IconFilled={ IoAdd }
			IconOutlined={ IoAddOutline }
			onClick={ (e) => {
				mutate()
				onClick && onClick(e)
			} }
			{ ...otherProps }
		/>
	)
}