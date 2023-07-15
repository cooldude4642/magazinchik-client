import { GetStaticPaths, GetStaticProps } from 'next'
import { productService } from 'shared/api/product/productService'
import { Product } from 'shared/api/product'

interface ProductPageProps {
	product: Product
}

export const ProductPage = ({ product }: ProductPageProps) => {
	
	return (
		product.name
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