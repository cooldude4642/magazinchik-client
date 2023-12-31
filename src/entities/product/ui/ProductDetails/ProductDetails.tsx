import styles from './ProductDetails.module.sass'
import cn from 'classnames'
import { Column, ColumnProps } from 'shared/ui/Column'
import { BodyText, HeadlineText, TitleText } from 'shared/ui/Typography'
import { CategoryBreadcrumbs } from '../CategoryBreadcrumbs/CategoryBreadcrumbs'
import { ProductDetails as IProductDetails } from 'shared/api/product'
import { Row } from 'shared/ui/Row'
import { Stars } from '../Stars/Stars'
import useEmblaCarousel from 'embla-carousel-react'
import { cloneElement, useState } from 'react'
import { getCorrectWord } from 'shared/lib/helpers'
import { OfferContainer } from 'shared/ui/OfferContainer/OfferContainer'
import { Section } from 'shared/ui/Section'

export interface ProductDetailsProps extends Omit<ColumnProps<'div'>, 'children'> {
	product: IProductDetails
	photoTopRightSlot?: JSX.Element
	offerBttomSlot?: JSX.Element
}

export const ProductDetails = ({ offerBttomSlot, photoTopRightSlot, product, className, ...otherProps }: ProductDetailsProps) => {
	const [currentPhoto, setCurrentPhoto] = useState(product.photos.sort((a, b) => a.order - b.order)[0])
	const [emblaRef] = useEmblaCarousel({ dragFree: true, axis: 'y' })

	return (
		<>
			<Column
				className={ cn('gap-s', styles.container, className) }
				{ ...otherProps }
			>
				<CategoryBreadcrumbs category={ product.cathegory }/>
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
							<BodyText className={ cn('clr-out') }>
								{ product.rateCount } { getCorrectWord(product.rateCount, ['оценка', 'оценки', 'оценок']) }
							</BodyText>
							<BodyText className={ cn('clr-out') }>
								{ product.reviewCount } { getCorrectWord(product.reviewCount, ['отзыв', 'отзыва', 'отзывов']) }
							</BodyText>
							<BodyText className={ cn('clr-out') }>
								{ product.purchases } { getCorrectWord(product.purchases, ['покупка', 'покупки', 'покупок']) }
							</BodyText>
						</Row>
					</Column>
					<Row className={ cn('gap-l', 'justify-between') }>
						<Row className={ cn('gap-m') }>
							<div
								ref={ emblaRef }
								className={ cn(styles['carousel-wrapper']) }
							>
								<div className={ cn(styles['carousel-container'], className) }>
									{ product.photos.length ? product.photos.sort((a, b) => a.order - b.order).map(photo => (
										<button
											key={ photo.order }
											className={ cn(
												styles['carousel-item-wrapper'],
												styles[photo === currentPhoto && 'current']
											) }
											onClick={ () => setCurrentPhoto(photo) }
										>
											<img
												alt={ `${ photo.id }` }
												className={ cn(styles['carousel-item']) }
												src={ `${ process.env.NEXT_PUBLIC_API_URL }/photo?photoId=${ photo.id }` }
											/>
										</button>
									)) : <button className={ cn(styles['carousel-item-wrapper'], styles.current) }/> }
								</div>
							</div>
							<div className={ cn(styles['current-photo-wrapper']) }>
								{ photoTopRightSlot && cloneElement(photoTopRightSlot, { className: styles['top-right'] }) }
								{ !!product.photos.length && (
									<img
										draggable={ false }
										alt={ `${ currentPhoto }` }
										className={ cn(styles['current-photo']) }
										src={ `${ process.env.NEXT_PUBLIC_API_URL }/photo?photoId=${ currentPhoto.id }` }
									/>
								) }
							</div>
						</Row>
						<OfferContainer title={ `${ product.price } ₽` }>
							{ offerBttomSlot }
						</OfferContainer>
					</Row>
				</Column>
			</Column>
			<Section
				className={ cn(styles['description-block']) }
				headline='Описание'
				label={ product.description }
			/>
		</>
	)
}