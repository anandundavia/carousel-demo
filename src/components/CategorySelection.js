// @ts-check
import * as S from "../styled-components/";

export default function CategorySelection(props) {
	const { onCategoryChange, selectedCategory, categories } = props;
	return (
		<S.CategorySelection>
			Category:
			<S.Select onChange={onCategoryChange} value={selectedCategory}>
				{categories.map(aCategory => (
					<option key={aCategory} value={aCategory}>
						{aCategory}
					</option>
				))}
			</S.Select>
		</S.CategorySelection>
	);
}
