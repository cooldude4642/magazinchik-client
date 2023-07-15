import styles from './CardCarouselSection.module.sass'
import cn from 'classnames'
import { Column, ColumnProps } from '../Column'
import { HeadlineText } from '../Typography'
import { CardCarousel } from '../CardCarousel/CardCarousel'

export interface CardCarouselSectionProps extends Omit<ColumnProps<'section'>, 'as'> {
	headline?: string
}

export const CardCarouselSection = ({ headline, children, className, ...otherProps }: CardCarouselSectionProps) => {

	return (
		<Column
			as='section'
			className={ cn('gap-l', styles.container) }
			{ ...otherProps }
		>
			<HeadlineText size='large'>{ headline }</HeadlineText>
			<CardCarousel>
				{ children }
			</CardCarousel>
		</Column>
	)
}