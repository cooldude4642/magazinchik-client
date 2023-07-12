import styles from './RegisterWindow.module.sass'
import cn from 'classnames'
import { ComponentProps, useEffect } from 'react'
import { Button } from 'shared/ui/Button'
import { PasswordField } from 'shared/ui/PasswordField'
import { TextField } from 'shared/ui/TextField'
import { HeadlineText } from 'shared/ui/Typography'
import { registerStore } from '../lib/registerStore'
import { observer } from 'mobx-react-lite'
import { useRegister } from '../model/useRegister'
import { ErrorMessage } from 'shared/ui/ErrorMessage/ErrorMessage'
import { SpinnerPlaceholder } from 'shared/ui/SpinnerPlaceholder'
import { authStore } from 'features/auth/lib/store'

interface RegisterWindowProps extends Omit<ComponentProps<'form'>, 'children'> {}

export const RegisterWindow = observer(({ onSubmit, className, ...otherProps }: RegisterWindowProps) => {
	const { name, email, password } = registerStore
	const { isLoading, error, mutate } = useRegister()

	return (
		<form
			onSubmit={ (e) => {
				e.preventDefault()
				mutate({ name, email, password })
				
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
				Регистрация
			</HeadlineText>
			<div className={ cn(styles['input-group']) }>
				<TextField
					value={ registerStore.name }
					invalid={ !!(error?.response?.data?.Errors && error?.response?.data?.Errors['Name']) }
					errorMessage={ error?.response?.data?.Errors && error?.response?.data?.Errors['Name'] }
					onChange={ (e) => {
						registerStore.setName(e.currentTarget.value)
					} }
					placeholder='Имя'
				/>
				<TextField
					value={ registerStore.email }
					invalid={ !!(error?.response?.data?.Errors && error?.response?.data?.Errors['Email']) }
					errorMessage={ error?.response?.data?.Errors && error?.response?.data?.Errors['Email'] }
					onChange={ (e) => {
						registerStore.setEmail(e.currentTarget.value)
					} }
					placeholder='Email'
				/>
				<PasswordField
					value={ registerStore.password }
					invalid={ !!(error?.response?.data?.Errors && error?.response?.data?.Errors['Password']) }
					errorMessage={ error?.response?.data?.Errors && error?.response?.data?.Errors['Password'] }
					onChange={ (e) => {
						registerStore.setPassword(e.currentTarget.value)
					} }
					placeholder='Пароль'
				/>
				<ErrorMessage className={ cn(styles.error) }>{ !error?.response?.data?.Errors && (error?.response?.data?.Message || error?.message) }</ErrorMessage>
			</div>
			<div className={ cn(styles['button-group']) }>
				<Button type='submit'>
					Зайрегистрироваться
				</Button>
				<Button
					styleType='text'
					onClick={ () => authStore.switchWindows() }
				>
					Вход
				</Button>
			</div>
		</form>
	)
})