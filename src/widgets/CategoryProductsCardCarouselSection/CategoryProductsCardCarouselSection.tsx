import { useGetProductsFromCategory } from 'entities/product/model/useGetProductsFromCategory'
import { observer } from 'mobx-react-lite'
import { Category } from 'shared/api/category'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface CategoryProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {
	category: Category
}

export const CategoryProductsCardCarouselSection = observer(({ category, className, ...otherProps }: CategoryProductsCardCarouselSectionProps) => {
	const { data } = useGetProductsFromCategory(category.id)

	return !!data?.data?.length && (
		<CardCarouselSection
			headline={ category.parent.name }
			label={  category.name }
			{ ...otherProps }
		>
			{ data.data.map((product) =>  (
				<ProductCardWidget
					key={ data.data.indexOf(product) }
					product={ product }
				/>
			)) }
		</CardCarouselSection>
	)
})