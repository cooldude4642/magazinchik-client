import { useAddToFavourite } from 'features/favourite/model/useAddToFavourite'
import { useRemoveFromFavourite } from 'features/favourite/model/useRemoveFromFavourite'
import { useEffect, useState } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { IconButton, IconButtonProps } from 'shared/ui/IconButton'

export interface SwitchFavouriteIconButtonProps extends Omit<IconButtonProps, 'styleType' | 'IconOutlined' | 'IconFilled'> {
	productId: number
	isFavourite: boolean
}

export const SwitchFavouriteIconButton = ({ isFavourite, productId, onClick, ...otherProps }: SwitchFavouriteIconButtonProps) => {
	const [added, setAdded] = useState(isFavourite)
	const add = useAddToFavourite(productId)
	const remove = useRemoveFromFavourite(productId)

	useEffect(() => {
		if (add.isSuccess) {
			setAdded(true)
		} else if (remove.isSuccess) {
			setAdded(false)
		}
	}, [add.isSuccess, remove.isSuccess])

	return (
		<IconButton
			IconOutlined={ IoHeartOutline }
			IconFilled={ IoHeart }
			styleType='tonal'
			selected={ added }
			onClick={ (e) => {
				if (added) {
					add.reset
					remove.mutate()
				} else {
					remove.reset()
					add.mutate()
				}
				onClick && onClick(e)
			} }
			{ ...otherProps }
		/>
	)
}