import styles from './IconButton.module.sass'
import cn from 'classnames'
import { ComponentProps, useState } from 'react'
import { IconType } from 'react-icons'

interface IconButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
	IconFilled: IconType
	IconOutlined: IconType
	selected?: boolean
	styleType?: 'standard'
}

export const IconButton = ({ IconFilled, IconOutlined, selected, styleType, onClick, className, ...otherProps }: IconButtonProps) => {
	const [position, setPosition] = useState<{ y: number, x: number}>()
	const [isTimeout, setIsTimeout] = useState(false)

	return (
		<button
			onClick={ (e) => {
				if (!isTimeout) {
					setPosition({ y: e.clientY - e.currentTarget.offsetTop - 4, x: e.clientX - e.currentTarget.offsetLeft - 4 })
					setIsTimeout(true)

					setTimeout(() => {
						setPosition(null)
						setIsTimeout(false)
					}, 600)
				}

				onClick && onClick(e)
			} }
			className={ cn(
				styles.container,
				styles[selected && 'selected'],
				styles[styleType ?? 'standard'],
				className
			) }
			{ ...otherProps }
		>
			<div className={ cn(styles['state-layer']) }>
				{ !selected && <IconOutlined className={ cn(styles.icon) }/> }
				{ selected && <IconFilled className={ cn(styles.icon) }/> }
				{ position && (
					<div
						className={ cn(styles['ripple-layer']) }
						style={ {
							top: position.y,
							left: position.x
						} }
					/>
				) }
			</div>
		</button>
	)
}