import styles from './CardSection.module.sass'
import cn from 'classnames'
import { Column, ColumnProps } from '../Column'
import { BodyText, HeadlineText } from '../Typography'

export interface CardSectionProps extends Omit<ColumnProps<'section'>, 'as'> {
	headline?: string
	addedText?: string
}

export const CardSection = ({ headline, addedText, children, className, ...otherProps }: CardSectionProps) => {

	return (
		<Column
			as='section'
			className={ cn('gap-l', styles.container) }
			{ ...otherProps }
		>
			<Column>
				<HeadlineText size='large'>{ headline }</HeadlineText>
				<BodyText className={ cn('clr-out') }>{ addedText }</BodyText>
			</Column>
			<Column className={ cn('gap-m') }>
				{ children }
			</Column>
		</Column>
	)
}