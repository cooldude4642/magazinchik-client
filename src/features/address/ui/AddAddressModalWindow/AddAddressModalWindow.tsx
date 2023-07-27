import { observer } from 'mobx-react-lite'
import styles from './AddAddressModalWindow.module.sass'
import cn from 'classnames'
import { Backdrop, BackdropProps } from 'shared/ui/Backdrop/Backdrop'
import { Dialog } from 'shared/ui/Dialog/Dialog'
import { HeadlineText } from 'shared/ui/Typography'
import { addressStore } from 'features/address/lib/addressStore'
import { Column } from 'shared/ui/Column'
import { InputField } from 'shared/ui/fields'
import { useAddAddress } from 'features/address/model/useAddAddres'
import { useEffect, useState } from 'react'
import { Button } from 'shared/ui/Button'

interface AddAddressModalWindowProps extends Omit<BackdropProps, 'children'> {}

export const AddAddressModalWindow = observer(({ onClick, className, ...otherProps }: AddAddressModalWindowProps) => {
	const { mutate, isLoading, isSuccess, reset } = useAddAddress()
	const [city, setCity] = useState('')
	const [street, setStreet] = useState('')
	const [house, setHouse] = useState('')
	const [flat, setFlat] = useState('')

	useEffect(() => {
		if (isSuccess) {
			addressStore.setIsAddAddressModalWindowVisible(false)

			reset()
		}
	}, [isSuccess])

	return addressStore.isAddAddressModalWindowVisible && (
		<Backdrop
			onClick={ () => addressStore.setIsAddAddressModalWindowVisible(false) }
			{ ...otherProps }
		>
			<Dialog
				isLoading={ isLoading }
				className={ cn(className) }
			>
				<HeadlineText size='small'>Добавить адрес</HeadlineText>
				<Column
					className={ cn(styles.group, 'gap-xl') }
					as='form'
					onSubmit={ (e) => {
						e.preventDefault()
						mutate({ city, street, flat, house })
					} }
				>
					<Column className={ cn('gap-m', styles.group) }>
						<InputField
							placeholder='Город'
							onChange={ (e) => setCity(e.currentTarget.value) }
						/>
						<InputField
							placeholder='Улица'
							onChange={ (e) => setStreet(e.currentTarget.value) }
						/>
						<InputField
							placeholder='Дом'
							onChange={ (e) => setHouse(e.currentTarget.value) }
						/>
						<InputField
							placeholder='Квартира'
							onChange={ (e) => setFlat(e.currentTarget.value) }
						/>
					</Column>
					<Button type='submit'>
						Добавить адрес
					</Button>
				</Column>
			</Dialog>
		</Backdrop>
	)
})