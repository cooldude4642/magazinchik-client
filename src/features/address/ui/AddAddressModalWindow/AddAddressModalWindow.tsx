import styles from './AddAddressModalWindow.module.sass'
import cn from 'classnames'
import { BackdropProps } from 'shared/ui/Backdrop/Backdrop'
import { Dialog, DialogProps } from 'shared/ui/Dialog/Dialog'

interface AddAddressModalWindowProps extends BackdropProps {}

export const AddAddressModalWindow = ({ className, ...otherProps }: AddAddressModalWindowProps) => {
	
	return (
		<Dialog
			className={ cn(className) }
			{ ...otherProps }
		>
			
		</Dialog>
	)
}