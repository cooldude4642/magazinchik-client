import styles from './ProductCard.module.sass'
import cn from 'classnames'
import { BodyText, HeadlineText, TitleText } from 'shared/ui/Typography'
import { Stars } from '../Stars/Stars'
import { Column } from 'shared/ui/Column'
import { Row } from 'shared/ui/Row'
import Link from 'next/link'
import { cloneElement } from 'react'
import { ProductCard as IProductCard } from 'shared/api/product'

export interface ProductCardProps extends Omit<Parameters<typeof Link>[0], 'children' | 'href' | 'target'> {
	product: IProductCard
	bottomSlot?: JSX.Element
	topRightSlot?: JSX.Element
}

export const ProductCard = ({ bottomSlot, topRightSlot, product, className, ...otherProps }: ProductCardProps) => {
	
	if (bottomSlot) {
		bottomSlot = cloneElement(bottomSlot, { onClick: (e: MouseEvent) => e.preventDefault() })
	}

	if (topRightSlot) {
		topRightSlot = cloneElement(topRightSlot, { onClick: (e: MouseEvent) => e.preventDefault(), className: styles['top-right'] })
	}

	return (
		<Link
			href={ `/product/${ product.id }` }
			target='_blank'
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
			<Column className={ cn('gap-xl pad-m') }>
				<Column className={ cn('gap-m') }>
					<Column>
						<HeadlineText
							size='small'
							className={ cn('clr-on-surf') }
						>
							{ `${ product.price ?? 0 } ₽` }
						</HeadlineText>
						<Row className={ cn('gap-m') }>
							<Row className={ cn('gap-xs align-center') }>
								<Stars
									rate={ product.averageRating ?? 0 }
									className={ cn('clr-out') }
								/>
								<BodyText className={ cn('clr-out') }>{ product.averageRating }</BodyText>
							</Row>
							<BodyText className={ cn('clr-out') }>{ product.rateCount ?? 0 }</BodyText>
						</Row>
					</Column>
					<TitleText className={ cn(styles.name) }>{ product.name ?? 'Имя продукта' }</TitleText>
				</Column>
				{ bottomSlot && bottomSlot }
			</Column>
			{ topRightSlot && topRightSlot }
		</Link>
	)
}