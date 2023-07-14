import { ProductCard, ProductCardProps } from 'entities/product'
import { AddToCartButton } from 'features/cart'
import { AddToFavouriteIconButton } from 'features/favourite'

interface ProductCardWidgetProps extends Omit<ProductCardProps, 'BottomSlot' | 'TopRightSlot'> {}

export const ProductCardWidget = ({ ...otherProps }: ProductCardWidgetProps) => {
	
	return (
		<ProductCard
			BottomSlot={ AddToCartButton }
			TopRightSlot={ AddToFavouriteIconButton }
			{ ...otherProps }
		/>
	)
}