import { ProductCard } from 'entities/product'
import { SwitchCartButton } from 'features/cart'
import { SwitchFavouriteIconButton } from 'features/favourite'
import { GetStaticPaths, GetStaticProps } from 'next'
import { DescendantsCategory, ParentCategory, categoryService } from 'shared/api/category'
import { ProductCard as IProductCard, productService } from 'shared/api/product'
import { getCorrectWord } from 'shared/lib/helpers'
import { Row } from 'shared/ui/Row'
import { Section } from 'shared/ui/Section'
import cn from 'classnames'

interface CategoryPageProps {
	products: IProductCard[]
	category: ParentCategory
}

const CategoryPage = ({ products, category }: CategoryPageProps) => {
	const getBreadcrumbs = (category: ParentCategory) => {
		const breadcrumbs: string[] = []
		breadcrumbs.unshift(category.name)

		if (category.parent) {
			breadcrumbs.unshift(...getBreadcrumbs(category.parent))
		}

		return breadcrumbs
	}
	
	return (
		<Section
			headline={ getBreadcrumbs(category).join(' - ') }
			label={ products.length > 0 ? `${ products.length } ${ getCorrectWord(products.length, ['товар', 'товара', 'товаров']) }` : 'В этой категории пока что нет товаров' }
		>
			<Row className={ cn('wrap', 'gap-l') }>
				{ products.map((product) => (
					<ProductCard
						product={ product }
						key={ products.indexOf(product) }
						topRightSlot={ (
							<SwitchFavouriteIconButton
								productId={ product.id }
								isFavourite={ product.isFavourite }
							/>
						) }
						bottomSlot={ (
							<SwitchCartButton
								productId={ product.id }
								isInCart={ product.isInCart }
							/>
						) }
					/>
				)) }
			</Row>
		</Section>
	)
}

export const getStaticPaths: GetStaticPaths<{ id: string[] }> = async () => {
	const { data } = await categoryService.getAllCategories()
	const paths = [] as { params: { id: string[] } }[]

	const getCategoryPaths = (categories: DescendantsCategory[]) => {
		const paths = [] as string[][]

		for (const category of categories) {
			if (category.descendants.length > 0) {
				const additionalPaths = getCategoryPaths(category.descendants)

				for (let path of additionalPaths) {
					paths.push([`${ category.id }`, ...path])
				}
			} else {
				paths.push([`${ category.id }`])
			}
		}

		return paths
	}

	for (const path of getCategoryPaths(data)) {
		paths.push({ params: { id: path } })
	}

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps<CategoryPageProps, { id: string[] }> = async (context) => {
	const { id } = context.params
	const pruductResponse = await productService.getProductsFromCategory(Number(id[id.length - 1]))
	const categoryResponse = await categoryService.getParentCategoryById(Number(id[id.length - 1]))

	return {
		props: {
			products: pruductResponse.data,
			category: categoryResponse.data
		}
	}
}

export default CategoryPage