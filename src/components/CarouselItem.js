// @ts-check
import * as S from "../styled-components/";

export default function CarouselItem(props) {
	const { item, ...otherProps } = props;
	return (
		<S.CarouselItem {...otherProps} imageURL={item.image}>
			<span>
				{item.name} | {item.category} | {item.price}
			</span>
		</S.CarouselItem>
	);
}
