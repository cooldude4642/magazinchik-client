import cn from 'classnames'
import { OnlyNumberFiled, OnlyNumberFiledProps } from 'shared/ui/fields/OnlyNumberFiled/OnlyNumberField'
import { useSetCountToCart } from '../model/useSetCountToCart'
import { useEffect, useState } from 'react'

interface SetCountToCartFieldProps extends OnlyNumberFiledProps {
	product: {
		id: number,
		count: number
	}
}

export const SetCountToCartField = ({ product: { id, count }, className, ...otherProps }: SetCountToCartFieldProps) => {
	const { mutate } = useSetCountToCart()
	const [value, setValue] = useState(count)

	useEffect(() => {
		setValue(count)
	}, [count])
	
	return (
		<OnlyNumberFiled
			onBlur={ () => {
				mutate({ id, count: value })
			} }
			onChange={ (e) => {
				setValue(Number(e.currentTarget.value))
			} }
			value={ value }
			className={ cn(className) }
			{ ...otherProps }
		/>
	)
}