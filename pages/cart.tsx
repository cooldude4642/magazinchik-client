import axios from 'axios'
import { useGetAllCartProducts } from 'entities/product/model/useGetAllCartProducts'
import { GetServerSideProps } from 'next'
import { getCorrectWord } from 'shared/lib/helpers/getCorrectWord'
import { CardSection } from 'shared/ui/CardSection'
import { BodyText } from 'shared/ui/Typography'
import { CartProductCardWidget } from 'widgets/CartProductCardWidget/CartProductCardWidget'

const CartPage = () => {
	const { data, isLoading } = useGetAllCartProducts()

	return (
		<CardSection
			headline='Корзина'
			addedText={ (data && data?.data?.count) ? `${ data?.data?.count } ${ getCorrectWord(data?.data?.count, ['товар', 'товара', 'товаров']) }` : undefined }
		>
			{ data && data?.data?.rows.length > 0 ? data?.data?.rows.map((element) => (
				<CartProductCardWidget
					key={ element.id }
					item={ element }
				/>
			)) : !isLoading && <BodyText>В вашей корзине пока что нет товаров</BodyText> }
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