import styles from './CartPage.module.sass'
import { useGetAllCartProducts } from 'entities/product/model/useGetAllCartProducts'
import { observer } from 'mobx-react-lite'
import { getCorrectWord } from 'shared/lib/helpers/getCorrectWord'
import { Section } from 'shared/ui/Section'
import { CartProductCardWidget } from 'widgets/CartProductCardWidget/CartProductCardWidget'

export const CartPage = observer(() => {
	const { data, isSuccess } = useGetAllCartProducts()
	
	return isSuccess && (
		<Section
			headline='Корзина'
			label={ data.data.count > 0 ? `${ data.data.count } ${ getCorrectWord(data.data.count, ['товар', 'товара', 'товаров']) }` : 'В вашей корзине пока что нет товаров' }
		>
			{ data.data.rows.map((element) => (
				<CartProductCardWidget
					key={ element.id }
					item={ element }
				/>
			)) }
		</Section>
	)
})