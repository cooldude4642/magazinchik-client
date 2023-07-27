import { addressStore } from 'entities/address/model/addressStore'
import styles from './CartPage.module.sass'
import cn from 'classnames'
import { useGetAllCartProducts } from 'entities/product/model/useGetAllCartProducts'
import { CreateOrderButton } from 'features/order/ui/CreateOrderButton/CreateOrderButton'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { getCorrectWord } from 'shared/lib/helpers/getCorrectWord'
import { Column } from 'shared/ui/Column'
import { OfferContainer } from 'shared/ui/OfferContainer/OfferContainer'
import { Row } from 'shared/ui/Row'
import { Section } from 'shared/ui/Section'
import { CartProductCardWidget } from 'widgets/CartProductCardWidget/CartProductCardWidget'
import { IconButton } from 'shared/ui/IconButton'
import { IoCaretDown, IoCaretDownOutline, IoCaretUp, IoCaretUpOutline } from 'react-icons/io5'
import { AddressSelectionMenu } from 'features/address/ui/AddressSelectionMenu/AddressSelectionMenu'
import { InputField } from 'shared/ui/fields'

export const CartPage = observer(() => {
	const { data, isSuccess } = useGetAllCartProducts()
	const [totalPrice, setTotalPrice] = useState(0)

	useEffect(() => {
		if (data) {
			let sum = 0

			data.data.rows.forEach(item => sum = sum + item.product.price * item.productCount)
			setTotalPrice(sum)
		}
	}, [data])
	
	return isSuccess && (
		<Section
			headline='Корзина'
			label={ data.data.count > 0 ? `${ data.data.count } ${ getCorrectWord(data.data.count, ['товар', 'товара', 'товаров']) }` : 'В вашей корзине пока что нет товаров' }
		>
			<Row className={ cn('gap-l', 'justify-between') }>
				<Column className={ cn('gap-m') }>
					{ data.data.rows.map((element) => (
						<CartProductCardWidget
							key={ element.id }
							item={ element }
						/>
					)) }
				</Column>
				{ totalPrice > 0 && (
					<OfferContainer
						title={ (
							<Row className={ cn('justify-between', 'gap-l') }>
								<div>Итого:</div>
								<div>{ totalPrice } ₽</div>
							</Row>
						) }
						label={ `${ data.data.count } ${ getCorrectWord(data.data.count, ['товар', 'товара', 'товаров']) }` }
					>
						<Column className={ cn(styles.block) }>
							<InputField
								onFocus={ () => addressStore.setIsAddressListVisible(true) }
								readOnly
								placeholder='Адрес доставки'
								value={ addressStore.activeAddress ? `г. ${ addressStore.activeAddress.city }, ул. ${ addressStore.activeAddress.street }, д. ${ addressStore.activeAddress.house }, кв. ${ addressStore.activeAddress.flat }` : 'Не указан' }
								iconButton={ addressStore.isAddressListVisible ? (
									<IconButton
										onClick={ () => addressStore.setIsAddressListVisible(false) }
										IconOutlined={ IoCaretUpOutline }
										IconFilled={ IoCaretUp }
									/>
								) : (
									<IconButton
										onClick={ () => addressStore.setIsAddressListVisible(true) }
										IconOutlined={ IoCaretDownOutline }
										IconFilled={ IoCaretDown }
									/>
								) }
							/>
							<AddressSelectionMenu className={ cn(styles.menu) }/>
						</Column>
						<CreateOrderButton/>
					</OfferContainer>
				) }
			</Row>
		</Section>
	)
})