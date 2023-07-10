import { observer } from 'mobx-react-lite'
import { store } from 'shared/lib/store'
import { Button } from 'shared/ui/Button'

const MainPage = observer(() => {

	return (
		<Button onClick={ () => store.switchTheme() }>Switch Theme</Button>
	)
})

export default MainPage