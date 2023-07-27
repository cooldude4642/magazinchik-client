import styles from './Section.module.sass'
import cn from 'classnames'
import { Column, ColumnProps } from '../Column'
import { BodyText, HeadlineText } from '../Typography'
import { ReactNode } from 'react'

export interface SectionProps extends Omit<ColumnProps<'section'>, 'as'> {
	headline?: string
	label?: ReactNode
}

export const Section = ({ headline, label, children, className, ...otherProps }: SectionProps) => {

	return (
		<Column
			as='section'
			className={ cn('gap-l', styles.container, className) }
			{ ...otherProps }
		>
			<Column>
				{ headline && <HeadlineText size='large'>{ headline }</HeadlineText> }
				{ label && <BodyText className={ cn(styles.label) }>{ label }</BodyText> }
			</Column>
			{ children && (
				<Column className={ cn('gap-m') }>
					{ children }
				</Column>
			) }
		</Column>
	)
}