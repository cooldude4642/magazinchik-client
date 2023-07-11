import styles from './NavigationGroup.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { IoHomeOutline, IoHome, IoCubeOutline, IoCube, IoHeartOutline, IoHeart, IoBagOutline, IoBag, IoPersonOutline, IoPerson } from 'react-icons/io5'
import { DestinationLink } from '../DestinationLink/DestinationLink'

interface NavigationGroupProps extends Omit<ComponentProps<'nav'>, 'children'> {}

export const NavigationGroup = ({ className, ...otherProps }: NavigationGroupProps) => {
	
	return (
		<nav
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			<DestinationLink
				href='/'
				IconOutlined={ IoHomeOutline }
				IconFilled={ IoHome }
			>
				Главная
			</DestinationLink>
			<DestinationLink
				href='/orders'
				IconOutlined={ IoCubeOutline }
				IconFilled={ IoCube }
			>
				Заказы
			</DestinationLink>
			<DestinationLink
				href='/favourites'
				IconOutlined={ IoHeartOutline }
				IconFilled={ IoHeart }
			>
				Любимое
			</DestinationLink>
			<DestinationLink
				href='/cart'
				IconOutlined={ IoBagOutline }
				IconFilled={ IoBag }
			>
				Корзина
			</DestinationLink>
			<DestinationLink
				href='/profile'
				IconOutlined={ IoPersonOutline }
				IconFilled={ IoPerson }
			>
				Профиль
			</DestinationLink>
		</nav>
	)
}