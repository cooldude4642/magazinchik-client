import axios from 'axios'
import { useGetAllCartProducts } from 'entities/product/model/useGetAllCartProducts'
import { CartProductCard } from 'entities/product/ui/CartProductCard/CartProductCard'
import { AddToCartIconButton } from 'features/cart/ui/AddToCartIconButton'
import { DecreaseFromCartIconButton } from 'features/cart/ui/DecreaseFromCartIconButton'
import { RemoveFromCartButton } from 'features/cart/ui/RemoveFromCartButton'
import { SwitchFavouriteIconButton } from 'features/favourite'
import { SwitchFavouriteButton } from 'features/favourite/ui/SwitchFavouriteButton'
import { GetServerSideProps } from 'next'
import { CardSection } from 'shared/ui/CardSection'
import { Column } from 'shared/ui/Column'
import { Row } from 'shared/ui/Row'
import { BodyText, HeadlineText } from 'shared/ui/Typography'
import { OnlyNumberFiled } from 'shared/ui/fields/OnlyNumberFiled/OnlyNumberField'

const CartPage = () => {
	const { data } = useGetAllCartProducts()

	return (
		<CardSection headline='Корзина'>
			{ data && data?.data?.rows.length > 0 ? data?.data?.rows.map((element) => (
				<CartProductCard
					topRightSlot={ (
						<Row>
							<AddToCartIconButton productId={ element.product.id }/>
							<OnlyNumberFiled value={ element.productCount }/>
							<DecreaseFromCartIconButton
								productId={ element.product.id }
								disabled={ element.productCount === 1 }
							/>
						</Row>
					) }
					bottomSlot={ [(
						<SwitchFavouriteButton
							key={ 1 }
							productId={ element.product.id }
							isFavourite={ element.product.isFavourite }
						/>
					), (
						<RemoveFromCartButton
							key={ 2 }
							productId={ element.product.id }
						/>
					)] }
					key={ element.id }
					item={ element }
				/>
			)) : <BodyText>В вашей корзине пока что нет товаров</BodyText> }
		</CardSection>
	)
}

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