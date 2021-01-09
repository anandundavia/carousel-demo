import styled from "styled-components";

export default styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	overflow-x: hidden;
	white-space: nowrap; // This will make the CarouselItem to not wrap around the div

	font-size: 16px;

	& > div.items {
		margin: 10vh 0; // Margin to take enough space for the center item - which is scaled to look bigger
	}
`;
