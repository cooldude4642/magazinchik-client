import { observer } from 'mobx-react-lite'
import { CardSection } from 'shared/ui/CardSection'

const OrdersPage = observer(() => {

	return (
		<CardSection
			headline='Заказы'
			addedText='в разработке'
		/>
	)
})

export default OrdersPage