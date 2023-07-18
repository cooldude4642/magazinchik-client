import { useGetPersonalProducts } from 'entities/product/model/useGetPersonalProducts'
import { viewerStore } from 'entities/viewer'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { CardCarouselSection, CardCarouselSectionProps } from 'shared/ui/CardCarouselSection'
import { ProductCardWidget } from 'widgets/ProductCardWidget/ProductCardWidget'

interface PersonalProductsCardCarouselSectionProps extends Omit<CardCarouselSectionProps, 'children' | 'headline'> {}

export const PersonalProductsCardCarouselSection = observer(({ className, ...otherProps }: PersonalProductsCardCarouselSectionProps) => {
	const { data, refetch } = useGetPersonalProducts(false)

	useEffect(() => {
		viewerStore.isAuth !== undefined && refetch()
	}, [viewerStore.isAuth])

	return !!data?.data?.length && (
		<CardCarouselSection
			headline='Для вас'
			{ ...otherProps }
		>
			{ data.data.map((product) =>  (
				<ProductCardWidget
					key={ data.data.indexOf(product) }
					product={ product }
				/>
			)) }
		</CardCarouselSection>
	)
})