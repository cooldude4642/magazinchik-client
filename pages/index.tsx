import cn from 'classnames'
import { useGetAllProducts } from 'entities/product/model/useGetAllProducts'
import { viewerStore } from 'entities/viewer'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { CardCarousel } from 'shared/ui/CardCarousel/CardCarousel'
import { Column } from 'shared/ui/Column'
import { HeadlineText } from 'shared/ui/Typography'
import { MainCarousel } from 'widgets/MainCarousel/MainCarousel'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

const MainPage = observer(() => {
	const { refetch, data } = useGetAllProducts()
	useEffect(() => {
		viewerStore.isAuth && refetch()
	}, [viewerStore.isAuth])

	return (
		<>
			<MainCarousel/>
			<Column
				className={ cn('gap-m') }
				style={ { maxWidth: '100%' } }
			>
				<HeadlineText size='small'>Все товары</HeadlineText>
				<CardCarousel>
					{ data?.data?.map((product) => {
						const { averageRating, id, name, photos, price } = product

						return (
							<ProductCardWidget
								key={ data.data.indexOf(product) }
								product={ {
									id,
									photoId: photos[0] && photos[0].id,
									averageRating,
									name,
									price
								} }
							/>
						)
					}) }
				</CardCarousel>
			</Column>
		</>
	)
})

export default MainPage