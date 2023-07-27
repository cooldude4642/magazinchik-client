import styles from './OrderCard.module.sass'
import cn from 'classnames'
import Link from 'next/link'
import { Order } from 'shared/api/order/types'
import { getCorrectWord } from 'shared/lib/helpers'
import { Column } from 'shared/ui/Column'
import { Row } from 'shared/ui/Row'
import { BodyText, HeadlineText, TitleText } from 'shared/ui/Typography'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { orderStatuses } from 'entities/order/model/orderStatuses'
dayjs.locale('ru')


interface OrderCardProps extends Omit<Parameters<typeof Link>[0], 'children' | 'href' | 'prefetch' | 'dragable'> {
	order: Order
}

export const OrderCard = ({ order, className, ...otherProps }: OrderCardProps) => {
	
	return (
		<Link
			prefetch={ false }
			target='_blank'
			href={ `/orders/${ order.id }` }
			className={ cn(styles.container, className) }
			draggable={ false }
			{ ...otherProps }
		>
			{ order.orderProducts.slice(0, 1).map(element => {
				if (element.product.photos.length) {
					const photoId = element.product.photos.sort((a, b) => a.order - b.order)[0].id

					return (
						<img
							key={ photoId }
							draggable={ false }
							alt={ `${ photoId }` }
							src={ `${ process.env.NEXT_PUBLIC_API_URL }/photo?photoId=${ photoId }` }
							className={ cn(styles.photo, styles.head) }
						/>
					)
				} else {
					return (
						<div
							key={ element.product.id }
							className={ cn(styles.placeholder, styles.head) }
						/>
					)
				}
			}) }
			<Column className={ cn(styles.content) }>
				<Row className={ cn(styles['top-row'], 'gap-xl') }>
					<Column className={ cn(styles.title ,'gap-xs') }>
						<Column>
							<HeadlineText
								size='small'
								className={ cn('clr-on-surf') }
							>
								{ `${ order.price } ₽` }
							</HeadlineText>
							<Row className={ cn('gap-m') }>
								<BodyText className={ cn('clr-out') }>{ `От ${ dayjs(order.createdAt, { locale: 'ru', format: 'YYYY-MM-DD' }).format('DD.YY.YYYY') }` }</BodyText>
								<BodyText className={ cn('clr-out') }>{ `${ order.orderProducts.length } ${ getCorrectWord(order.orderProducts.length, ['товар', 'товара', 'товаров']) }` }</BodyText>
								<BodyText className={ cn('clr-out') }>{ orderStatuses[order.orderStatus] }</BodyText>
							</Row>
						</Column>
						<TitleText className={ cn(styles.name) }>{ `Заказ №${ order.id }` }</TitleText>
					</Column>
				</Row>
			</Column>
		</Link>
	)
}