import styled from "styled-components";

export default styled.div`
	margin-top: 16px;
	display: flex;

	& div.single-dot {
		margin: 0 8px;

		height: 12px;
		width: 12px;

		background-color: black;
		border-radius: 50%;

		transition: background-color 0.4s ease-in-out;

		&.active {
			background-color: white;
		}
	}
`;
