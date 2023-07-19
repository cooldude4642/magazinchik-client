import { PopularProductsCardCarouselSection } from 'widgets/PopularProductsCardCarouselSection/PopularProductsCardCarouselSection'
import { AllProductsCardCarouselSection } from 'widgets/AllProductsCardCarouselSection/AllProductsCardCarouselSection'
import { Banner } from 'entities/banner/ui/Banner/Banner'
import { PersonalProductsCardCarouselSection } from 'widgets/PersonalProductsCardCarouselSection/PersonalProductsCardCarouselSection'
import { useGetRandomCategories } from 'entities/product/model/useGetRandomCategories'
import { CategoryProductsCardCarouselSection } from 'widgets/CategoryProductsCardCarouselSection/CategoryProductsCardCarouselSection'
import { useGetActiveBanner } from 'entities/banner/model/useGetActiveBanner'
import { GetServerSideProps } from 'next'
import { Banner as IBanner } from 'shared/api/banner/types'
import { bannerService } from 'shared/api/banner/bannerService'

interface MainPageProps {
	banner: IBanner
}

const MainPage = ({ banner }: MainPageProps) => {
	const categories = useGetRandomCategories()

	return (
		<>
			<Banner banner={ banner }/>
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

export const  getServerSideProps: GetServerSideProps<MainPageProps> = async () => {
	const { data } = await bannerService.getActiveBanner()

	return {
		props: { banner: data }
	}
}