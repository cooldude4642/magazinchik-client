import { useGetPersonalProducts } from 'entities/product/model/useGetPersonalProducts'
import { viewerStore } from 'entities/viewer'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface PersonalProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {}

export const PersonalProductsCardCarouselSection = observer(({ className, ...otherProps }: PersonalProductsCardCarouselSectionProps) => {
	const { refetch, data } = useGetPersonalProducts()

	useEffect(() => {
		viewerStore.isAuth && refetch()
	}, [viewerStore.isAuth])

	return !!data?.data?.length && (
		<CardCarouselSection
			headline='Для вас'
			{ ...otherProps }
		>
			{ data.data.map((product) => {
				const { averageRating, id, name, photos, price } = product

				return (
					<ProductCardWidget
						key={ data.data.indexOf(product) }
						product={ {
							id,
							photoId: photos[0] && photos[0].id,
							averageRating,
							name,
							price
						} }
					/>
				)
			}) }
		</CardCarouselSection>
	)
})