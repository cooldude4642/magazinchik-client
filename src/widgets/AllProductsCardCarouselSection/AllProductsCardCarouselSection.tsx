import { useGetAllProducts } from 'entities/product/model/useGetAllProducts'
import { observer } from 'mobx-react-lite'
import { getCorrectWord } from 'shared/lib/helpers/getCorrectWord'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface AllProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {}

export const AllProductsCardCarouselSection = observer(({ className, ...otherProps }: AllProductsCardCarouselSectionProps) => {
	const { data } = useGetAllProducts()

	return !!data?.data?.rows.length && (
		<CardCarouselSection
			headline='Все товары'
			addedText={ (data && data?.data?.count) ? `${ data?.data?.count } ${ getCorrectWord(data?.data?.count, ['товар', 'товара', 'товаров']) }` : undefined }
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