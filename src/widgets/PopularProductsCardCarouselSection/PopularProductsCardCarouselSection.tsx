import { useGetPopularProducts } from 'entities/product/model/useGetPopularProducts'
import { viewerStore } from 'entities/viewer'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface PopularProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {}

export const PopularProductsCardCarouselSection = observer(({ className, ...otherProps }: PopularProductsCardCarouselSectionProps) => {
	const { data, refetch } = useGetPopularProducts()

	useEffect(() => {
		viewerStore.isAuth !== undefined && refetch()
	}, [viewerStore.isAuth])

	return !!data?.data?.rows.length && (
		<CardCarouselSection
			headline='Популярное'
			{ ...otherProps }
		>
			{ data.data.rows.map((product) => {

				return (
					<ProductCardWidget
						key={ data.data.rows.indexOf(product) }
						product={ product }
					/>
				)
			}) }
		</CardCarouselSection>
	)
})