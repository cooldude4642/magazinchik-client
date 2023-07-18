import axios from 'axios'
import { ProductCard } from 'entities/product'
import { useGetAllFavouriteProducts } from 'entities/product/model/useGetAllFavouriteProducts'
import { viewerStore } from 'entities/viewer'
import { SwitchCartButton } from 'features/cart'
import { RemoveFromFavouriteIconButton } from 'features/favourite/ui/RemoveFromFavouriteIconButton'
import { observer } from 'mobx-react-lite'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { CardCarouselSection } from 'shared/ui/CardCarouselSection'


const FavouritesPage = observer(() => {
	const { data, refetch } = useGetAllFavouriteProducts(false)

	useEffect(() => {
		viewerStore.isAuth !== undefined && refetch()
	}, [viewerStore.isAuth])

	return !!data?.data?.rows.length && (
		<CardCarouselSection headline='Любимое'>
			{ data.data.rows.map((element) => (
				<ProductCard
					product={ element.product }
					key={ data.data.rows.indexOf(element) }
					topRightSlot={ <RemoveFromFavouriteIconButton productId={ element.product.id }/> }
					bottomSlot={ (
						<SwitchCartButton
							productId={ element.product.id }
							isInCart={ element.product.isInCart }
						/>
					) }
				/>
			)) }
		</CardCarouselSection>
	)
})

export default FavouritesPage

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const cookie = context.req.headers.cookie
		const response = await axios.get(`${ process.env.NEXT_PUBLIC_API_URL }/auth/refresh`, { headers: { cookie } })
		context.res.setHeader('set-cookie', response.headers['set-cookie'] as string[])

		return {
			props: {}
		}
	} catch (error) {
		
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}
}