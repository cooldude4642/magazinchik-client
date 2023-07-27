import { Stars } from 'entities/product/ui/Stars/Stars'
import styles from './ReviewCard.module.sass'
import cn from 'classnames'
import { ComponentProps } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import { Review } from 'shared/api/review/types'
import { Column } from 'shared/ui/Column'
import { BodyText, TitleText } from 'shared/ui/Typography'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

interface ReviewCardProps extends Omit<ComponentProps<'div'>, 'children'> {
	review: Review
}

export const ReviewCard = ({ review, className, ...otherProps }: ReviewCardProps) => {
	
	return (
		<div
			className={ cn(styles.container, className) }
			{ ...otherProps }
		>
			<IoPersonCircle className={ cn(styles.avatar) }/>
			<Column className={ cn('gap-m') }>
				<Column>
					<TitleText className={ cn(styles.name) }>{ review.user.name }</TitleText>
					<Stars rate={ review.rate }/>
				</Column>
				<BodyText>{ review.text }</BodyText>
				<BodyText className={ cn('clr-out') }>
					{ dayjs(review.updatedAt, { locale: 'ru', format: 'YYYY-MM-DD' }).format('DD.YY.YYYY') }
				</BodyText>
			</Column>
		</div>
	)
}