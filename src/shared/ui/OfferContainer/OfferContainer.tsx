import styles from './OfferContainer.module.sass'
import cn from 'classnames'
import { ComponentProps, ReactNode } from 'react'
import { BodyText, HeadlineText, TitleText } from '../Typography'
import { Column } from '../Column'
import { SpinnerPlaceholder } from '../SpinnerPlaceholder'

interface OfferContainerProps extends Omit<ComponentProps<'div'>, 'title'> {
	title: ReactNode
	label?: ReactNode
	isLoading?: boolean
}

export const OfferContainer = ({ isLoading, title, label, children, className, ...otherProps }: OfferContainerProps) => {
	
	return (
		<div
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			<Column>
				<HeadlineText size='large'>{ title }</HeadlineText>
				{ label && <BodyText className={ cn(styles.label) }>{ label }</BodyText> }
			</Column>
			{ children }
			{ isLoading && <SpinnerPlaceholder/> }
		</div>
	)
}