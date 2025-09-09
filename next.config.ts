import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "cdn.dummyjson.com",
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
