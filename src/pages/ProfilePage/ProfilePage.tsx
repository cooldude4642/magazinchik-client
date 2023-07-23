import styles from './ProfilePage.module.sass'
import cn from 'classnames'
import { useGetAllUserAddresses } from 'entities/address/model/useGetAllUserAddresses'
import { AddressCard } from 'entities/address/ui/AddressCard/AddressCard'
import { viewerStore } from 'entities/viewer'
import { addressStore } from 'features/address/lib/addressStore'
import { LogoutButton } from 'features/auth'
import { observer } from 'mobx-react-lite'
import { IoLocationOutline, IoLogOutOutline } from 'react-icons/io5'
import { getCorrectWord } from 'shared/lib/helpers'
import { Button } from 'shared/ui/Button'
import { Column } from 'shared/ui/Column'
import { Section } from 'shared/ui/Section'
import { BodyText, TitleText } from 'shared/ui/Typography'

export const ProfilePage = observer(() => {
	const { data, isSuccess } = useGetAllUserAddresses()

	return viewerStore.isAuth && (
		<Section
			headline='Профиль'
			label='Ваши личные данные'
		>
			<Column className={ cn('gap-xl') }>
				<Column>
					<TitleText size='large'>Имя</TitleText>
					<BodyText className={ cn('clr-out') }>{ viewerStore.viewer.name }</BodyText>
				</Column>
				<Column>
					<TitleText size='large'>Email-адресс</TitleText>
					<BodyText className={ cn('clr-out') }>{ viewerStore.viewer.email }</BodyText>
				</Column>
				{ isSuccess && (
					<Column className={ cn('gap-m') }>
						<Column>
							<TitleText size='large'>Адреса доставки</TitleText>
							<BodyText className={ cn('clr-out') }>{ data.data.length ? `${ data.data.length } ${ getCorrectWord(data.data.length, ['адрес', 'адреса', 'адресов']) }` : 'У вас пока что нет адреса доставки' }</BodyText>
						</Column>
						<Column className={ cn('gap-s') }>
							{ data.data.map(address => (
								<AddressCard
									key={ address.id }
									address={ address }
								/>
							)) }
						</Column>
					</Column>
				) }
				<Column className={ cn('gap-xs') }>
					<Button
						onClick={ () => addressStore.setIsAddAddressModalWindowVisible(true) }
						LeadingIcon={ IoLocationOutline }
						className={ cn(styles.button) }
						styleType='text'
						style={ { alignSelf: 'flex-start' } }
					>
						Добавить адрес
					</Button>
					<LogoutButton
						styleType='text'
						LeadingIcon={ IoLogOutOutline }
						style={ { alignSelf: 'flex-start' } }
					>
						Выйти
					</LogoutButton>
				</Column>
			</Column>
		</Section>
	)
})