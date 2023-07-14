import { useState } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { IconButton, IconButtonProps } from 'shared/ui/IconButton'

export interface AddToFavouriteIconButtonProps extends Omit<IconButtonProps, 'styleType'> {}

export const AddToFavouriteIconButton = ({ onClick, ...otherProps }: AddToFavouriteIconButtonProps) => {
	const [isSelected, setIsSelected] = useState(false)

	return (
		<IconButton
			IconOutlined={ IoHeartOutline }
			IconFilled={ IoHeart }
			styleType='tonal'
			selected={ isSelected }
			onClick={ (e) => {
				setIsSelected(!isSelected)
				onClick && onClick(e)
			} }
			{ ...otherProps }
		/>
	)
}