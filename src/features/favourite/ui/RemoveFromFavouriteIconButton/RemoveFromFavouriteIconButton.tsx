import { useRemoveFromFavourite } from 'features/favourite/model/useRemoveFromFavourite'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { IconButton, IconButtonProps } from 'shared/ui/IconButton'

export interface RemoveFromFavouriteIconButtonProps extends Omit<IconButtonProps, 'styleType' | 'IconOutlined' | 'IconFilled'> {
	productId: number
}

export const RemoveFromFavouriteIconButton = ({ productId, onClick, ...otherProps }: RemoveFromFavouriteIconButtonProps) => {
	const { mutate, isSuccess } = useRemoveFromFavourite(productId)

	return (
		<>
			{ isSuccess && (
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
			) }
		</>
	)
}