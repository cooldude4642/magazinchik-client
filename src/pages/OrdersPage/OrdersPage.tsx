import styles from './OrdersPage.module.sass'
import cn from 'classnames'
import { useGetAllUserOrders } from 'entities/order/model/useGetAllUserOrders'
import { OrderCard } from 'entities/order/ui/OrderCard/OrderCard'
import { viewerStore } from 'entities/viewer'
import { observer } from 'mobx-react-lite'
import { getCorrectWord } from 'shared/lib/helpers'
import { Column, ColumnProps } from 'shared/ui/Column'
import { Section } from 'shared/ui/Section'

interface OrdersPageProps extends Omit<ColumnProps<'div'>, 'children'> {}

export const OrdersPage = observer(({ className, ...otherProps }: OrdersPageProps) => {
	const { data, isSuccess } = useGetAllUserOrders(viewerStore.isAuth)

	return isSuccess && (
		<Column
			className={ cn(className) }
			{ ...otherProps }
		>
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
		</Column>
	)
})