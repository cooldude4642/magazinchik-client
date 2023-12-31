import './OrderPage.module.sass'
import cn from 'classnames'
import dayjs from 'dayjs'
import { useGetOrderById } from 'entities/order/model/useGetOrderById'
import { OrderProductCard } from 'entities/order/ui/OrderProductCard/OrderProductCard'
import { useRouter } from 'next/router'
import { getCorrectWord } from 'shared/lib/helpers'
import { Row } from 'shared/ui/Row'
import { Section } from 'shared/ui/Section'
import 'dayjs/locale/ru'
import { Column } from 'shared/ui/Column'
import { OfferContainer } from 'shared/ui/OfferContainer/OfferContainer'
import { BodyText, HeadlineText } from 'shared/ui/Typography'
import { orderStatuses } from 'entities/order/model/orderStatuses'
import { observer } from 'mobx-react-lite'
import { PayButton } from 'features/order/ui/PayButton/PayButton'
import { orderStore } from 'features/order/lib/orderStore'
import { useCheckPayment } from 'entities/order/model/useCheckPayment'
import { Button } from 'shared/ui/Button'
import { IoCardOutline, IoChatboxOutline } from 'react-icons/io5'
import { reviewStore } from 'features/review/lib/reviewStore'

export const OrderPage = observer(() => {
	const router = useRouter()
	const paymentQuery = useCheckPayment()
	const { data, isSuccess } = useGetOrderById(Number(router.query.id), !!router.query.id && paymentQuery.isSuccess)

	return isSuccess && (
		
		<Section
			headline={ `Заказ №${ data.data.id }` }
			label={ (
				<Row className={ cn('gap-m') }>
					<div>{ `От ${ dayjs(data.data.createdAt, { locale: 'ru', format: 'YYYY-MM-DD' }).format('DD.YY.YYYY') }` }</div>
					<div>{ `${ data.data.orderProducts.length } ${ getCorrectWord(data.data.orderProducts.length, ['товар', 'товара', 'товаров']) }` }</div>
					<div>{ orderStatuses[data.data.orderStatus] }</div>
				</Row>
			) }
		>
			<Row className={ cn('gap-l', 'justify-between') }>
				<Column className={ cn('gap-m') }>
					{ data.data.orderProducts.map((item) => {
						return (
							<OrderProductCard
								item={ item }
								key={ item.id }
								bottomSlot={ [1, 2, 3].indexOf(data.data.orderStatus) > -1 && (
									<Row className={ cn('justify-end') }>
										<Button
											LeadingIcon={ IoChatboxOutline }
											onClick={ () => {
												reviewStore.setProductId(item.product.id)
												reviewStore.setIsCreateReviewModalWindowVisible(true)
											} }
										>
											Оставить отзыв
										</Button>
									</Row>
								) }
							/>
						)
					}) }
				</Column>
				<OfferContainer
					isLoading={ orderStore.isPayOrderLoading }
					title={ (
						<Row className={ cn('justify-between', 'gap-l') }>
							<div>Итого:</div>
							<div>{ data.data.price } ₽</div>
						</Row>
					) }
					label={ (
						<Column className={ cn('gap-xxs') }>
							<div>{ `${ data.data.orderProducts.length } ${ getCorrectWord(data.data.orderProducts.length, ['товар', 'товара', 'товаров']) }` }</div>
							<div>{ orderStatuses[data.data.orderStatus] }</div>
						</Column>
					) }
				>
					<Column>
						<HeadlineText size='small'>Адрес доставки</HeadlineText>
						<BodyText className={ cn('clr-out') }>г. { data.data.address.city }, ул. { data.data.address.street }, д. { data.data.address.house }, кв. { data.data.address.flat }</BodyText>
					</Column>
					{ data.data.orderStatus === 0 && (!data.data.url ? (
						<PayButton orderId={ data.data.id }/>
					) : (
						<Button
							onClick={ () => window.location.href = data.data.url }
							LeadingIcon={ IoCardOutline }
						>
							Оплатить заказ
						</Button>
					)) }
				</OfferContainer>
			</Row>
		</Section>
	)
})

export default OrderPage