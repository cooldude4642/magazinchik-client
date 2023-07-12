import styles from './SpinnerPlaceholder.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'

interface SpinnerPlaceholderProps extends ComponentProps<'div'> {}

export const SpinnerPlaceholder = ({ className, ...otherProps }: SpinnerPlaceholderProps) => {
	
	return (
		<div
			className={ cn(styles.placeholder, className) }
			{ ...otherProps }
		>
			<div className={ cn(styles.spinner) }/>
		</div>
	)
}