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

const movement = {
	none: "none",
	left: "left",
	right: "right"
};

function App() {
	const categories = getUniqueCategories(items);
	const [defaultCategory] = categories;

	const [category, setCategory] = useState(defaultCategory);
	const [currentItemIndex, setCurrentItemIndex] = useState(0);
	const [movementDirection, setMovementDirection] = useState(movement.left);

	function renderCategorySelection() {
		function onCategoryChange(e) {
			setCategory(e.target.value);
			// reset the current index when the category is changed
			setCurrentItemIndex(0);
		}
		const props = { selectedCategory: category, categories, onCategoryChange };
		return <CategorySelection {...props} />;
	}

	function renderCarousel() {
		const filterFn = category === defaultCategory ? () => true : item => item.category === category;
		const itemsToUse = items.filter(filterFn);

		const onGoPrevious = () => {
			let nextItemIndex = currentItemIndex - 1;
			if (nextItemIndex < 0) nextItemIndex = itemsToUse.length - 1;
			setCurrentItemIndex(nextItemIndex);
			setMovementDirection(movement.right);
		};

		const onGoNext = () => {
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
