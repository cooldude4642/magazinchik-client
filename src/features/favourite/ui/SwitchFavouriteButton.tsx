import { viewerStore } from 'entities/viewer'
import { authStore } from 'features/auth'
import { useAddToFavourite } from 'features/favourite/model/useAddToFavourite'
import { useRemoveFromFavourite } from 'features/favourite/model/useRemoveFromFavourite'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { Button, ButtonProps } from 'shared/ui/Button'

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
		<Button
			LeadingIcon={ IoHeart }
			styleType='text'
			onClick={ (e) => {
				if (viewerStore.isAuth === true) {
					remove.mutate()
				} else {
					authStore.setIsAuthModalWindowVisble(true)
				}

				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			В избранном
		</Button>
	) : (
		<Button
			LeadingIcon={ IoHeartOutline }
			styleType='text'
			onClick={ (e) => {
				if (viewerStore.isAuth === true) {
					add.mutate()
				} else {
					authStore.setIsAuthModalWindowVisble(true)
				}

				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			В избранное
		</Button>
	)
})