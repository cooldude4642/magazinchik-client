import { Button, ButtonProps } from 'shared/ui/Button'

export interface AddToCartButtonProps extends Omit<ButtonProps, 'children'> {}

export const AddToCartButton = ({ ...otherProps }: AddToCartButtonProps) => {
	
	return (
		<Button { ...otherProps }>
			Добавить в корзину
		</Button>
	)
}