import { ProductCard } from 'entities/product'
import { useGetAllCartProducts } from 'entities/product/model/useGetAllCartProducts'
import { RemoveFromCartButton } from 'features/cart/ui/RemoveFromCartButton'
import { observer } from 'mobx-react-lite'
import { CardCarouselSection } from 'shared/ui/CardCarouselSection'

const CartPage = observer(() => {
	const { data } = useGetAllCartProducts()

	return !!data?.data?.rows.length && (
		<CardCarouselSection headline='Корзина'>
			{ data.data.rows.map((element) => (
				<ProductCard
					product={ element.product }
					key={ data.data.rows.indexOf(element) }
					bottomSlot={ <RemoveFromCartButton productId={ element.product.id }/> }
				/>
			)) }
		</CardCarouselSection>
	)
})

export default CartPage