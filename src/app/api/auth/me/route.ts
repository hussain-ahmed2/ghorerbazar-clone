import { connectDB } from "@/lib/connection";
import { makeJson, verifyAccessToken } from "@/lib/utils";
import User, { IUser } from "@/models/user.model";
import { JWTPayload } from "@/types/user.type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		// verify access token
		const token = request.cookies.get("access_token")?.value || request.headers.get("Authorization")?.split("Bearer ")[1] || "";
		if (!token) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// destructure access token
		const { id } = verifyAccessToken(token) as JWTPayload;

		// connect to db
		await connectDB();

		// find user
		const user: IUser | null = await User.findById(id);
		if (!user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		return NextResponse.json({ user: makeJson(user), message: "User data retrieved successfully" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
