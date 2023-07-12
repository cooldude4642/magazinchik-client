import { Button, ButtonProps } from 'shared/ui/Button'
import { useLogout } from '../model/useLogout'

type LogoutButtonProps = ButtonProps

export const LogoutButton = ({ ...otherProps }: LogoutButtonProps) => {
	const { refetch } = useLogout()
	
	return (
		<Button
			onClick={ () => refetch() }
			{ ...otherProps }
		>
			Выйти
		</Button>
	)
}