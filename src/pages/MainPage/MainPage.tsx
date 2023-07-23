import './MainPage.module.sass'
import { PopularProductsCardCarouselSection } from 'widgets/PopularProductsCardCarouselSection/PopularProductsCardCarouselSection'
import { AllProductsCardCarouselSection } from 'widgets/AllProductsCardCarouselSection/AllProductsCardCarouselSection'
import { Banner } from 'entities/banner/ui/Banner/Banner'
import { PersonalProductsCardCarouselSection } from 'widgets/PersonalProductsCardCarouselSection/PersonalProductsCardCarouselSection'
import { useGetRandomCategories } from 'entities/product/model/useGetRandomCategories'
import { CategoryProductsCardCarouselSection } from 'widgets/CategoryProductsCardCarouselSection/CategoryProductsCardCarouselSection'
import { GetServerSideProps } from 'next'
import { Banner as IBanner } from 'shared/api/banner/types'
import { bannerService } from 'shared/api/banner/bannerService'
import { observer } from 'mobx-react-lite'

interface MainPageProps {
	banner: IBanner
}

export const MainPage = observer(({ banner }: MainPageProps) => {
	const { data, isSuccess } = useGetRandomCategories()

	return (
		<>
			<Banner banner={ banner }/>
			<PersonalProductsCardCarouselSection/>
			<PopularProductsCardCarouselSection/>
			{ isSuccess &&  data.data.map((category) => (
				<CategoryProductsCardCarouselSection
					key={ data.data.indexOf(category) }
					category={ category }
				/>
			)) }
			<AllProductsCardCarouselSection/>
		</>
	)
})

export const  getStaticProps: GetServerSideProps<MainPageProps> = async () => {
	const { data } = await bannerService.getActiveBanner()

	return {
		props: { banner: data }
	}
}