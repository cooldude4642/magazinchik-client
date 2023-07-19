import axios from 'axios'
import { ProductCard } from 'entities/product'
import { productStore } from 'entities/product/lib/productStore'
import { useGetAllCartProducts } from 'entities/product/model/useGetAllCartProducts'
import { viewerStore } from 'entities/viewer'
import { SwitchCartButton } from 'features/cart'
import { RemoveFromCartButton } from 'features/cart/ui/RemoveFromCartButton'
import { SwitchFavouriteIconButton } from 'features/favourite'
import { observer } from 'mobx-react-lite'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { CartProduct } from 'shared/api/cart/types'
import { CardCarouselSection } from 'shared/ui/CardCarouselSection'
import { BodyText, DisplayText } from 'shared/ui/Typography'

const CartPage = observer(() => {
	const { data, refetch } = useGetAllCartProducts(false)

	useEffect(() => {
		viewerStore.isAuth !== undefined && refetch()
	}, [viewerStore.isAuth])

	return (
		<CardCarouselSection headline='Корзина'>
			{ data && data?.data?.rows.length > 0 ? data?.data?.rows.map((element) => (
				<ProductCard
					product={ element.product }
					key={ data?.data?.rows.indexOf(element) }
					topRightSlot={ (
						<SwitchFavouriteIconButton
							productId={ element.product.id }
							isFavourite={ element.product.isFavourite }
						/>
					) }
					bottomSlot={ (
						<SwitchCartButton
							productId={ element.product.id }
							isInCart={ element.product.isInCart }
						/>
					) }
				/>
			)) : <BodyText>В вашей корзине пока что нет товаров</BodyText> }
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