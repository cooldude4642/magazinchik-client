import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
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

export default ProductPage

export const  getServerSideProps: GetServerSideProps<ProductPageProps, { id: string }> = async (context) => {
	const { id } = context.params
	const { data } = await productService.getProductById(Number(id))
	data.photos ?? (data.photos = [])

	return {
		props: { product: data }
	}
}