import styles from './OrdersPage.module.sass'
import cn from 'classnames'
import { useCheckPayment } from 'entities/order/model/useCheckPayment'
import { useGetAllUserOrders } from 'entities/order/model/useGetAllUserOrders'
import { OrderCard } from 'entities/order/ui/OrderCard/OrderCard'
import { observer } from 'mobx-react-lite'
import { getCorrectWord } from 'shared/lib/helpers'
import { Section } from 'shared/ui/Section'

export const OrdersPage = observer(() => {
	const paymentQuery = useCheckPayment()
	const { data, isSuccess } = useGetAllUserOrders(paymentQuery.isSuccess)

	return isSuccess && (
		<Section
			headline='Заказы'
			label={ data.data.count ? `${ data.data.count } ${ getCorrectWord(data.data.count, ['заказ', 'заказа', 'заказов']) }` : 'У вас пока что нет заказов' }
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