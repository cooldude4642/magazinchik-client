import styles from './MainCarousel.module.sass'
import cn from 'classnames'
import { ComponentProps, useEffect } from 'react'
import { HeadlineText } from 'shared/ui/Typography'
import useEmblaCarousel from 'embla-carousel-react'

export interface MainCarouselProps extends Omit<ComponentProps<'div'>, 'children'> {}

export const MainCarousel = ({ className, ...otherProps }: MainCarouselProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

	useEffect(() => {
		if (emblaApi) {
			emblaApi
		}
	  }, [emblaApi])

	

	return (
		<div
			ref={ emblaRef }
			className={ cn(styles.wrapper, className) }
			{ ...otherProps }
		>
			<div className={ cn(styles.container) }>
				<HeadlineText
					size='small'
					className={ cn(styles.item) }
				>
					Здесь могла бы быть ваша реклама
				</HeadlineText>
				<HeadlineText
					size='small'
					className={ cn(styles.item) }
				>
					Даю в жопу, беру в рот
				</HeadlineText>
			</div>
		</div>
	)
}