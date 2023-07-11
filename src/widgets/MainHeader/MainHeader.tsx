import styles from './MainHeader.module.sass'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'
import { store } from 'shared/lib/store'
import { Button } from 'shared/ui/Button'
import { IconButton } from 'shared/ui/IconButton'
import { IoSunny, IoMoon, IoSunnyOutline, IoMoonOutline, IoSearchOutline, IoMenuOutline, IoMenu, IoHome, IoHomeOutline, IoCubeOutline, IoCube, IoBag, IoBagOutline, IoHeart, IoHeartOutline, IoPerson, IoPersonOutline } from 'react-icons/io5'
import { BodyText } from 'shared/ui/Typography'
import { DestinationLink } from './DestinationLink'

interface MainHeaderProps extends Omit<ComponentPropsWithoutRef<'header'>, 'children'> {}

export const MainHeader = observer(({ className, ...otherProps }: MainHeaderProps) => {
	const ref = useRef<HTMLElement>(null)
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (!window.scrollY) {
				setIsScrolled(false)
			} else if (window.scrollY) {
				setIsScrolled(true)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	
	return (
		<header
			ref={ ref }
			className={ cn(
				styles.container,
				styles[isScrolled && 'scrolled'],
				className
			) }
			{ ...otherProps }
		>
			<div className={ cn(styles.content) }>
				<div className={ cn(styles.row, styles.top) }>
					<IconButton
						onClick={ () => store.switchTheme() }
						IconFilled={ store.darkTheme ? IoSunny : IoMoon }
						IconOutlined={ store.darkTheme ? IoSunnyOutline : IoMoonOutline }
					/>
					<div className={ cn(styles.group) }>
						<Button className={ cn(styles['catalog-button']) }>Каталог</Button>
						<BodyText
							size='large'
							className={ cn(styles.search) }
						>
							<IoSearchOutline className={ cn(styles.icon) }/>
							Искать товары
						</BodyText>
					</div>
					<div className={ cn(styles.nav) }>
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
					</div>
				</div>
			</div>
		</header>
	)
})