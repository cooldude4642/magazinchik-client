import axios from 'axios'
import { viewerStore } from 'entities/viewer'
import { LogoutButton } from 'features/auth'
import { observer } from 'mobx-react-lite'
import { IoLogOutOutline } from 'react-icons/io5'
import { Section } from 'shared/ui/Section'

const ProfilePage = observer(() => {

	return (
		<>
			<Section
				headline='Профиль'
				label={ viewerStore.viewer?.email }
			>
				<LogoutButton
					styleType='text'
					LeadingIcon={ IoLogOutOutline }
					style={ { alignSelf: 'flex-start' } }
				>
					Выйти
				</LogoutButton>
			</Section>
		</>
	)
})

export default ProfilePage