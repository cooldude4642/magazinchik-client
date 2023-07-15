import styles from './CardCarousel.module.sass'
import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export interface CardCarouselProps extends ComponentPropsWithoutRef<'div'> {}

export const CardCarousel = ({ children, className, ...otherProps }: CardCarouselProps) => {
	const [emblaRef] = useEmblaCarousel({ dragFree: true })

	return (
		<div
			ref={ emblaRef }
			className={ cn(styles.wrapper) }
			{ ...otherProps }
		>
			<div className={ cn(styles.container, className) }>
				{ children }
			</div>
		</div>
		
	)
}