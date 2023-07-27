import { useGetAllUserAddresses } from 'entities/address/model/useGetAllUserAddresses'
import { addressStore } from 'entities/address/model/addressStore'
import { ReactNode } from 'react'
import { MenuContainer, MenuContainerProps } from 'shared/ui/menu/MenuContainer/MenuContainer'
import { MenuDivider } from 'shared/ui/menu/MenuDivider/MenuDivider'
import { MenuItem } from 'shared/ui/menu/MenuItem/MenuItem'
import { observer } from 'mobx-react-lite'

export interface AddressListProps extends Omit<MenuContainerProps, 'children'> {
	bottomSlot?: ReactNode
}

export const AddressList = observer(({ bottomSlot, ...otherProps }: AddressListProps) => {
	const { data, isSuccess } = useGetAllUserAddresses()

	return addressStore.isAddressListVisible && (
		<MenuContainer
			{ ...otherProps }
		>
			{ isSuccess && data.data.map(address => (
				<MenuItem
					key={ address.id }
					onClick={ () => {
						addressStore.setActiveAddress(address)
						addressStore.setIsAddressListVisible(false)
					} }
				>
					г. { address.city }, ул. { address.street }, д. { address.house }, кв. { address.flat }
				</MenuItem>
			)) }
			{ bottomSlot && (
				<>
					<MenuDivider/>
					{ bottomSlot }
				</>
			) }
		</MenuContainer>
	)
})