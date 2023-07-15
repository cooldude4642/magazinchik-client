import styles from './ProductCard.module.sass'
import cn from 'classnames'
import { BodyText, HeadlineText, LabelText, TitleText } from 'shared/ui/Typography'
import { Stars } from '../Stars/Stars'
import { Column } from 'shared/ui/Column'
import { Row } from 'shared/ui/Row'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

export interface ProductCardProps extends Omit<Parameters<typeof Link>[0], 'children' | 'href' | 'target'> {
	product: {
		id: number
		photoId?: number
		name?: string
		price?: number
		averageRating?: number
		totalRates?: number
	}
	BottomSlot?: (props: { onClick?: MouseEventHandler }) => JSX.Element
	TopRightSlot?: (props: { className?: string, onClick?: MouseEventHandler }) => JSX.Element
}

export const ProductCard = ({ BottomSlot, TopRightSlot, product, className, ...otherProps }: ProductCardProps) => {
	
	return (
		<Link
			href={ `/product/${ product.id }` }
			target='_blank'
			className={ cn(styles.container, className) }
			draggable={ false }
			{ ...otherProps }
		>
			{ product.photoId && (
				<img
					draggable={ false }
					alt={ `${ product.photoId }` }
					src={ `${ process.env.NEXT_PUBLIC_API_URL }/photo?photoId=${ product.photoId }` }
					className={ cn(styles.photo, styles.head) }
				/>
			) }
			{ !product.photoId && <div className={ cn(styles.placeholder, styles.head) }/> } 
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
							<BodyText className={ cn('clr-out') }>{ product.totalRates ?? 0 }</BodyText>
						</Row>
					</Column>
					<TitleText className={ cn(styles.name) }>{ product.name ?? 'Имя продукта' }</TitleText>
				</Column>
				<BottomSlot onClick={ (e) => e.preventDefault() }/>
			</Column>
			<TopRightSlot
				className={ cn(styles['top-right']) }
				onClick={ (e) => e.preventDefault() }
			/>
		</Link>
	)
}