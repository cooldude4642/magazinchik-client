import styles from './ProductDetails.module.sass'
import cn from 'classnames'
import { Column, ColumnProps } from 'shared/ui/Column'
import { BodyText, HeadlineText, LabelText, TitleText } from 'shared/ui/Typography'
import { CategoryBreadcrumbs } from '../CategoryBreadcrumbs/CategoryBreadcrumbs'
import { Category } from 'shared/api/product'
import { Row } from 'shared/ui/Row'
import { Stars } from '../Stars/Stars'
import useEmblaCarousel from 'embla-carousel-react'
import { useState } from 'react'
import { Button } from 'shared/ui/Button'

export interface ProductDetailsProps extends Omit<ColumnProps<'div'>, 'children'> {
	product: {
		name: string
		category: Category
		averageRating: number
		rateCount: number
		reviewCount: number
		purchaseCount: number
		photos: number[]
		description: string
		price: number
	}
}

export const ProductDetails = ({ product, className, ...otherProps }: ProductDetailsProps) => {
	const getCorrectWord = (value: number, words: string[]) => { 
		value = Math.abs(value) % 100
		const number = value % 10
	
		if(value > 10 && value < 20) {
			return words[2]
		}
		if(number > 1 && number < 5) {
			return words[1]
		}
		if(number == 1) {
			return words[0]
		}
	
		return words[2]
	}

	const [currentPhoto, setCurrentPhoto] = useState(product.photos[0])
	const [emblaRef] = useEmblaCarousel({ dragFree: true, axis: 'y' })

	return (
		<>
			<Column
				className={ cn('gap-s', styles.container, className) }
				{ ...otherProps }
			>
				<CategoryBreadcrumbs category={ product.category }/>
				<Column className={ cn('gap-m') }>
					<Column>
						<HeadlineText size='large'>{ product.name }</HeadlineText>
						<Row className={ cn('gap-m') }>
							<Row className={ cn('gap-xs align-center') }>
								<Stars
									rate={ product.averageRating ?? 0 }
									className={ cn('clr-out') }
								/>
								<BodyText className={ cn('clr-out') }>{ product.averageRating }</BodyText>
							</Row>
							<BodyText className={ cn('clr-out') }>{ product.rateCount } { getCorrectWord(product.rateCount, ['оценка', 'оценки', 'оценок']) }</BodyText>
							<BodyText className={ cn('clr-out') }>{ product.reviewCount } { getCorrectWord(product.reviewCount, ['отзыв', 'отзыва', 'отзывов']) }</BodyText>
							<BodyText className={ cn('clr-out') }>{ product.purchaseCount } { getCorrectWord(product.purchaseCount, ['покупка', 'покупки', 'покупок']) }</BodyText>
						</Row>
					</Column>
					<Row className={ cn('gap-l') }>
						<Row className={ cn('gap-m') }>
							<div
								ref={ emblaRef }
								className={ cn(styles['carousel-wrapper']) }
							>
								<div className={ cn(styles['carousel-container'], className) }>
									{ product.photos.length ? product.photos.map(photoId => (
										<button
											key={ photoId }
											className={ cn(
												styles['carousel-item-wrapper'],
												styles[photoId === currentPhoto && 'current']
											) }
											onClick={ () => setCurrentPhoto(photoId) }
										>
											<img
												alt={ `${ photoId }` }
												className={ cn(styles['carousel-item']) }
												src={ `${ process.env.NEXT_PUBLIC_API_URL }/photo?photoId=${ photoId }` }
											/>
										</button>
									)) : <button className={ cn(styles['carousel-item-wrapper'], styles.current) }/> }
								</div>
							</div>
							<div className={ cn(styles['current-photo-wrapper']) }>
								{ !!product.photos.length && (
									<img
										draggable={ false }
										alt={ `${ currentPhoto }` }
										className={ cn(styles['current-photo']) }
										src={ `${ process.env.NEXT_PUBLIC_API_URL }/photo?photoId=${ currentPhoto }` }
									/>
								) }
							</div>
						</Row>
						<Column className={ cn('gap-xs', styles.description) }>
							<TitleText>Описание</TitleText>
							<BodyText>{ product.description }</BodyText>
						</Column>
						<Column className={ cn(styles['offer-container']) }>
							<HeadlineText size='large'>{ product.price } ₽</HeadlineText>
							<Button>Добавить в корзину</Button>
						</Column>
					</Row>
				</Column>
			</Column>
			<Column className={ cn('gap-m') }>
				<HeadlineText size='large'>Описание</HeadlineText>
				<BodyText size='large'>{ product.description }</BodyText>
			</Column>
		</>
	)
}