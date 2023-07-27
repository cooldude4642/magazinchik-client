import { addressStore } from 'entities/address/model/addressStore'
import { addressStore as featureAddressStore } from 'features/address/lib/addressStore'
import { AddressList, AddressListProps } from 'entities/address/ui/AddressList/AddressList'
import { IoLocationOutline } from 'react-icons/io5'
import { MenuItem } from 'shared/ui/menu/MenuItem/MenuItem'

export interface AddressSelectionMenuProps extends Omit<AddressListProps, 'bottomSlot'> {}

export const AddressSelectionMenu = ({ ...otherProps }: AddressSelectionMenuProps) => {

	return (
		<AddressList
			{ ...otherProps }
			bottomSlot={ (
				<MenuItem
					LeadingIcon={ IoLocationOutline }
					onClick={ () => {
						addressStore.setIsAddressListVisible(false)
						featureAddressStore.setIsAddAddressModalWindowVisible(true)
					} }
				>
					Добавить адрес
				</MenuItem>
			) }
		/>
	)
}