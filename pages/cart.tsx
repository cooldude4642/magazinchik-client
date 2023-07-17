import { useGetAllCartProducts } from 'entities/cart/model/useGetAllCartProducts'
import { observer } from 'mobx-react-lite'
import { HeadlineText } from 'shared/ui/Typography'

const CartPage = observer(() => {
	const { data } = useGetAllCartProducts()

	console.log(data)

	return (
		<HeadlineText>Корзина</HeadlineText>
	)
})

export default CartPage