import styles from './AddressCard.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { Address } from 'shared/api/address'

interface AddressCardProps extends Omit<ComponentProps<'div'>, 'children'> {
	address: Address
}

export const AddressCard = ({ address, className, ...otherProps }: AddressCardProps) => {
	
	return (
		<div
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			
		</div>
	)
}