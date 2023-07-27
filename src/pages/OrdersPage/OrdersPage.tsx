import styles from './OrdersPage.module.sass'
import cn from 'classnames'
import { useGetAllUserOrders } from 'entities/order/model/useGetAllUserOrders'
import { OrderCard } from 'entities/order/ui/OrderCard/OrderCard'
import { PurchaseButton } from 'features/order/ui/PayButton/PayButton'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { getCorrectWord } from 'shared/lib/helpers'
import { Section } from 'shared/ui/Section'

export const OrdersPage = observer(() => {
	const { data, isSuccess } = useGetAllUserOrders()

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