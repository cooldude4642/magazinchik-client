import { IoEllipse } from 'react-icons/io5'
import styles from './CategoryBreadcrumbs.module.sass'
import cn from 'classnames'
import { ParentCategory } from 'shared/api/category'
import { Row, RowProps } from 'shared/ui/Row'
import { BodyText } from 'shared/ui/Typography'
import { Fragment } from 'react'

interface CategoryBreadcrumbsProps extends Omit<RowProps<'div'>, 'children'> {
	category: ParentCategory
}

export const CategoryBreadcrumbs = ({ category, className, ...otherProps }: CategoryBreadcrumbsProps) => {
	const parseCategory = (category: ParentCategory) => {
		let breadcrumbs = [] as string[]
		if (category.parent) {
			breadcrumbs.push(...parseCategory(category.parent))
		}

		breadcrumbs.push(category.name)

		return breadcrumbs
	}

	const breadcrumbs = parseCategory(category)

	return (
		<Row
			className={ cn('align-center gap-xs', className) }
			{ ...otherProps }
		>
			{ breadcrumbs.map((breadcrumb) => {
				const index = breadcrumbs.indexOf(breadcrumb)

				return (
					<Fragment key={ index }>
						<BodyText
							size='small'
							className={ cn(styles.text) }
						>
							{ breadcrumb }
						</BodyText>
						{ index !== breadcrumbs.length - 1 && <IoEllipse className={ cn(styles.icon) }/> }
					</Fragment>
				)
			}) }
		</Row>
	)
}