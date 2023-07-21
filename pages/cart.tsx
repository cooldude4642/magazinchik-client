import { useGetAllCartProducts } from 'entities/product/model/useGetAllCartProducts'
import { observer } from 'mobx-react-lite'
import { getCorrectWord } from 'shared/lib/helpers/getCorrectWord'
import { CardSection } from 'shared/ui/CardSection'
import { BodyText } from 'shared/ui/Typography'
import { CartProductCardWidget } from 'widgets/CartProductCardWidget/CartProductCardWidget'

const CartPage = observer(() => {
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
})

export default CartPage