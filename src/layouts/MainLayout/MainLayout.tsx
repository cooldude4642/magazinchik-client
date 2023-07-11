import styles from './MainLayout.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { MainHeader } from 'widgets/MainHeader'

interface MainLayoutProps extends ComponentProps<'div'> {}

export const MainLayout = ({ children, className, ...otherProps }: MainLayoutProps) => {
	
	return (
		<div
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			<MainHeader/>
			<main className={ cn(styles.main) }>{ children }</main>
		</div>
	)
}