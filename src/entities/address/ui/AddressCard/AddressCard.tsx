import styles from './AddressCard.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { Address } from 'shared/api/address'
import { Column } from 'shared/ui/Column'
import { Row } from 'shared/ui/Row'
import { BodyText } from 'shared/ui/Typography'

interface AddressCardProps extends Omit<ComponentProps<'div'>, 'children'> {
	address: Address
}

export const AddressCard = ({ address, className, ...otherProps }: AddressCardProps) => {
	
	return (
		<Row
			className={ cn(styles.container, 'gap-xl', className) }
			{ ...otherProps }
		>
			<Column className={ cn('gap-xs', 'clr-out') }>
				<BodyText>Город:</BodyText>
				<BodyText>Улица:</BodyText>
				<BodyText>Дом:</BodyText>
				<BodyText>Квартира:</BodyText>
			</Column>
			<Column className={ cn('gap-xs', styles.data) }>
				<BodyText>{ address.city }</BodyText>
				<BodyText>{ address.street }</BodyText>
				<BodyText>{ address.house }</BodyText>
				<BodyText>{ address.flat }</BodyText>
			</Column>
		</Row>
	)
}