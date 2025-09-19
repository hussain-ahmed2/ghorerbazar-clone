export default function Header({ title, description }: { title: string; description: string }) {
	return (
		<div>
			<h1 className="text-xl md:text-2xl font-bold max-md:text-center">{title}</h1>
			<p className="text-muted-foreground max-md:text-center">{description}</p>
		</div>
	);
}
