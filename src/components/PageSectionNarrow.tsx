import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function PageSectionNarrow(props: Props) {
	return (
		<div className={"px-5 py-10"}>
			<div className={"max-w-5xl mx-auto"}>{props.children}</div>
		</div>
	);
}
