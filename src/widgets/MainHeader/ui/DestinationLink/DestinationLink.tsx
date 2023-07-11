import styles from './DestinationLink.module.sass'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { LabelText } from 'shared/ui/Typography'

type DestinationLinkProps = Omit<Parameters<typeof Link>[0], 'children'> & {
	children: string
	IconOutlined: IconType
	IconFilled: IconType
}

export const DestinationLink = ({ IconOutlined, IconFilled, href, children, className, ...otherProps }: DestinationLinkProps) => {
	const router = useRouter()
	const [isActive, setIsActive] = useState(router.pathname === href)

	useEffect(() => {
		setIsActive(router.pathname === href)
	}, [router.pathname])

	return (
		<Link
			href={ href }
			className={ cn(
				styles.container,
				styles[isActive && 'active'],
				className
			) }
			{ ...otherProps }
		>
			{ !isActive && <IconOutlined className={ cn(styles.icon) }/> }
			{ isActive && <IconFilled className={ cn(styles.icon) }/> }
			<LabelText>{ children }</LabelText>
		</Link>
	)
}