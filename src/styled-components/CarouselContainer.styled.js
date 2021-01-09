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
`;
