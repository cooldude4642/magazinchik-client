import { PopularProductsCardCarouselSection } from 'widgets/PopularProductsCardCarouselSection/PopularProductsCardCarouselSection'
import { AllProductsCardCarouselSection } from 'widgets/AllProductsCardCarouselSection/AllProductsCardCarouselSection'
import { Banner } from 'entities/banner/ui/Banner/Banner'
import { PersonalProductsCardCarouselSection } from 'widgets/PersonalProductsCardCarouselSection/PersonalProductsCardCarouselSection'
import { useGetRandomCategories } from 'entities/product/model/useGetRandomCategories'
import { CategoryProductsCardCarouselSection } from 'widgets/CategoryProductsCardCarouselSection/CategoryProductsCardCarouselSection'
import { useGetActiveBanner } from 'entities/banner/model/useGetActiveBanner'
import { GetServerSideProps } from 'next'
import axios from 'axios'

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

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const cookie = context.req.headers.cookie
		const response = await axios.get(`${ process.env.NEXT_PUBLIC_API_URL }/auth/refresh`, { headers: { cookie } })
		context.res.setHeader('set-cookie', response.headers['set-cookie'] as string[])

		return {
			props: {}
		}
	} catch (error) {
		
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}
}