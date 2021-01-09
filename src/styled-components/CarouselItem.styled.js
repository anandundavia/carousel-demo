import styled from "styled-components";

export default styled.div`
	height: calc(50vh);
	width: calc(80vw);

	justify-content: center;
	align-items: center;
	font-size: 1.2rem;

	border-radius: 16px;

	background-color: rgba(0, 0, 0, 0.4);
	background-image: url(${props => props.imageURL});
	background-repeat: no-repeat;
	background-size: 100%;
	background-position: 50% 50%;

	margin: 0 24px;

	display: none;

	&.item-left,
	&.item-right,
	&.item-center {
		display: inline-flex;
	}

	&.item-center {
		box-shadow: -4px -4px 20px #202428, -4px 4px 20px #202428, 4px -4px 20px #202428,
			4px 4px 20px #202428;
		z-index: 1; // To make it look above left and right items
		transform: scaleY(1.3); // Center item should be bigger
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

	/* 
		The below animations are named in format of <item-position>-item--direction-<direction>
		Each of three left center and right items have different animations based on how was the carousel moved 
		Whether it was moved to the left or to the right 

		Left direction means - Going next in the sequence, or incrementing the currentItemIndex - All the items moves towards left on the screen
		Right direction means - Going back in the sequence, or decrementing the currentItemIndex - All the items moves towards right on the screen

		These animations are applied as "forwards"
		Which implies that "to" section would always have translateX(0) and scaleY(1.3) (for center item)
	*/

	// When all the items are moving towards left, the left-item start off as being positioned in the center
	// And moves to its original position
	@keyframes left-item--direction-left {
		from {
			transform: translateX(calc(80vw + 48px)) scaleY(1.3); // 80vh being the width of the carousel item and 48px being the margin on both the sides
		}
		to {
			transform: translateX(0) scaleY(1);
		}
	}

	// When all the items are moving towards right, the left-item start off as being positioned out of screen from left hand side
	// And moves to its original position
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
		padding: 16px 48px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.8);
		color: black;
	}
`;
