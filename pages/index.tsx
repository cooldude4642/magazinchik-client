import { PopularProductsCardCarouselSection } from 'widgets/PopularProductsCardCarouselSection/PopularProductsCardCarouselSection'
import { AllProductsCardCarouselSection } from 'widgets/AllProductsCardCarouselSection/AllProductsCardCarouselSection'
import { Banner } from 'entities/banner/ui/Banner/Banner'
import { PersonalProductsCardCarouselSection } from 'widgets/PersonalProductsCardCarouselSection/PersonalProductsCardCarouselSection'
import { useGetRandomCategories } from 'entities/product/model/useGetRandomCategories'
import { CategoryProductsCardCarouselSection } from 'widgets/CategoryProductsCardCarouselSection/CategoryProductsCardCarouselSection'
import { useGetActiveBanner } from 'entities/banner/model/useGetActiveBanner'

const MainPage = () => {
	const categories = useGetRandomCategories()
	const banner = useGetActiveBanner()

	return (
		<>
			{ banner?.data && <Banner banner={ banner.data.data }/> }
			<PersonalProductsCardCarouselSection/>
			<PopularProductsCardCarouselSection/>
			{ !!categories?.data?.data?.length && categories.data.data.map((category) => (
				<CategoryProductsCardCarouselSection
					key={ categories.data?.data.indexOf(category) }
					category={ category }
				/>
			)) }
			<AllProductsCardCarouselSection/>
		</>
	)
}

export default MainPage