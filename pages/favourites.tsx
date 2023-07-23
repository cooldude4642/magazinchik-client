import cn from 'classnames'
import { ProductCard } from 'entities/product'
import { useGetAllFavouriteProducts } from 'entities/product/model/useGetAllFavouriteProducts'
import { SwitchCartButton } from 'features/cart'
import { SwitchFavouriteIconButton } from 'features/favourite'
import { getCorrectWord } from 'shared/lib/helpers/getCorrectWord'
import { Section } from 'shared/ui/Section'
import { Row } from 'shared/ui/Row'
import { BodyText } from 'shared/ui/Typography'


const FavouritesPage = () => {
	const { data, isLoading } = useGetAllFavouriteProducts()

	return (
		<Section
			headline='Любимое'
			label={ (data && data?.data?.count) ? `${ data?.data?.count } ${ getCorrectWord(data?.data?.count, ['товар', 'товара', 'товаров']) }` : undefined }
		>
			<Row className={ cn('wrap', 'gap-l') }>
				{ data && data?.data?.rows.length > 0 ? data?.data?.rows.map((element) => (
					<ProductCard
						product={ element.product }
						key={ data.data.rows.indexOf(element) }
						topRightSlot={ (
							<SwitchFavouriteIconButton
								productId={ element.product.id }
								isFavourite={ element.product.isFavourite }
							/>
						) }
						bottomSlot={ (
							<SwitchCartButton
								productId={ element.product.id }
								isInCart={ element.product.isInCart }
							/>
						) }
					/>
				)) : !isLoading && <BodyText>У вас пока что нет любимых товаров</BodyText>}
			</Row>
		</Section>
	)
}

export default FavouritesPage