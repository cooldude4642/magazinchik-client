import cn from 'classnames'
import { motion as Motion } from 'framer-motion'

export type ModalMotionWrapperProps = Parameters<typeof Motion.div>[0]

export const ModalMotionWrapper = ({ children, className, ...otherProps }: ModalMotionWrapperProps) => {

	return (
		<Motion.div
			initial={ { y: 50, opacity: 0 } }
			animate={ { y: 0, opacity: 1 } }
			exit={ { y: 50, opacity: 0 } }
			transition={ {
				type: 'spring',
				stiffness: 100,
				damping: 20
			} }
			className={ cn(className) }
			{ ...otherProps }
		>
			{ children }
		</Motion.div>
	)
}