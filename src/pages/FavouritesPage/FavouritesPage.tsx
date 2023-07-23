import './FavouritesPage.module.sass'
import cn from 'classnames'
import { ProductCard } from 'entities/product'
import { useGetAllFavouriteProducts } from 'entities/product/model/useGetAllFavouriteProducts'
import { SwitchCartButton } from 'features/cart'
import { SwitchFavouriteIconButton } from 'features/favourite'
import { getCorrectWord } from 'shared/lib/helpers/getCorrectWord'
import { Section } from 'shared/ui/Section'
import { Row } from 'shared/ui/Row'
import { BodyText } from 'shared/ui/Typography'
import { observer } from 'mobx-react-lite'
import { viewerStore } from 'entities/viewer'


export const FavouritesPage = observer(() => {
	const { data, isSuccess } = useGetAllFavouriteProducts(viewerStore.isAuth)

	return isSuccess && (
		<Section
			headline='Любимое'
			label={ data.data.count > 0 ? `${ data.data.count } ${ getCorrectWord(data?.data?.count, ['товар', 'товара', 'товаров']) }` : 'У вас пока что нет любимых товаров' }
		>
			<Row className={ cn('wrap', 'gap-l') }>
				{ data.data.rows.map((element) => (
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
				)) }
			</Row>
		</Section>
	)
})