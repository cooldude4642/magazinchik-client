import { useRef, useState, useEffect } from 'react'

export const useScroll = () => {
	const ref = useRef<HTMLElement>(null)
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (!window.scrollY) {
				setIsScrolled(false)
			} else if (window.scrollY) {
				setIsScrolled(true)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return { isScrolled, ref }
}