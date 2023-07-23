import { useGetAllUserOrders } from 'entities/order/model/useGetAllUserOrders'
import { OrderCard } from 'entities/order/ui/OrderCard/OrderCard'
import { viewerStore } from 'entities/viewer'
import { observer } from 'mobx-react-lite'
import { getCorrectWord } from 'shared/lib/helpers'
import { Section } from 'shared/ui/Section'

const OrdersPage = observer(() => {
	const { data, isSuccess } = useGetAllUserOrders(viewerStore.isAuth)

	return isSuccess && (
		<Section
			headline='Заказы'
			label={ data.data.rows.length ? `${ data.data.rows.length } ${ getCorrectWord(data.data.rows.length, ['заказ', 'заказа', 'заказов']) }` : 'У вас пока что нет заказов' }
		>
			{ data.data.rows.map(order => (
				<OrderCard
					key={ order.id }
					order={ order }
				/>
			)) }
		</Section>
	)
})

export default OrdersPage