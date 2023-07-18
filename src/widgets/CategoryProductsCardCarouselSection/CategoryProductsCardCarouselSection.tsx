import { useGetProductsFromCategory } from 'entities/product/model/useGetProductsFromCategory'
import { viewerStore } from 'entities/viewer'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Category } from 'shared/api/product'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface CategoryProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {
	category: Category
}

export const CategoryProductsCardCarouselSection = ({ category, className, ...otherProps }: CategoryProductsCardCarouselSectionProps) => {
	const { data } = useGetProductsFromCategory(category.id)


	return !!data?.data?.length && (
		<CardCarouselSection
			headline={ `${ category.parent.name } - ${ category.name }` }
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
}