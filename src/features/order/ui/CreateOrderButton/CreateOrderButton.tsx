import { addressStore } from 'entities/address/model/addressStore'
import { useCreateOrder } from 'features/order/model/useCreateOrder'
import { observer } from 'mobx-react-lite'
import { IoCubeOutline } from 'react-icons/io5'
import { Button, ButtonProps } from 'shared/ui/Button'

interface CreateOrderButtonProps extends Omit<ButtonProps, 'children'| 'LeadingIcon'> {}

export const CreateOrderButton = observer(({ disabled, ...otherProps }: CreateOrderButtonProps) => {
	const { mutate } = useCreateOrder()

	return (
		<Button
			disabled={ !addressStore.activeAddress || disabled }
			onClick={ () => mutate({ addressId: addressStore.activeAddress.id }) }
			LeadingIcon={ IoCubeOutline }
			{ ...otherProps }
		>
			Оформить заказ
		</Button>
	)
})