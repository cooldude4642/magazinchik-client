import { useGetAllProducts } from 'entities/product/model/useGetAllProducts'
import { viewerStore } from 'entities/viewer'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface AllProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {}

export const AllProductsCardCarouselSection = observer(({ className, ...otherProps }: AllProductsCardCarouselSectionProps) => {
	const { data, refetch } = useGetAllProducts(false)

	useEffect(() => {
		viewerStore.isAuth !== undefined && refetch()
	}, [viewerStore.isAuth])

	return !!data?.data?.rows.length && (
		<CardCarouselSection
			headline='Все товары'
			{ ...otherProps }
		>
			{ data.data.rows.map((product) =>  (
				<ProductCardWidget
					key={ data.data.rows.indexOf(product) }
					product={ product }
				/>
			)) }
		</CardCarouselSection>
	)
})