import { GetStaticPaths, GetStaticProps } from 'next'
import { productService } from 'shared/api/product/productService'
import { Product } from 'shared/api/product'
import { ProductDetails } from 'entities/product/ui/ProductDetails/ProductDetails'

interface ProductPageProps {
	product: Product
}

export const ProductPage = ({ product }: ProductPageProps) => {
	
	return (
		<ProductDetails
			product={ {
				name: product.name,
				category: product.cathegory,
				averageRating: product.averageRating,
				rateCount: product.reviewCount + product.reviewNoTextCount,
				reviewCount: product.reviewCount,
				purchaseCount: product.purchases,
				photos: product.photos.sort((a, b) => a.photoOrder - b.photoOrder).map(photo => photo.id),
				description: product.description,
				price: product.price
			} }
		/>
	)
}

export default ProductPage

export const  getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
	const { data } = await productService.getAllProducts()
	const paths = [] as { params: { id: string } }[]

	for (const product of data) {
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