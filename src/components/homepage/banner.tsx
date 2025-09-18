import Image from "next/image";

export default function Banner() {
	return (
		<div>
			<Image className="aspect-[4/3] md:aspect-[21/9] w-full object-cover" src="/images/banner.png" width={1920} height={500} alt="banner" />
		</div>
	);
}
