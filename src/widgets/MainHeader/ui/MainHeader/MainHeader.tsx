import styles from './MainHeader.module.sass'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { ComponentPropsWithoutRef } from 'react'
import { NavigationGroup } from '../NavigationGroup/NavigationGroup'
import { SearchGroup } from '../SearchGroup/SearchGroup'
import { useScroll } from 'widgets/MainHeader/lib/useScroll'
import { SwitchThemeIconButton } from 'shared/ui/SwitchThemeIconButton/SwitchThemeIconButton'

interface MainHeaderProps extends Omit<ComponentPropsWithoutRef<'header'>, 'children'> {}

export const MainHeader = observer(({ className, ...otherProps }: MainHeaderProps) => {
	const { isScrolled, ref } = useScroll()
	
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
				<SwitchThemeIconButton/>
				<div className={ cn(styles.group) }>
					<SearchGroup/>
					<NavigationGroup/>
				</div>
			</div>
		</header>
	)
})