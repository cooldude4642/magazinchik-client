import { PopularProductsCardCarouselSection } from 'widgets/PopularProductsCardCarouselSection/PopularProductsCardCarouselSection'
import { AllProductsCardCarouselSection } from 'widgets/AllProductsCardCarouselSection/AllProductsCardCarouselSection'
import { MainCarousel } from 'widgets/MainCarousel/MainCarousel'
import { PersonalProductsCardCarouselSection } from 'widgets/PersonalProductsCardCarouselSection/PersonalProductsCardCarouselSection'
import { useGetRandomCategories } from 'entities/product/model/useGetRandomCategories'
import { CategoryProductsCardCarouselSection } from 'widgets/CategoryProductsCardCarouselSection/CategoryProductsCardCarouselSection'

const MainPage = () => {
	const { data } = useGetRandomCategories()

	return (
		<>
			<MainCarousel/>
			<PersonalProductsCardCarouselSection/>
			<PopularProductsCardCarouselSection/>
			{ !!data?.data?.length && data.data.map((category) => (
				<CategoryProductsCardCarouselSection
					key={ data.data.indexOf(category) }
					category={ category }
				/>
			)) }
			<AllProductsCardCarouselSection/>
		</>
	)
}

export default MainPage