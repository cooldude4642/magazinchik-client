import Link from 'next/link'
import styles from './SearchGroup.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { IoListOutline, IoSearchOutline } from 'react-icons/io5'
import { Button } from 'shared/ui/Button'
import { BodyText } from 'shared/ui/Typography'

interface SearchGroupProps extends Omit<ComponentProps<'div'>, 'children'> {}

export const SearchGroup = ({ className, ...otherProps }: SearchGroupProps) => {
	
	return (
		<div
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			<Link href='/catalog'>
				<Button
					className={ cn(styles['catalog-button']) }
					LeadingIcon={ IoListOutline }
				>
					Каталог
				</Button>
			</Link>
			<BodyText
				className={ cn(styles.search) }
			>
				<IoSearchOutline className={ cn(styles.icon) }/>
				Искать товары
			</BodyText>
		</div>
	)
}