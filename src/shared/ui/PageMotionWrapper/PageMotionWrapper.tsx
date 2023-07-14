import styles from './PageMotionWrapper.module.sass'
import cn from 'classnames'
import { motion as Motion } from 'framer-motion'
import { useRouter } from 'next/router'

export type PageMotionWrapperProps = Parameters<typeof Motion.main>[0]

export const PageMotionWrapper = ({ children, className, ...otherProps }: PageMotionWrapperProps) => {
	const router = useRouter()

	return (
		<Motion.main
			key={ router.route }
			initial={ { y: 50, opacity: 0 } }
			animate={ { y: 0, opacity: 1 } }
			exit={ { y: 50, opacity: 0 } }
			transition={ {
				type: 'spring',
				stiffness: 100,
				damping: 20
			} }
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			{ children }
		</Motion.main>
	)
}