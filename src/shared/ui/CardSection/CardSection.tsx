import styles from './CardSection.module.sass'
import cn from 'classnames'
import { Column, ColumnProps } from '../Column'
import { HeadlineText } from '../Typography'

export interface CardSectionProps extends Omit<ColumnProps<'section'>, 'as'> {
	headline?: string
}

export const CardSection = ({ headline, children, className, ...otherProps }: CardSectionProps) => {

	return (
		<Column
			as='section'
			className={ cn('gap-l', styles.container) }
			{ ...otherProps }
		>
			<HeadlineText size='large'>{ headline }</HeadlineText>
			<Column className={ cn('gap-s') }>
				{ children }
			</Column>
		</Column>
	)
}