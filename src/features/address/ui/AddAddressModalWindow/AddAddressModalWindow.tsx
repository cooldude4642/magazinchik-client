import styles from './AddAddressModalWindow.module.sass'
import cn from 'classnames'
import { BackdropProps } from 'shared/ui/Backdrop/Backdrop'
import { DialogContainer, DialogContainerProps } from 'shared/ui/dialog'

interface AddAddressModalWindowProps extends BackdropProps {}

export const AddAddressModalWindow = ({ className, ...otherProps }: AddAddressModalWindowProps) => {
	
	return (
		<DialogContainer
			className={ cn(className) }
			{ ...otherProps }
		>
			
		</DialogContainer>
	)
}