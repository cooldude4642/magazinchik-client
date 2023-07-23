import { AuthModalWindow } from 'features/auth'
import styles from './MainLayout.module.sass'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { ComponentProps } from 'react'
import { store } from 'shared/lib/store'
import { MainHeader } from 'widgets/MainHeader/ui'
import { MainFooter } from 'widgets/MainFooter'

interface MainLayoutProps extends Omit<ComponentProps<'div'>, 'id'> {}

export const MainLayout = observer(({ children, className, ...otherProps }: MainLayoutProps) => {
	
	return (
		<div
			id='layout'
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			{ store.isPageLoading && (
				<div className={ cn(styles['progress-track']) }>
					<div className={ cn(styles['progress-indicator']) }/>
				</div>
			) }
			<MainHeader/>
			{ children }
			<MainFooter/>
			<AuthModalWindow/>
		</div>
	)
})