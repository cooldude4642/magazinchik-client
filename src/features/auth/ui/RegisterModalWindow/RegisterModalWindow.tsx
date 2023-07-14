import styles from './RegisterModalWindow.module.sass'
import cn from 'classnames'
import { Button } from 'shared/ui/Button'
import { PasswordField } from 'shared/ui/fields/PasswordField'
import { InputField } from 'shared/ui/fields/InputField'
import { observer } from 'mobx-react-lite'
import { ErrorMessage } from 'shared/ui/ErrorMessage/ErrorMessage'
import { authStore } from 'features/auth/lib/store/authStore'
import { DialogContainer, DialogContainerProps } from 'shared/ui/dialog/DialogContainer/DialogContainer'
import { DialogGroup } from 'shared/ui/dialog/DialogGroup/DialogGroup'
import { HeadlineText } from 'shared/ui/Typography'
import { registerStore } from 'features/auth/lib/store/registerStore'
import { useRegister } from 'features/auth/model/useRegister'

interface RegisterModalWindowProps extends Omit<DialogContainerProps, 'children' | 'isLoading'> {}

export const RegisterModalWindow = observer(({ ...otherProps }: RegisterModalWindowProps) => {
	const { name, email, password } = registerStore
	const { isLoading, error, mutate } = useRegister()

	return (
		<DialogContainer
			isLoading={ isLoading }
			{ ...otherProps }
		>
			<HeadlineText size='small'>Регистрация</HeadlineText>
			<DialogGroup
				gap='large'
				as='form'
				onSubmit={ (e) => {
					e.preventDefault()
					mutate({ name, email, password })
				} }
			>
				<DialogGroup gap='small'>
					<InputField
						value={ registerStore.name }
						invalid={ !!(error?.response?.data?.Errors && error?.response?.data?.Errors['Name']) }
						errorMessage={ error?.response?.data?.Errors && error?.response?.data?.Errors['Name'] }
						onChange={ (e) => registerStore.setName(e.currentTarget.value) }
						placeholder='Имя'
					/>
					<InputField
						value={ registerStore.email }
						invalid={ !!(error?.response?.data?.Errors && error?.response?.data?.Errors['Email']) }
						errorMessage={ error?.response?.data?.Errors && error?.response?.data?.Errors['Email'] }
						onChange={ (e) => registerStore.setEmail(e.currentTarget.value) }
						placeholder='Email'
					/>
					<PasswordField
						value={ registerStore.password }
						invalid={ !!(error?.response?.data?.Errors && error?.response?.data?.Errors['Password']) }
						errorMessage={ error?.response?.data?.Errors && error?.response?.data?.Errors['Password'] }
						onChange={ (e) => registerStore.setPassword(e.currentTarget.value) }
						placeholder='Пароль'
					/>
					<ErrorMessage className={ cn(styles.error) }>{ !error?.response?.data?.Errors && (error?.response?.data?.Message || error?.message) }</ErrorMessage>
				</DialogGroup>
				<DialogGroup gap='extra-small'>
					<Button type='submit'>Зарегистрироваться</Button>
					<Button
						styleType='text'
						onClick={ () => authStore.switchWindows() }
					>
						Вход
					</Button>
				</DialogGroup>
			</DialogGroup>
		</DialogContainer>
	)
})