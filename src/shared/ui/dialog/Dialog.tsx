import styles from './Dialog.module.sass'
import cn from 'classnames'
import { ModalMotionWrapper, ModalMotionWrapperProps } from '../ModalMotionWrapper'
import { SpinnerPlaceholder } from 'shared/ui/SpinnerPlaceholder'

export interface DialogProps extends Omit<ModalMotionWrapperProps, 'draggable'> {
	isLoading?: boolean
}

export const Dialog = ({ isLoading, children, className, ...otherProps }: DialogProps) => {

	return (
		<ModalMotionWrapper
			draggable={ false }
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			<>
				{ isLoading && <SpinnerPlaceholder/> }
				{ children }
			</>
		</ModalMotionWrapper>
	)
}