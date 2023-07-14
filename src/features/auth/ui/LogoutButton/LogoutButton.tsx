import { Button, ButtonProps } from 'shared/ui/Button'
import { useLogout } from '../../model/useLogout'

interface LogoutButtonProps extends ButtonProps {}

export const LogoutButton = ({ onClick, children, ...otherProps }: LogoutButtonProps) => {
	const { refetch } = useLogout()
	
	return (
		<Button
			onClick={ (e) => {
				refetch()
				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			{ children }
		</Button>
	)
}