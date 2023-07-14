import styles from './LoginModalWindow.module.sass'
import cn from 'classnames'
import { Button } from 'shared/ui/Button'
import { PasswordField } from 'shared/ui/fields/PasswordField'
import { InputField } from 'shared/ui/fields/InputField'
import { loginStore } from 'features/auth/lib/store/loginStore'
import { observer } from 'mobx-react-lite'
import { useLogin } from '../../model/useLogin'
import { ErrorMessage } from 'shared/ui/ErrorMessage/ErrorMessage'
import { authStore } from 'features/auth/lib/store/authStore'
import { DialogContainer, DialogContainerProps } from 'shared/ui/dialog/DialogContainer/DialogContainer'
import { DialogGroup } from 'shared/ui/dialog/DialogGroup/DialogGroup'
import { HeadlineText } from 'shared/ui/Typography'

interface LoginModalWindowProps extends Omit<DialogContainerProps, 'children' | 'isLoading'> {}

export const LoginModalWindow = observer(({ ...otherProps }: LoginModalWindowProps) => {
	const { email, password } = loginStore
	const { isLoading, error, mutate } = useLogin()

	return (
		<DialogContainer
			isLoading={ isLoading }
			{ ...otherProps }
		>
			<HeadlineText size='small'>Вход</HeadlineText>
			<DialogGroup
				gap='large'
				as='form'
				onSubmit={ (e) => {
					e.preventDefault()
					mutate({ email, password })
				} }
			>
				<DialogGroup gap='small'>
					<InputField
						value={ loginStore.email }
						invalid={ !!(error?.response?.data?.Errors && error?.response?.data?.Errors['Email']) }
						errorMessage={ error?.response?.data?.Errors && error?.response?.data?.Errors['Email'] }
						onChange={ (e) => loginStore.setEmail(e.currentTarget.value) }
						placeholder='Email'
					/>
					<PasswordField
						value={ loginStore.password }
						invalid={ !!(error?.response?.data?.Errors && error?.response?.data?.Errors['Password']) }
						errorMessage={ error?.response?.data?.Errors && error?.response?.data?.Errors['Password'] }
						onChange={ (e) => loginStore.setPassword(e.currentTarget.value) }
						placeholder='Пароль'
					/>
					<ErrorMessage className={ cn(styles.error) }>{ !error?.response?.data?.Errors && (error?.response?.data?.Message || error?.message) }</ErrorMessage>
				</DialogGroup>
				<DialogGroup gap='extra-small'>
					<Button type='submit'>
						Войти
					</Button>
					<Button
						styleType='text'
						onClick={ () => authStore.switchWindows() }
					>
						Регистрация
					</Button>
				</DialogGroup>
			</DialogGroup>
		</DialogContainer>
	)
})