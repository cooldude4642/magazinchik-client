import { useGetPopularProducts } from 'entities/product/model/useGetPopularProducts'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface PopularProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {}

export const PopularProductsCardCarouselSection = ({ className, ...otherProps }: PopularProductsCardCarouselSectionProps) => {
	const { data } = useGetPopularProducts()

	return !!data?.data?.currentPage?.length && (
		<CardCarouselSection
			headline='Популярное'
			{ ...otherProps }
		>
			{ data.data.currentPage.map((product) => {
				const { averageRating, id, name, photos, price } = product

				return (
					<ProductCardWidget
						key={ data.data.currentPage.indexOf(product) }
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
}