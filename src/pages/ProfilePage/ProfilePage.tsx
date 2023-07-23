import './ProfilePage.module.sass'
import cn from 'classnames'
import { viewerStore } from 'entities/viewer'
import { LogoutButton } from 'features/auth'
import { observer } from 'mobx-react-lite'
import { IoLogOutOutline } from 'react-icons/io5'
import { Section } from 'shared/ui/Section'
import { BodyText } from 'shared/ui/Typography'

export const ProfilePage = observer(() => {

	return viewerStore.isAuth && (
		<Section
			headline='Профиль'
			label='Ваши личные данные'
		>
			<BodyText>{ viewerStore.viewer.name }</BodyText>
			<BodyText>{ viewerStore.viewer.email }</BodyText>
			<LogoutButton
				styleType='text'
				LeadingIcon={ IoLogOutOutline }
				style={ { alignSelf: 'flex-start' } }
			>
				Выйти
			</LogoutButton>
		</Section>
	)
})