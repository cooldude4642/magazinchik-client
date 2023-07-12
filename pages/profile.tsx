import axios from 'axios'
import { viewerStore } from 'entities/viewer'
import { LogoutButton } from 'features/auth'
import { observer } from 'mobx-react-lite'
import { GetServerSideProps } from 'next'
import { BodyText, HeadlineText } from 'shared/ui/Typography'

const ProfilePage = observer(() => {

	return (
		<>
			<HeadlineText>
				Профиль
			</HeadlineText>
			{ viewerStore.viewer && <BodyText>Привет, { viewerStore.viewer.name }!</BodyText> }
			<LogoutButton/>
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