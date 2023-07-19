import { useGetAllProducts } from 'entities/product/model/useGetAllProducts'
import { observer } from 'mobx-react-lite'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface AllProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {}

export const AllProductsCardCarouselSection = observer(({ className, ...otherProps }: AllProductsCardCarouselSectionProps) => {
	const { data, refetch } = useGetAllProducts()

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