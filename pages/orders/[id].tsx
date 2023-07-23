import cn from 'classnames'
import dayjs from 'dayjs'
import { useGetOrderById } from 'entities/order/model/useGetOrderById'
import { OrderProductCard } from 'entities/order/ui/OrderProductCard/OrderProductCard'
import { useRouter } from 'next/router'
import { getCorrectWord } from 'shared/lib/helpers'
import { Row } from 'shared/ui/Row'
import { Section } from 'shared/ui/Section'
import 'dayjs/locale/ru'

export const OrderPage = () => {
	const router = useRouter()
	const { data, isSuccess } = useGetOrderById(Number(router.query.id), !!router.query.id)

	return isSuccess && (
		<Row className={ cn('gap-l', 'justify-between') }>
			<Section
				headline={ `Заказ №${ data.data.id }` }
				label={ (
					<Row className={ cn('gap-m') }>
						<div>{ `От ${ dayjs(data.data.createdAt, { locale: 'ru', format: 'YYYY-MM-DD' }).format('DD.YY.YYYY') }` }</div>
						<div>{ `${ data.data.orderProducts.length } ${ getCorrectWord(data.data.orderProducts.length, ['товар', 'товара', 'товаров']) }` }</div>
					</Row>
				) }
			>
				{ data?.data.orderProducts.map((item) => {
					return (
						<OrderProductCard
							item={ item }
							key={ item.id }
						/>
					)
				}) }
			</Section>
		</Row>
	)
}

export default OrderPage