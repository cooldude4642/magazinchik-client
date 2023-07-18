import axios from 'axios'
import { ProductCard } from 'entities/product'
import { useGetAllCartProducts } from 'entities/product/model/useGetAllCartProducts'
import { RemoveFromCartButton } from 'features/cart/ui/RemoveFromCartButton'
import { SwitchFavouriteIconButton } from 'features/favourite'
import { observer } from 'mobx-react-lite'
import { GetServerSideProps } from 'next'
import { CardCarouselSection } from 'shared/ui/CardCarouselSection'

const CartPage = observer(() => {
	const { data } = useGetAllCartProducts()

	return !!data?.data?.rows.length && (
		<CardCarouselSection headline='Корзина'>
			{ data.data.rows.map((element) => (
				<ProductCard
					product={ element.product }
					key={ data.data.rows.indexOf(element) }
					topRightSlot={ (
						<SwitchFavouriteIconButton
							productId={ element.product.id }
							isFavourite={ element.product.isFavourite }
						/>
					) }
					bottomSlot={ <RemoveFromCartButton productId={ element.product.id }/> }
				/>
			)) }
		</CardCarouselSection>
	)
})

export default CartPage

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const cookie = context.req.headers.cookie
		const response = await axios.get(`${ process.env.NEXT_PUBLIC_API_URL }/auth/refresh`, { headers: { cookie } })
		context.res.setHeader('set-cookie', response.headers['set-cookie'] as string[])

		return {
			props: {}
		}
	} catch (error) {
		
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}
}