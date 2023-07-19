import cn from 'classnames'
import { CartProductCard, CartProductCardProps } from 'entities/product/ui/CartProductCard/CartProductCard'
import { AddToCartIconButton } from 'features/cart/ui/AddToCartIconButton'
import { DecreaseFromCartIconButton } from 'features/cart/ui/DecreaseFromCartIconButton'
import { RemoveFromCartButton } from 'features/cart/ui/RemoveFromCartButton'
import { SwitchFavouriteButton } from 'features/favourite/ui/SwitchFavouriteButton'
import { CartItem } from 'shared/api/cart/types'
import { Row } from 'shared/ui/Row'
import { OnlyNumberFiled } from 'shared/ui/fields/OnlyNumberFiled/OnlyNumberField'

interface CartProductCardWidgetProps extends Omit<CartProductCardProps, 'item' | 'topRightSlot' | 'bottomSlot'> {
	item: CartItem
}

export const CartProductCardWidget = ({ item, className, ...otherProps }: CartProductCardWidgetProps) => {
	
	return (
		<CartProductCard
			item={ item }
			topRightSlot={ (
				<Row className={ cn('gap-xxs') }>
					<AddToCartIconButton productId={ item.product.id }/>
					<OnlyNumberFiled value={ item.productCount }/>
					<DecreaseFromCartIconButton
						productId={ item.product.id }
						disabled={ item.productCount === 1 }
					/>
				</Row>
			) }
			bottomSlot={ (
				<Row className={ cn('gap-xs') }>
					<SwitchFavouriteButton
						key={ 1 }
						productId={ item.product.id }
						isFavourite={ item.product.isFavourite }
					/>
					<RemoveFromCartButton
						key={ 2 }
						productId={ item.product.id }
					/>
				</Row>
			) }
			{ ...otherProps }
		/>
	)
}