// @ts-check

import { useState } from "react";
import items from "./data/items.json";

import * as S from "./styled-components";

import CategorySelection from "./components/CategorySelection";
import Carousel from "./components/Carousel";

const getUniqueCategories = items => {
	const categories = new Set(["All"]);
	items.forEach(anItem => categories.add(anItem.category));
	return Array.from(categories);
};

// Helps keep track of what was the 'direction' of the slide
// Based on the direction, the animation is determined
const movement = {
	none: "none",
	left: "left",
	right: "right"
};

function App() {
	const categories = getUniqueCategories(items);
	// FirstCategory is All - Should be selected by default
	const [defaultCategory] = categories;

	// Current selected category
	const [category, setCategory] = useState(defaultCategory);
	// Index of the item which is in center right now
	const [currentItemIndex, setCurrentItemIndex] = useState(0);
	// The direction in which the items are moving.
	const [movementDirection, setMovementDirection] = useState(movement.none);

	/**
	 * Renders the category selection dropdown at the top
	 */
	function renderCategorySelection() {
		function onCategoryChange(e) {
			setCategory(e.target.value);
			// reset the current index when the category is changed
			// So that the carousel starts at the index 0
			setCurrentItemIndex(0);
		}
		const props = { selectedCategory: category, categories, onCategoryChange };
		return <CategorySelection {...props} />;
	}

	/**
	 * Renders the actual carousel
	 */
	function renderCarousel() {
		// In case if selected category is the default (ALL), then the predicate fn should return true for every item
		// Otherwise, it should return true for items with the matching category
		const filterFn = category === defaultCategory ? () => true : item => item.category === category;
		const itemsToUse = items.filter(filterFn);

		const onGoPrevious = () => {
			let nextItemIndex = currentItemIndex - 1;
			// Wrapping around to the last item
			if (nextItemIndex < 0) nextItemIndex = itemsToUse.length - 1;
			setCurrentItemIndex(nextItemIndex);
			setMovementDirection(movement.right);
		};

		const onGoNext = () => {
			// This takes care of wrapping around to 0
			const nextItemIndex = (currentItemIndex + 1) % itemsToUse.length;
			setCurrentItemIndex(nextItemIndex);
			setMovementDirection(movement.left);
		};

		const props = {
			items: itemsToUse,
			currentItemIndex,
			movementDirection,
			onGoPrevious,
			onGoNext
		};

		return <Carousel {...props} />;
	}

	return (
		<S.Container>
			{renderCategorySelection()}
			{renderCarousel()}
		</S.Container>
	);
}

export default App;
