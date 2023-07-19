import { IoRemove, IoRemoveOutline } from 'react-icons/io5'
import { IconButton, IconButtonProps } from 'shared/ui/IconButton'
import { useDecreaseFromCart } from '../model/useDecreaseFromCart'

export interface DecreaseFromCartIconButtonProps extends Omit<IconButtonProps, 'IconFilled' | 'IconOutlined'> {
	productId: number
}

export const DecreaseFromCartIconButton = ({ productId, onClick, ...otherProps }: DecreaseFromCartIconButtonProps) => {
	const { mutate } = useDecreaseFromCart(productId)

	return (
		<IconButton
			IconFilled={ IoRemove }
			IconOutlined={ IoRemoveOutline }
			onClick={ (e) => {
				mutate()
				onClick && onClick(e)
			} }
			{ ...otherProps }
		/>
	)
}