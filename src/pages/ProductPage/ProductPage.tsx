import './ProductPage.module.sass'
import { GetStaticPaths, GetStaticProps } from 'next'
import { productService } from 'shared/api/product/productService'
import { ProductDetails as IProductDetails } from 'shared/api/product'
import { ProductDetails } from 'entities/product/ui/ProductDetails/ProductDetails'
import { SwitchCartButton } from 'features/cart'
import { SwitchFavouriteIconButton } from 'features/favourite'
import { observer } from 'mobx-react-lite'
import { Section } from 'shared/ui/Section'
import { useGetAllProductReviews } from 'entities/review/model/useGetAllProductReviews'
import { ReviewCard } from 'entities/review/ui/ReviewCard/ReviewCard'
import { getCorrectWord } from 'shared/lib/helpers'
import { Fragment } from 'react'
import { Divider } from 'shared/ui/Divider/Divider'
import cn from 'classnames'
import styles from './ProductPage.module.sass'

interface ProductPageProps {
	product: IProductDetails
}

export const ProductPage = observer(({ product }: ProductPageProps) => {
	const { isSuccess, data } = useGetAllProductReviews(product.id)

	return (
		<>
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
			{ isSuccess && (
				<Section
					className={ cn(styles.reviews) }
					headline='Отзывы'
					label={ data.data.count > 0 ? `${ data.data.count } ${ getCorrectWord(data.data.count, ['отзыв', 'отзыва', 'отзывов']) }` : 'У этого товара пока что нет отзывов' }
				>
					{ data.data.count > 0 && <Divider/> }
					{ data.data.rows.map(review => (
						<Fragment key={ review.id }>
							<ReviewCard review={ review }/>
							<Divider/>
						</Fragment>
					)) }
				</Section>
			) }
		</>
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