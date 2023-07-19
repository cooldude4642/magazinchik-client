import { observer } from 'mobx-react-lite'
import { HeadlineText } from 'shared/ui/Typography'
import { OnlyNumberFiled } from 'shared/ui/fields/OnlyNumberFiled/OnlyNumberField'

const OrdersPage = observer(() => {

	return (
		<>
			<HeadlineText>
				Заказы
			</HeadlineText>
			<OnlyNumberFiled value={ 1 }/>
		</>
	)
})

export default OrdersPage