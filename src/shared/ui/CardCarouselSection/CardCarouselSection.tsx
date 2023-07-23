import styles from './CardCarouselSection.module.sass'
import cn from 'classnames'
import { CardCarousel } from '../CardCarousel/CardCarousel'
import { Section, SectionProps } from '../Section'

export interface CardCarouselSectionProps extends SectionProps {}

export const CardCarouselSection = ({ children, className, ...otherProps }: CardCarouselSectionProps) => {

	return (
		<Section
			className={ cn('gap-l', styles.container) }
			{ ...otherProps }
		>
			<CardCarousel>
				{ children }
			</CardCarousel>
		</Section>
	)
}