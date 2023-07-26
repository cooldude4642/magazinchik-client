import styles from './Stars.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5'
import { Row } from 'shared/ui/Row'

interface StarsProps extends Omit<ComponentProps<'div'>, 'children'> {
	rate: number
	size?: 'small' | 'large'
}

export const Stars = ({ size, rate, className, ...otherProps }: StarsProps) => {
	const stars = [] as JSX.Element[]

	for (let i = 0; i < 5; i++) {
		if (Math.floor(rate) >= i + 1) {
			stars.push((
				<IoStar
					key={ i }
					className={ cn(
						styles.icon
					) }
				/>
			))
		} else if (rate > i && Number(rate.toFixed(2).slice(-2)) >= 75) {
			stars.push((
				<IoStar
					key={ i }
					className={ cn(styles.icon) }
				/>
			))
		} else if (rate > i && Number(rate.toFixed(2).slice(-2)) >= 25) {
			stars.push((
				<IoStarHalf
					key={ i }
					className={ cn(styles.icon) }
				/>
			))
		} else {
			stars.push((
				<IoStarOutline
					key={ i }
					className={ cn(styles.icon) }
				/>
			))
		}
	}
	
	return (
		<Row
			className={ cn(
				'gap-xxs',
				styles.stars,
				styles[size ?? 'small'],
				className
			) }
			{ ...otherProps }
		>
			{ stars }
		</Row>
	)
}