import styles from './CardCarouselSection.module.sass'
import cn from 'classnames'
import { CardCarousel } from '../CardCarousel/CardCarousel'
import { CardSection, CardSectionProps } from '../CardSection'

export interface CardCarouselSectionProps extends CardSectionProps {
	headline?: string
}

export const CardCarouselSection = ({ children, className, ...otherProps }: CardCarouselSectionProps) => {

	return (
		<CardSection
			className={ cn('gap-l', styles.container) }
			{ ...otherProps }
		>
			<CardCarousel>
				{ children }
			</CardCarousel>
		</CardSection>
	)
}