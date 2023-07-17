import { useGetAllFavouriteProducts } from 'entities/product/model/useGetAllFavouriteProducts'
import { viewerStore } from 'entities/viewer'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { CardCarouselSection } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

const FavouritesPage = observer(() => {
	const { data, refetch } = useGetAllFavouriteProducts()

	useEffect(() => {
		viewerStore.isAuth && refetch()
	}, [viewerStore.isAuth])

	return !!data?.data?.rows.length && (
		<CardCarouselSection headline='Любимое'>
			{ data.data.rows.map((element) => (
				<ProductCardWidget
					key={ data.data.rows.indexOf(element) }
					product={ element.product }
				/>
			)) }
		</CardCarouselSection>
	)
})

export default FavouritesPage