import styled from "styled-components";

export default styled.div`
	height: calc(100vh - 77px);
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
