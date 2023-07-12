import styles from './MotionWrapper.module.sass'
import cn from 'classnames'
import { motion as Motion } from 'framer-motion'
import { useRouter } from 'next/router'

type MotionWrapperProps = Parameters<typeof Motion.div>[0]

export const MotionWrapper = ({ children, className, ...otherProps }: MotionWrapperProps) => {
	const router = useRouter()

	return (
		<Motion.div
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
		</Motion.div>
	)
}