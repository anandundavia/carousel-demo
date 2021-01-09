// @ts-check
import * as S from "../styled-components/";

import CarouselItem from "./CarouselItem";

export default function Carousel(props) {
	const { items, currentItemIndex, movementDirection, onGoPrevious, onGoNext } = props;

	/**
	 * Renders the Items.
	 * The items are "left", "center" and "right"
	 * At any point of time, only three items are there in the viewport and also on DOM
	 */
	function renderCarouselItems() {
		/**
		 * Takes a look at the index of the and compares it with the currentItemIndex
		 * to determine wether the index "on left" or "center" or "on right" of the currentItemIndex
		 * It returns the classname to be applied to that item
		 * @param {Number} index index of the item
		 */
		const getCarouselItemClassFromIndex = index => {
			// Here, we do not need take care of the case when item might be on left after wrapping around
			// That is already taken care by renderLastItemPlaceholder()
			const isOnLeft = currentItemIndex - 1 >= 0 && currentItemIndex - 1 === index;
			if (isOnLeft) return "item-left";

			const isCenter = currentItemIndex === index;
			if (isCenter) return "item-center";

			const isOnRight = currentItemIndex + 1 < items.length && currentItemIndex + 1 === index;
			if (isOnRight) return "item-right";

			// Contract: In case if the classname is a falsy value, we would not render that item on the DOM
			return undefined;
		};

		/**
		 * When the center item is the first one ( currentItemIndex === 0 )
		 * We need a 'fake' item to be there on the left hand side of the center item
		 *
		 * This needs to be handled separately because when the 0th item is at center,
		 * the sequence of the items on the DOM would become center, right, left
		 *
		 * Example:
		 * Let us say there are 5 items, and 0th item is in the center:
		 * [0, 1, 2, 3, 4]
		 *  c  r        l <- 4th item is the "left" because of the logic to wrap around the last item
		 *
		 * And because the array indices are processed in sequential manner,
		 * We would have "center", "right", "left" items on the DOM
		 *
		 * A 'fake' item is needed to prevent this.
		 * A 'fake' item would ensure the items are in correct order on the DOM Like this:
		 *
		 * 4 [0, 1, 2, 3, 4]
		 * l  c  r
		 */
		function renderLastItemPlaceholder() {
			// As explained above, we need to only render this 'fake' item in case if the 0th item is on "center"
			if (currentItemIndex !== 0) return;
			const index = items.length - 1;
			const item = items[index];
			const props = { className: "item-left", movementDirection, item };
			return <CarouselItem key={`${item.name}#${index}`} {...props}></CarouselItem>;
		}

		/**
		 * When the center item is the first one ( currentItemIndex === items.length - 1 )
		 *
		 * As explained above, the sequence of the items would be come "right", "left", "center" when
		 * the last item is on "center"
		 *
		 * [0, 1, 2, 3, 4]
		 *  r        l  c
		 *  ^
		 * 	Due to wrapping around
		 *
		 * How a "fake" item helps is:
		 * [0, 1, 2, 3, 4] 0
		 *           l  c  r
		 *
		 */
		function renderFirstItemPlaceholder() {
			// Render only in case the last item is on "center"
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
					// We can skip the items on the DOM if they are not either "left", "center" or "right" items
					if (!className) return null;
					const props = { className, movementDirection, item };
					return <CarouselItem key={`${item.name}#${index}`} {...props}></CarouselItem>;
				})}
				{renderFirstItemPlaceholder()}
			</>
		);
	}

	/**
	 * Renders the left and right arrow which controls the movement of the carousel
	 */
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

	/**
	 * Renders the dots below the carousel items which visually indicate the active item in sequence
	 */
	function renderCarouselDots() {
		return (
			<S.CarouselDots>
				{items.map((_, index) => {
					return <div key={index} className={`single-dot ${currentItemIndex === index ? "active" : ""}`}></div>;
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
