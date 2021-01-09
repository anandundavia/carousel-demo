import styled from "styled-components";

export default styled.div.attrs(props => ({ left: props.left, right: props.right }))`
	// The category selection takes 77px :/
	height: calc(100vh - 77px);
	// The center item is 80vw, leaving 10vw each for left and right items
	// Removing more 48px from both the sides to match the left and right items perfectly
	width: calc(10vw - 48px);

	display: flex;
	justify-content: center;
	align-items: center;

	padding-top: 77px;

	font-size: 4em;

	cursor: pointer;

	background-image: linear-gradient(
		${props => (props.left ? "to right" : "to left")},
		#313131,
		transparent
	);
`;
