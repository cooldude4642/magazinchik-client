import axios from 'axios'
import { viewerStore } from 'entities/viewer'
import { LogoutButton } from 'features/auth'
import { observer } from 'mobx-react-lite'
import { GetServerSideProps } from 'next'
import { IoLogOutOutline } from 'react-icons/io5'
import { CardSection } from 'shared/ui/CardSection'

const ProfilePage = observer(() => {

	return (
		<>
			<CardSection
				headline='Профиль'
				addedText={ viewerStore.viewer.email }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const cookie = context.req.headers.cookie
		const response = await axios.get(`${ process.env.NEXT_PUBLIC_API_URL }/auth/refresh`, { headers: { cookie } })
		context.res.setHeader('set-cookie', response.headers['set-cookie'] as string[])

		return {
			props: {}
		}
	} catch (error) {
		
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}
}