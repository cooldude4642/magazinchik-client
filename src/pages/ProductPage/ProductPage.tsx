import './ProductPage.module.sass'
import { GetStaticPaths, GetStaticProps } from 'next'
import { productService } from 'shared/api/product/productService'
import { ProductDetails as IProductDetails } from 'shared/api/product'
import { ProductDetails } from 'entities/product/ui/ProductDetails/ProductDetails'
import { SwitchCartButton } from 'features/cart'
import { SwitchFavouriteIconButton } from 'features/favourite'
import { observer } from 'mobx-react-lite'

interface ProductPageProps {
	product: IProductDetails
}

export const ProductPage = observer(({ product }: ProductPageProps) => {

	return (
		<ProductDetails
			product={ product }
			offerBttomSlot={ (
				<SwitchCartButton
					productId={ product.id }
					isInCart={ product.isInCart }
				/>
			) }
			photoTopRightSlot={ (
				<SwitchFavouriteIconButton
					productId={ product.id }
					isFavourite={ product.isFavourite }
				/>
			) }
		/>
	)
})

export const  getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
	const { data } = await productService.getAllProducts()
	const paths = [] as { params: { id: string } }[]

	for (const product of data.rows) {
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