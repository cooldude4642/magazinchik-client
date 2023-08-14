import { ProductCard } from 'entities/product'
import { SwitchCartButton } from 'features/cart'
import { SwitchFavouriteIconButton } from 'features/favourite'
import { GetStaticProps } from 'next'
import { DescendantsCategory, ParentCategory, categoryService } from 'shared/api/category'
import { ProductCard as IProductCard, productService } from 'shared/api/product'
import { getCorrectWord } from 'shared/lib/helpers'
import { Row } from 'shared/ui/Row'
import { Section } from 'shared/ui/Section'
import cn from 'classnames'
import { BodyText, HeadlineText, TitleText } from 'shared/ui/Typography'
import Link from 'next/link'
import { Column } from 'shared/ui/Column'

interface CatalogPageProps {
	categories: DescendantsCategory[]
}

const CatalogPage = ({ categories }: CatalogPageProps) => {
	const buildCatalog = (categories: DescendantsCategory[], path: number[] = []) => {
		const elements: JSX.Element[] = []

		for (const category of categories) {
			const extendedPath = [...path, category.id]

			if (category.isParent) {
				const descendants = buildCatalog(category.descendants, extendedPath)

				elements.push(
					<Column
						key={ extendedPath.join('/') }
						className={ cn('gap-2') }
					>
						<BodyText>
							{ category.name }
						</BodyText>
						{ descendants }
					</Column>
				)
			} else {
				elements.push(
					<Link
						style={ { color: 'var(--primary)' } }
						className={ cn('ms-4') }
						href={ `/catalog/${ extendedPath.join('/') }` }
						key={ extendedPath.join('/') }
					>
						<BodyText>
							{ category.name }
						</BodyText>
					</Link>
				)
			}
		}

		return elements
	}	
	
	return (
		<Section headline='Каталог'>
			{ buildCatalog(categories) }
		</Section>
	)
}

export const getStaticProps: GetStaticProps<CatalogPageProps> = async () => {
	const { data } = await categoryService.getAllCategories()

	return {
		props: { categories: data }
	}
}

export default CatalogPage