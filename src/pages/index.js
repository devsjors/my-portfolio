import Layout from "@/components/layout";

const Index = () => {
	const seo = {
		seo_title: "Sjors Eveleens - Portfolio",
		seo_description: "Homepage",
	};

	return (
		<Layout seo={seo}>
			<section className="container">
				<h1 className="max-w-md mx-auto text-2xl font-extrabold leading-normal tracking-tight text-center sm:max-w-none lg:leading-tight xl:leading-snug xl:text-6xl sm:leading-normal sm:text-3xl lg:text-5xl font-display">
					I'm <span className="text-bg-gradient">Sjors</span>. I create develop
					creative digital solutions that give meaning.
				</h1>
			</section>
		</Layout>
	);
};

export default Index;
