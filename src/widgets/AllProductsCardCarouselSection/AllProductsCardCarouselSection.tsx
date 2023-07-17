import { useGetAllProducts } from 'entities/product/model/useGetAllProducts'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface AllProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {}

export const AllProductsCardCarouselSection = ({ className, ...otherProps }: AllProductsCardCarouselSectionProps) => {
	const { data } = useGetAllProducts()

	return !!data?.data?.rows.length && (
		<CardCarouselSection
			headline='Все товары'
			{ ...otherProps }
		>
			{ data.data.rows.map((product) => {
				const { averageRating, id, name, photos, price } = product

				return (
					<ProductCardWidget
						key={ data.data.rows.indexOf(product) }
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