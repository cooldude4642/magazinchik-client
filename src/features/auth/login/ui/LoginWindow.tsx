import styles from './LoginWindow.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { Button } from 'shared/ui/Button'
import { PasswordField } from 'shared/ui/PasswordField'
import { TextField } from 'shared/ui/TextField'
import { HeadlineText } from 'shared/ui/Typography'
import { loginStore } from '../lib/store'
import { observer } from 'mobx-react-lite'
import { useLogin } from '../model/useLogin'
import { SpinnerPlaceholder } from 'shared/ui/SpinnerPlaceholder'
import { ErrorMessage } from 'shared/ui/ErrorMessage/ErrorMessage'
import { authStore } from 'features/auth/lib/store'

interface LoginWindowProps extends Omit<ComponentProps<'form'>, 'children'> {}

export const LoginWindow = observer(({ onSubmit, className, ...otherProps }: LoginWindowProps) => {
	const { email, password } = loginStore
	const { isLoading, error, mutate } = useLogin()

	return (
		<form
			onSubmit={ (e) => {
				e.preventDefault()
				mutate({ email, password })
				
				onSubmit && onSubmit(e)
			} }
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			{ isLoading && <SpinnerPlaceholder/> }
			<HeadlineText
				size='small'
				className={ cn(styles.headline) }
			>
				Вход
			</HeadlineText>
			<div className={ cn(styles['input-group']) }>
				<TextField
					value={ loginStore.email }
					invalid={ !!(error?.response?.data?.Errors && error?.response?.data?.Errors['Email']) }
					errorMessage={ error?.response?.data?.Errors && error?.response?.data?.Errors['Email'] }
					onChange={ (e) => {
						loginStore.setEmail(e.currentTarget.value)
					} }
					placeholder='Email'
				/>
				<PasswordField
					value={ loginStore.password }
					invalid={ !!(error?.response?.data?.Errors && error?.response?.data?.Errors['Password']) }
					errorMessage={ error?.response?.data?.Errors && error?.response?.data?.Errors['Password'] }
					onChange={ (e) => {
						loginStore.setPassword(e.currentTarget.value)
					} }
					placeholder='Пароль'
				/>
				<ErrorMessage className={ cn(styles.error) }>{ !error?.response?.data?.Errors && (error?.response?.data?.Message || error?.message) }</ErrorMessage>
			</div>
			<div className={ cn(styles['button-group']) }>
				<Button type='submit'>
					Войти
				</Button>
				<Button
					styleType='text'
					onClick={ () => authStore.switchWindows() }
				>
					Регистрация
				</Button>
			</div>
		</form>
	)
})