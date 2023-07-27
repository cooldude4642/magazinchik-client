import styles from './MenuItem.module.sass'
import cn from 'classnames'
import { ComponentProps, useState } from 'react'
import { IconType } from 'react-icons'
import { LabelText } from 'shared/ui/Typography'

export interface MenuItemProps extends ComponentProps<'button'> {
	LeadingIcon?: IconType
	TrailingIcon?: IconType
}

export const MenuItem = ({ onClick, type, LeadingIcon, TrailingIcon, children, className, ...otherProps }: MenuItemProps) => {
	const [position, setPosition] = useState<{ y: number, x: number}>()
	const [isTimeout, setIsTimeout] = useState(false)

	return (
		<button
			className={ cn(styles.container, className) }
			type={ type ?? 'button' }
			onClick={ (e) => {
				const { clientX, clientY, currentTarget } = e

				if (!isTimeout) {
					const { top, left } = currentTarget.getBoundingClientRect()

					setPosition({ x: clientX - left, y: clientY - top })
					setIsTimeout(true)

					setTimeout(() => {
						setPosition(null)
						setIsTimeout(false)
					}, 600)
				}

				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			{ LeadingIcon && <LeadingIcon className={ cn(styles.icon, styles.leading) }/> }
			<LabelText
				size='large'
				className={ cn(styles.text) }
			>
				{ children }
			</LabelText>
			{ TrailingIcon && <TrailingIcon className={ cn(styles.icon, styles.trailing) }/> }
			{ position && (
				<div
					className={ cn(styles['ripple-layer']) }
					style={ {
						top: position.y,
						left: position.x
					} }
				/>
			) }
		</button>
	)
}