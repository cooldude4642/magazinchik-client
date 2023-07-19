import { viewerStore } from 'entities/viewer'
import { authStore } from 'features/auth'
import { useAddToFavourite } from 'features/favourite/model/useAddToFavourite'
import { useRemoveFromFavourite } from 'features/favourite/model/useRemoveFromFavourite'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { IconButton, IconButtonProps } from 'shared/ui/IconButton'

export interface SwitchFavouriteIconButtonProps extends Omit<IconButtonProps, 'styleType' | 'IconOutlined' | 'IconFilled'> {
	productId: number
	isFavourite: boolean
}

export const SwitchFavouriteIconButton = observer(({ isFavourite, productId, onClick, ...otherProps }: SwitchFavouriteIconButtonProps) => {
	const [added, setAdded] = useState(isFavourite)
	const add = useAddToFavourite(productId)
	const remove = useRemoveFromFavourite(productId)

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
		setAdded(isFavourite)
	}, [isFavourite])

	return added ? (
		<IconButton
			IconOutlined={ IoHeartOutline }
			IconFilled={ IoHeart }
			styleType='tonal'
			selected
			onClick={ (e) => {
				if (viewerStore.isAuth === true) {
					remove.mutate()
				} else if (viewerStore.isAuth === false) {
					authStore.setIsAuthModalWindowVisble(true)
				}
				
				onClick && onClick(e)
			} }
			{ ...otherProps }
		/>
	) : (
		<IconButton
			IconOutlined={ IoHeartOutline }
			IconFilled={ IoHeart }
			styleType='tonal'
			onClick={ (e) => {
				if (viewerStore.isAuth === true) {
					add.mutate()
				} else if (viewerStore.isAuth === false) {
					authStore.setIsAuthModalWindowVisble(true)
				}
				
				onClick && onClick(e)
			} }
			{ ...otherProps }
		/>
	)
})