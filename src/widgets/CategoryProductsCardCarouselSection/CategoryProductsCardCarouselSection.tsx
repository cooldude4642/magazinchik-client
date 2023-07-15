import { useGetProductsFromCategory } from 'entities/product/model/useGetProductsFromCategory'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface CategoryProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {
	category: {
		id: number
		name: string
	}
}

export const CategoryProductsCardCarouselSection = ({ category, className, ...otherProps }: CategoryProductsCardCarouselSectionProps) => {
	const { data } = useGetProductsFromCategory(category.id)

	return !!data?.data?.length && (
		<CardCarouselSection
			headline={ category.name }
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
}