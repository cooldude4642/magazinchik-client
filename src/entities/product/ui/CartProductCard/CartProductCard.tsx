import styles from './CartProductCard.module.sass'
import cn from 'classnames'
import Link from 'next/link'
import { cloneElement } from 'react'
import { CartItem } from 'shared/api/cart/types'
import { Column } from 'shared/ui/Column'
import { Row } from 'shared/ui/Row'
import { HeadlineText, TitleText } from 'shared/ui/Typography'

export interface CartProductCardProps extends Omit<Parameters<typeof Link>[0], 'children' | 'href' | 'prefetch' | 'dragable'> {
	item: CartItem
	topRightSlot: JSX.Element
	bottomSlot: JSX.Element
}

export const CartProductCard = ({ bottomSlot, topRightSlot, item: { product, productCount }, className, ...otherProps }: CartProductCardProps) => {
	if (topRightSlot) {
		topRightSlot = cloneElement(topRightSlot, { onClick: (e: MouseEvent) => e.preventDefault() })
	}

	if (bottomSlot) {
		bottomSlot = cloneElement(bottomSlot, { onClick: (e: MouseEvent) => e.preventDefault() })
	}

	return (
		<Link
			prefetch={ false }
			target='_blank'
			href={ `/product/${ product.id }` }
			className={ cn(styles.container, className) }
			draggable={ false }
			{ ...otherProps }
		>
			{ !!product.photos.length && (
				<img
					draggable={ false }
					alt={ `${ product.photos.sort((a, b) => a.order - b.order)[0].id }` }
					src={ `${ process.env.NEXT_PUBLIC_API_URL }/photo?photoId=${ product.photos.sort((a, b) => a.order - b.order)[0].id }` }
					className={ cn(styles.photo, styles.head) }
				/>
			) }
			{ !product.photos.length && <div className={ cn(styles.placeholder, styles.head) }/> }
			<Column className={ cn(styles.content) }>
				<Row className={ cn(styles['top-row'], 'gap-xl') }>
					<Column className={ cn(styles.title ,'gap-xs') }>
						<HeadlineText
							size='small'
							className={ cn('clr-on-surf') }
						>
							{ `${ product.price * productCount ?? 0 } ₽` }
						</HeadlineText>
						<TitleText className={ cn(styles.name) }>{ product.name ?? 'Имя продукта' }</TitleText>
					</Column>
					{ topRightSlot }
				</Row>
				<Row className={ cn(styles['bottom-row']) }>
					{ bottomSlot }
				</Row>
			</Column>
		</Link>
	)
}