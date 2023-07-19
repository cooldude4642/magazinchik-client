import { viewerStore } from 'entities/viewer'
import { authStore } from 'features/auth'
import { useAddToFavourite } from 'features/favourite/model/useAddToFavourite'
import { useRemoveFromFavourite } from 'features/favourite/model/useRemoveFromFavourite'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { Button, ButtonProps } from 'shared/ui/Button'
import { IconButton, IconButtonProps } from 'shared/ui/IconButton'

export interface SwitchFavouriteButtonProps extends Omit<ButtonProps, 'children'> {
	productId: number
	isFavourite: boolean
}

export const SwitchFavouriteButton = observer(({ isFavourite, productId, onClick, ...otherProps }: SwitchFavouriteButtonProps) => {
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

	useEffect(() => {
		setAdded(isFavourite)
	}, [isFavourite])

	return (
		<Button
			styleType={ added ? 'text' : 'filled' }
			onClick={ (e) => {
				if (viewerStore.isAuth === true) {
					if (added) {
						add.reset()
						remove.mutate()
					} else {
						remove.reset()
						add.mutate()
					}
				} else if (viewerStore.isAuth === false) {
					authStore.setIsAuthModalWindowVisble(true)
				}
				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			{ added ? 'В любимом' : 'В любимое' }
		</Button>
	)
})