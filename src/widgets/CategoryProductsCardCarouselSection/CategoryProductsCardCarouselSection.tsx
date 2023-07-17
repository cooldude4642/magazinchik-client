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

export const CategoryProductsCardCarouselSection = observer(({ category, className, ...otherProps }: CategoryProductsCardCarouselSectionProps) => {
	const { data, refetch } = useGetProductsFromCategory(category.id)

	useEffect(() => {
		viewerStore.isAuth && !data && refetch()
	}, [viewerStore.isAuth])


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
})