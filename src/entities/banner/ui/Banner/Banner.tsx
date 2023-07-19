import styles from './Banner.module.sass'
import cn from 'classnames'
import { ComponentProps, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Banner as IBanner } from 'shared/api/banner/types'

export interface BannerProps extends Omit<ComponentProps<'div'>, 'children'> {
	banner: IBanner
}

export const Banner = ({ banner, className, ...otherProps }: BannerProps) => {
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
				{ banner.photos.sort((a, b) => a.order - b.order).map((photo) => (
					<div
						key={ banner.photos.indexOf(photo) }
						className={ cn(styles.item) }
					>
						<img
							alt={ `${ photo.id }` }
							className={ cn(styles.image) }
							src={ `${ process.env.NEXT_PUBLIC_API_URL }/photo?photoId=${ photo.id }` }
						/>
					</div>
				)) }
			</div>
		</div>
	)
}