"use server";

import { Product } from "@/types/product.type";

type GetProductResponse = {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
};

export async function getProducts(page: number = 1, limit: number = 12, q: string = "", sortBy: string = "", sortOrder: string = ""): Promise<GetProductResponse> {
	try {
		const params = new URLSearchParams();
		if (q) params.append("q", q);
		if (sortBy) params.append("sortBy", sortBy);
		if (sortOrder) params.append("sortOrder", sortOrder);
		params.append("limit", limit.toString());
		params.append("skip", ((page - 1) * limit).toString());

		const response = await fetch(`https://dummyjson.com/products/search?${params.toString()}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return {
			products: [],
			total: 0,
			skip: 0,
			limit: 0,
		};
	}
}

export async function getCategories(): Promise<string[]> {
	try {
		const response = await fetch("https://dummyjson.com/products/category-list");
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
}
