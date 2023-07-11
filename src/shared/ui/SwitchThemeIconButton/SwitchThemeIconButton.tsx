import { IconButton, IconButtonProps } from '../IconButton'
import { observer } from 'mobx-react-lite'
import { store } from 'shared/lib/store'
import { IoSunny, IoMoon, IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'

interface SwitchThemeIconButtonProps extends Omit<IconButtonProps, 'IconFilled' | 'IconOutlined'> {}

export const SwitchThemeIconButton = observer(({ onClick, ...otherProps }: SwitchThemeIconButtonProps) => {
	
	return (
		<IconButton
			onClick={ (e) => {
				store.switchTheme()
				onClick && onClick(e)
			} }
			IconFilled={ store.darkTheme ? IoSunny : IoMoon }
			IconOutlined={ store.darkTheme ? IoSunnyOutline : IoMoonOutline }
			{ ...otherProps }
		/>
	)
})