import { reviewStore } from 'features/review/lib/reviewStore'
import { useCreateReview } from 'features/review/model/useCreateReview'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { IoChatboxOutline, IoStar, IoStarOutline } from 'react-icons/io5'
import { Backdrop, BackdropProps } from 'shared/ui/Backdrop/Backdrop'
import { Button } from 'shared/ui/Button'
import { Column } from 'shared/ui/Column'
import { Dialog } from 'shared/ui/Dialog'
import { HeadlineText } from 'shared/ui/Typography'
import { InputField } from 'shared/ui/fields'
import cn from 'classnames'
import styles from './CreateReviewModalWindow.module.sass'
import { Row } from 'shared/ui/Row'
import { IconButton } from 'shared/ui/IconButton'
import { ErrorMessage } from 'shared/ui/ErrorMessage/ErrorMessage'

interface CreateReviewModalWindowProps extends Omit<BackdropProps, 'children'> {}

export const CreateReviewModalWindow = observer(({ onClick, ...otherProps }: CreateReviewModalWindowProps) => {
	const { mutate, isLoading, error, reset } = useCreateReview()
	const [text, setText] = useState(undefined)
	const [rate, setRate] = useState(1)

	useEffect(() => {
		reset()
		setText(undefined)
		setRate(1)
	}, [])
	
	return reviewStore.isCreateReviewModalWindowVisible && (
		<Backdrop
			onClick={ (e) => {
				reviewStore.setIsCreateReviewModalWindowVisible(false)
				onClick && onClick(e)
			} }
			{ ...otherProps }
		>
			<Dialog isLoading={ isLoading }>
				<Column
					className={ cn('gap-xl', styles.group) }
					as='form'
					onSubmit={ (e) => {
						e.preventDefault()
						mutate({ text, productId: reviewStore.productId, rate })
					} }
				>
					<Column
						className={ cn('gap-m', styles.group) }
						style={ { background: 'inherit' } }
					>
						<HeadlineText
							size='small'
							className={ cn(styles.headline) }
						>
							Оставить отзыв
						</HeadlineText>
						<Row className={ cn('justify-center') }>
							{ [1, 2, 3, 4, 5].map(item => {
								if (item <= rate) {
									return (
										<IconButton
											selected
											IconFilled={ IoStar }
											IconOutlined={ IoStarOutline }
											key={ item }
											onClick={ () => setRate(item) }
										/>
									)
								} else {
									return (
										<IconButton
											IconFilled={ IoStar }
											IconOutlined={ IoStarOutline }
											key={ item }
											onClick={ () => setRate(item) }
										/>
									)
								}

							}) }
						</Row>
						<InputField
							placeholder='Текст отзыва'
							supportingText='*необязательно'
							onChange={ (e) => setText(e.currentTarget.value) }
						/>
						{ error && (
							<ErrorMessage className={ cn(styles.error) }>
								{ error.response.data.Message }
							</ErrorMessage>
						) }
					</Column>
					<Button
						LeadingIcon={ IoChatboxOutline }
						type='submit'
					>
						Отправить
					</Button>
				</Column>
			</Dialog>
		</Backdrop>
		
	)
})