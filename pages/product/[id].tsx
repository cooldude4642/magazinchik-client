import { GetStaticPaths, GetStaticProps } from 'next'
import { productService } from 'shared/api/product/productService'
import { ProductDetails } from 'shared/api/product'
import { ProductDetails as ProductDetailsBlock } from 'entities/product/ui/ProductDetails/ProductDetails'
import { HeadlineText } from 'shared/ui/Typography'

interface ProductPageProps {
	product: ProductDetails
}

export const ProductPage = ({ product }: ProductPageProps) => {
	
	return (
		// <ProductDetailsBlock
		// 	product={ {
		// 		name: product.name,
		// 		category: product.cathegory,
		// 		averageRating: product.averageRating,
		// 		rateCount: product.reviewCount + product.reviewNoTextCount,
		// 		reviewCount: product.reviewCount,
		// 		purchaseCount: product.purchases,
		// 		photos: product.photos.sort((a, b) => a.photoOrder - b.photoOrder).map(photo => photo.id),
		// 		description: product.description,
		// 		price: product.price
		// 	} }
		// />
		<HeadlineText>В разработке</HeadlineText>
	)
}

export default ProductPage

// export const  getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
// 	const { data: { rows } } = await productService.getAllProducts(0, 50)
	
// 	const paths = [] as { params: { id: string } }[]

// 	for (const product of rows) {
// 		const { id } = product
// 		paths.push({ params: { id: `${ id }` } })
// 	}

// 	return {
// 		paths,
// 		fallback: false
// 	}
// }

// export const  getStaticProps: GetStaticProps<ProductPageProps, { id: string }> = async (context) => {
// 	const { id } = context.params
// 	const { data } = await productService.getProductById(Number(id))
// 	data.photos ?? (data.photos = [])

// 	return {
// 		props: { product: data }
// 	}
// }