import styles from './ErrorMessage.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { BodyText } from '../Typography'

interface ErrorMessageProps extends ComponentProps<'div'> {}

export const ErrorMessage = ({ children, className, ...otherProps }: ErrorMessageProps) => {
	
	return children && (
		<BodyText
			size='small'
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			{ children }
		</BodyText>
	)
}