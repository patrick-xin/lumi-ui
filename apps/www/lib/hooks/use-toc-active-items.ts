import { useEffect, useState } from "react";

export function useTocActiveItems(itemIds: string[]) {
	const [activeIds, setActiveIds] = useState<string[]>([]);

	useEffect(() => {
		let isUnmounted = false;
		const handleScroll = () => {
			if (isUnmounted) return;
			const scrollY = window.scrollY;
			const windowHeight = window.innerHeight;

			// Create a comfortable reading window
			const topThreshold = scrollY + 100;
			const bottomThreshold = scrollY + windowHeight - 100;

			const elements = itemIds
				.map((id) => document.getElementById(id))
				.filter((el): el is HTMLElement => el !== null);

			const visible: string[] = [];

			for (let i = 0; i < elements.length; i++) {
				const element = elements[i];
				const nextElement = elements[i + 1];

				const sectionTop = element.offsetTop;
				const sectionBottom = nextElement
					? nextElement.offsetTop
					: document.documentElement.scrollHeight;

				if (sectionTop <= bottomThreshold && sectionBottom >= topThreshold) {
					visible.push(element.id);
				}
			}

			if (visible.length === 0 && elements.length > 0 && scrollY < 50) {
				visible.push(elements[0].id);
			}

			setActiveIds((prev) => {
				if (
					prev.length === visible.length &&
					prev.every((v, index) => v === visible[index])
				) {
					return prev; // no change
				}
				return visible;
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);
		handleScroll();

		return () => {
			isUnmounted = true;
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [itemIds]);

	return activeIds;
}
