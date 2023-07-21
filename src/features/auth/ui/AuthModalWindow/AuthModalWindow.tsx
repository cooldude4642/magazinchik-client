import cn from 'classnames'
import { ComponentProps, useEffect } from 'react'
import { LoginModalWindow } from '../LoginModalWindow/LoginModalWindow'
import { RegisterModalWindow } from '../RegisterModalWindow/RegisterModalWindow'
import { Backdrop } from 'shared/ui/Backdrop'
import { observer } from 'mobx-react-lite'
import { authStore } from 'features/auth/lib/store/authStore'
import { viewerStore } from 'entities/viewer'
import { registerStore } from 'features/auth/lib/store/registerStore'
import { loginStore } from 'features/auth/lib/store/loginStore'

interface AuthModalWindowProps extends Omit<ComponentProps<'div'>, 'children'> {}

export const AuthModalWindow = observer(({ className, ...otherProps }: AuthModalWindowProps) => {
	useEffect(() => {
		if (viewerStore.isAuth) {
			authStore.setIsAuthModalWindowVisble(false)

			loginStore.setEmail('')
			loginStore.setPassword('')

			registerStore.setName('')
			registerStore.setEmail('')
			registerStore.setPassword('')
		}
	}, [viewerStore.isAuth])

	return authStore.isAuthModalWindowVisble && (
		<Backdrop
			onClick={ () => authStore.setIsAuthModalWindowVisble(false) }
			className={ cn(className) }
			{ ...otherProps }
		>
			{ authStore.isLoginWindowVisible && <LoginModalWindow/> }
			{ authStore.isRegisterWindowVisible && <RegisterModalWindow/> }
		</Backdrop>
	)
})