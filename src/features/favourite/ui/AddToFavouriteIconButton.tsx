import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { IconButton, IconButtonProps } from 'shared/ui/IconButton'
import { useAddToFavourite } from '../model/useAddToFavourite'

export interface AddToFavouriteIconButtonProps extends Omit<IconButtonProps, 'styleType' | 'IconOutlined' | 'IconFilled'> {
	productId: number
}

export const AddToFavouriteIconButton = ({ productId, onClick, ...otherProps }: AddToFavouriteIconButtonProps) => {
	const { mutate } = useAddToFavourite(productId)

	return (
		<IconButton
			IconOutlined={ IoHeartOutline }
			IconFilled={ IoHeart }
			styleType='tonal'
			selected
			onClick={ (e) => {
				mutate()
				onClick && onClick(e)
			} }
			{ ...otherProps }
		/>
	)
}