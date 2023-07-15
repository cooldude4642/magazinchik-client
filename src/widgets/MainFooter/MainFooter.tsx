import styles from './ManFooter.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { BodyText } from 'shared/ui/Typography'

export interface MainFooterProps extends Omit<ComponentProps<'footer'>, 'children'> {}

export const MainFooter = ({ className, ...otherProps }: MainFooterProps) => {
	
	return (
		<footer
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			<BodyText
				size='small'
				className={ cn(styles.text) }
			>
				Разработано
				{ ' ' }
				<a
					href='https://github.com/isoniazid'
					target='_blank'
				>
					Васьком
				</a>
				{ ' ' }
				и
				{ ' ' }
				<a
					href='https://github.com/cooldude4642'
					target='_blank'
				>
					Вовчиком
				</a>
				{ ' ' }
				с ♥
			</BodyText>
		</footer>
	)
}