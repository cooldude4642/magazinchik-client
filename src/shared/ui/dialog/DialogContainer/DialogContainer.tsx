import styles from './DialogContainer.module.sass'
import cn from 'classnames'
import { ModalMotionWrapper, ModalMotionWrapperProps } from '../../ModalMotionWrapper'
import { SpinnerPlaceholder } from 'shared/ui/SpinnerPlaceholder'

export interface DialogContainerProps extends Omit<ModalMotionWrapperProps, 'draggable'> {
	isLoading?: boolean
}

export const DialogContainer = ({ isLoading, children, className, ...otherProps }: DialogContainerProps) => {

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