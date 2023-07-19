import { useGetPopularProducts } from 'entities/product/model/useGetPopularProducts'
import { observer } from 'mobx-react-lite'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface PopularProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {}

export const PopularProductsCardCarouselSection = observer(({ className, ...otherProps }: PopularProductsCardCarouselSectionProps) => {
	const { data } = useGetPopularProducts()

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