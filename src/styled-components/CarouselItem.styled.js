import styled from "styled-components";

export default styled.div.attrs()`
	min-height: calc(50vh);
	min-width: calc(80vw);

	justify-content: center;
	align-items: center;
	font-size: 24px;

	border-radius: 16px;

	background-color: gray;
	background-image: url(${props => props.imageURL});
	background-repeat: no-repeat;
	background-size: 100%;

	margin: 0 24px;

	display: none;

	&.item-left,
	&.item-right,
	&.item-center {
		display: inline-flex;
	}

	&.item-center {
		box-shadow: -4px -4px 20px #292d32, -4px 4px 20px #292d32, 4px -4px 20px #292d32,
			4px 4px 20px #292d32;
		z-index: 1;
	}

	&.item-left {
		animation: left-item--direction-${props => props.movementDirection} 0.4s ease-in-out forwards;
		cursor: pointer;
	}

	&.item-center {
		animation: center-item--direction-${props => props.movementDirection} 0.4s ease-in-out forwards;
	}

	&.item-right {
		animation: right-item--direction-${props => props.movementDirection} 0.4s ease-in-out forwards;
		cursor: pointer;
	}

	@keyframes left-item--direction-left {
		from {
			transform: translateX(calc(80vw + 48px)) scaleY(1.3);
		}
		to {
			transform: translateX(0) scaleY(1);
		}
	}

	@keyframes left-item--direction-right {
		from {
			transform: translateX(calc(-80vw - 48px));
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes center-item--direction-left {
		from {
			transform: translateX(calc(80vw + 48px));
		}
		to {
			transform: translateX(0) scaleY(1.3);
		}
	}

	@keyframes center-item--direction-right {
		from {
			transform: translateX(calc(-80vw - 48px));
		}
		to {
			transform: translateX(0) scaleY(1.3);
		}
	}

	@keyframes right-item--direction-left {
		from {
			transform: translateX(calc(80vw + 48px));
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes right-item--direction-right {
		from {
			transform: translateX(calc(-80vw - 48px)) scaleY(1.3);
		}
		to {
			transform: translateX(0);
		}
	}

	& > span {
		display: inline-block;
		border: 1px solid black;
		padding: 40px 80px;
		border-radius: 8px;
		background: #121212;
		opacity: 0.6;
		transform: scaleY(0.76); // To negate the scale by parent 1 / 1.3 = 0.76
	}
`;
