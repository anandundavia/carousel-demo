// @ts-check
import * as S from "../styled-components/";

import CarouselItem from "./CarouselItem";

export default function Carousel(props) {
	const { items, currentItemIndex, movementDirection, onGoPrevious, onGoNext } = props;

	const getCarouselItemClassFromIndex = index => {
		const isOnLeft = currentItemIndex - 1 >= 0 && currentItemIndex - 1 === index;
		if (isOnLeft) return "item-left";

		const isCenter = currentItemIndex === index;
		if (isCenter) return "item-center";

		const isOnRight = currentItemIndex + 1 < items.length && currentItemIndex + 1 === index;
		if (isOnRight) return "item-right";

		return "";
	};

	function renderCarouselItems() {
		function renderLastItemPlaceholder() {
			if (currentItemIndex !== 0) return;
			const index = items.length - 1;
			const item = items[index];
			const props = { className: "item-left", movementDirection, item };
			return <CarouselItem key={`${item.name}#${index}`} {...props}></CarouselItem>;
		}

		function renderFirstItemPlaceholder() {
			if (currentItemIndex !== items.length - 1) return;
			const index = 0;
			const item = items[index];
			const props = { className: "item-right", movementDirection, item };
			return <CarouselItem key={`${item.name}#${index}`} {...props}></CarouselItem>;
		}
		return (
			<>
				{renderLastItemPlaceholder()}
				{items.map((item, index) => {
					const className = getCarouselItemClassFromIndex(index);
					const props = { className, movementDirection, item };
					return <CarouselItem key={`${item.name}#${index}`} {...props}></CarouselItem>;
				})}
				{renderFirstItemPlaceholder()}
			</>
		);
	}

	function renderCarouselControls() {
		return (
			<S.CarouselControls>
				<S.SingleCarouselControl left onClick={onGoPrevious}>
					&#8592;
				</S.SingleCarouselControl>
				<S.SingleCarouselControl right onClick={onGoNext}>
					&#8594;
				</S.SingleCarouselControl>
			</S.CarouselControls>
		);
	}

	function renderCarouselDots() {
		return (
			<S.CarouselDots>
				{items.map((_, index) => {
					return <div className={`single-dot ${currentItemIndex === index ? "active" : ""}`}></div>;
				})}
			</S.CarouselDots>
		);
	}

	return (
		<S.CarouselContainer>
			<div className="items">{renderCarouselItems()}</div>
			<div>{renderCarouselControls()}</div>
			<div>{renderCarouselDots()}</div>
		</S.CarouselContainer>
	);
}
