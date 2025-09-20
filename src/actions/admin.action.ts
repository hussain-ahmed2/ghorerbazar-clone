"use server";

import { connectDB } from "@/lib/connection";
import User from "@/models/user.model";
import { SortOrder } from "mongoose";

export async function getUsers({ limit = 12, q = "", sortBy = "", sortOrder = "", page = 1 }) {
	try {
		// connect to db
		await connectDB();

		// get total number of users
		const total = await User.countDocuments();

		// calculate skip
		const skip = (page - 1) * limit;

		// calculate total number of pages
		const totalPages = Math.ceil(total / limit);

		// calculate next and prev page
		const nextPage = page < totalPages ? page + 1 : null;
		const prevPage = page > 1 ? page - 1 : null;

		// generate search query
		const searchQuery = q
			? {
					$or: [
						{ firstName: { $regex: q, $options: "i" } },
						{ lastName: { $regex: q, $options: "i" } },
						{ email: { $regex: q, $options: "i" } },
						{ phone: { $regex: q, $options: "i" } },
						{ address: { $regex: q, $options: "i" } },
					],
			  }
			: {};

		// generate sort object
		const sort: { [key: string]: SortOrder } = {};
		if (sortBy) sort[sortBy] = sortOrder === "asc" ? 1 : -1;

		// find users
		const users = await User.find(searchQuery).sort(sort).skip(skip).limit(limit);

		return {
			users,
			total,
			skip,
			limit,
			totalPages,
			nextPage,
			prevPage,
		};
	} catch (error) {
		console.log(error);
		return {
			users: [],
			total: 0,
			skip: 0,
			limit: 0,
			totalPages: 0,
			nextPage: null,
			prevPage: null,
		};
	}
}
