import { GetStaticPaths, GetStaticProps } from 'next'
import { productService } from 'shared/api/product/productService'
import { ProductDetails as IProductDetails } from 'shared/api/product'
import { ProductDetails } from 'entities/product/ui/ProductDetails/ProductDetails'
import { SwitchCartButton } from 'features/cart'
import { SwitchFavouriteIconButton } from 'features/favourite'
import { useGetProductById } from 'entities/product/model/useGetProductById'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { viewerStore } from 'entities/viewer'

interface ProductPageProps {
	product: IProductDetails
}

export const ProductPage = observer(({ product }: ProductPageProps) => {
	const { data, refetch } = useGetProductById(product.id, false)

	useEffect(() => {
		viewerStore.isAuth !== undefined && refetch()
	}, [viewerStore.isAuth])
	
	return (
		<ProductDetails
			product={ product }
			offerBttomSlot={ data && (
				<SwitchCartButton
					productId={ product.id }
					isInCart={ data.data.isInCart }
				/>
			) }
			photoTopRightSlot={ data && (
				<SwitchFavouriteIconButton
					productId={ product.id }
					isFavourite={ data.data.isInCart }
				/>
			) }
		/>
	)
})

export default ProductPage

export const  getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
	const { data: { rows } } = await productService.getAllProducts(0, 50)
	
	const paths = [] as { params: { id: string } }[]

	for (const product of rows) {
		const { id } = product
		paths.push({ params: { id: `${ id }` } })
	}

	return {
		paths,
		fallback: false
	}
}

export const  getStaticProps: GetStaticProps<ProductPageProps, { id: string }> = async (context) => {
	const { id } = context.params
	const { data } = await productService.getProductById(Number(id))
	data.photos ?? (data.photos = [])

	return {
		props: { product: data }
	}
}