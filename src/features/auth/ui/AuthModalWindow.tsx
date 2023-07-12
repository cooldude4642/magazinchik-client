import styles from './AuthModalWindow.module.sass'
import cn from 'classnames'
import { ComponentProps, useEffect, useState } from 'react'
import { LoginWindow } from 'features/auth/login'
import { RegisterWindow } from 'features/auth/register'
import { Backdrop } from 'shared/ui/Backdrop'
import { observer } from 'mobx-react-lite'
import { authStore } from '../lib/store'
import { MotionWrapper } from 'shared/ui/MotionWrapper'
import { viewerStore } from 'entities/viewer'

interface AuthModalWindowProps extends Omit<ComponentProps<'div'>, 'children'> {}

export const AuthModalWindow = observer(({ className, ...otherProps }: AuthModalWindowProps) => {
	const [isMouseDown, setIsMouseDown] = useState(false)
	
	useEffect(() => {
		viewerStore.isAuth && authStore.setIsAuthModalWindowVisble(false)
	}, [viewerStore.isAuth])

	return authStore.isAuthModalWindowVisble && (
		<Backdrop
			onClick={ () => {
				authStore.setIsAuthModalWindowVisble(false)
			} }
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			{ authStore.isLoginWindowVisible && (
				<MotionWrapper>
					<LoginWindow
						onClick={ (e) => {
							e.stopPropagation()
						} }
					/>
				</MotionWrapper>
			) }
			{ authStore.isRegisterWindowVisible && (
				<MotionWrapper>
					<RegisterWindow
						onClick={ (e) => {
							e.stopPropagation()
						} }
					/>
				</MotionWrapper>
			) }
		</Backdrop>
	)
})