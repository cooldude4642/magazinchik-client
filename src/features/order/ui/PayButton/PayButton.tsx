import { orderStore } from 'features/order/lib/orderStore'
import { usePayOrder } from 'features/order/model/usePayOrder'
import { useEffect } from 'react'
import { IoCardOutline } from 'react-icons/io5'
import { Button, ButtonProps } from 'shared/ui/Button'

interface PayButtonProps extends Omit<ButtonProps, 'children' | 'LeadingIcon'> {
	orderId: number
}

export const PayButton = ({ orderId, onClick, ...otherProps }: PayButtonProps) => {
	const { mutate, isLoading, isSuccess } = usePayOrder()

	useEffect(() => {
		orderStore.setIsPayOrderLoading(isLoading)
	}, [isLoading])
	
	return (
		<Button
			disabled={ isSuccess }
			LeadingIcon={ IoCardOutline }
			onClick={ (e) => {
				mutate({ orderId })
				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			Оплатить заказ
		</Button>
	)
}