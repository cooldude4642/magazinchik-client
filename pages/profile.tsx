import axios from 'axios'
import { viewerStore } from 'entities/viewer'
import { LogoutButton } from 'features/auth'
import { observer } from 'mobx-react-lite'
import { IoLogOutOutline } from 'react-icons/io5'
import { CardSection } from 'shared/ui/CardSection'

const ProfilePage = observer(() => {

	return (
		<>
			<CardSection
				headline='Профиль'
				addedText={ viewerStore.viewer?.email }
			>
				<LogoutButton
					styleType='text'
					LeadingIcon={ IoLogOutOutline }
					style={ { alignSelf: 'flex-start' } }
				>
					Выйти
				</LogoutButton>
			</CardSection>
		</>
	)
})

export default ProfilePage