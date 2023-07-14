import styles from './DialogContainer.module.sass'
import cn from 'classnames'
import { ModalMotionWrapper, ModalMotionWrapperProps } from '../../ModalMotionWrapper'
import { SpinnerPlaceholder } from 'shared/ui/SpinnerPlaceholder'

export interface DialogContainerProps extends ModalMotionWrapperProps {
	isLoading?: boolean
}

export const DialogContainer = ({ isLoading, children, className, ...otherProps }: DialogContainerProps) => {

	return (
		<ModalMotionWrapper
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