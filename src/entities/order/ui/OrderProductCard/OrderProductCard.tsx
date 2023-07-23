import styles from './OrderProductCard.module.sass'
import cn from 'classnames'
import Link from 'next/link'
import { OrderProduct } from 'shared/api/order/types'
import { getCorrectWord } from 'shared/lib/helpers'
import { Column } from 'shared/ui/Column'
import { Row } from 'shared/ui/Row'
import { BodyText, HeadlineText, TitleText } from 'shared/ui/Typography'

interface OrderProductCardProps extends Omit<Parameters<typeof Link>[0], 'children' | 'href' | 'prefetch' | 'dragable'> {
	item: OrderProduct
}

export const OrderProductCard = ({ item, className, ...otherProps }: OrderProductCardProps) => {

	return (
		<Link
			prefetch={ false }
			target='_blank'
			href={ `/product/${ item.product.id }` }
			className={ cn(styles.container, className) }
			draggable={ false }
			{ ...otherProps }
		>
			{ !!item.product.photos.length && (
				<img
					draggable={ false }
					alt={ `${ item.product.photos.sort((a, b) => a.order - b.order)[0].id }` }
					src={ `${ process.env.NEXT_PUBLIC_API_URL }/photo?photoId=${ item.product.photos.sort((a, b) => a.order - b.order)[0].id }` }
					className={ cn(styles.photo, styles.head) }
				/>
			) }
			{ !item.product.photos.length && <div className={ cn(styles.placeholder, styles.head) }/> }
			<Column className={ cn(styles.content) }>
				<Row className={ cn(styles['top-row'], 'gap-xl') }>
					<Column className={ cn(styles.title ,'gap-xs') }>
						<Column>
							<HeadlineText
								size='small'
								className={ cn('clr-on-surf') }
							>
								{ `${ item.totalPrice } ₽` }
							</HeadlineText>
							<BodyText className={ cn('clr-out') }>{ `${ item.productCount } ${ getCorrectWord(item.productCount, ['штука', 'штуки', 'штук']) }` }</BodyText>
						</Column>
						<TitleText className={ cn(styles.name) }>{ item.product.name ?? 'Имя продукта' }</TitleText>
					</Column>
				</Row>
			</Column>
		</Link>
	)
}