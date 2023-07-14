import styles from './CardCarousel.module.sass'
import cn from 'classnames'
import { ComponentProps, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface CardCarouselProps extends ComponentProps<'div'> {}

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