import { ProductCard, ProductCardProps } from 'entities/product'
import { SwitchCartButton } from 'features/cart'
import { SwitchFavouriteIconButton } from 'features/favourite'

interface ProductCardWidgetProps extends Omit<ProductCardProps, 'BottomSlot' | 'TopRightSlot'> {}

export const ProductCardWidget = ({ product, ...otherProps }: ProductCardWidgetProps) => {

	return (
		<ProductCard
			product={ product }
			bottomSlot={ (
				<SwitchCartButton
					productId={ product.id }
					isInCart={ product.isInCart }
				/>
			) }
			topRightSlot={ (
				<SwitchFavouriteIconButton
					productId={ product.id }
					isFavourite={ product.isFavourite }
				/>
			) }
			{ ...otherProps }
		/>
	)
}