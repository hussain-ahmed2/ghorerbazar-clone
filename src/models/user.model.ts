import { UserRole, UserType } from "@/types/user.type";
import { Document, model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "@/lib/utils";

type IUserMethods = {
	comparePassword: (password: string) => Promise<boolean>;
	createAccessToken: () => string;
	createRefreshToken: () => string;
};

export type IUser = Document & UserType & IUserMethods;

const userSchema = new Schema<IUser>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: { type: String, required: true },
		address: { type: String, default: "" },
		avatar: { type: String, default: "/default-avatar.png" },
		role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

userSchema.methods.comparePassword = async function (this: IUser, password: string) {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
};

userSchema.methods.createAccessToken = function (this: IUser) {
	return generateAccessToken({ id: this._id, role: this.role });
};

userSchema.methods.createRefreshToken = function (this: IUser) {
	return generateRefreshToken({ id: this._id });
};

const User = models.User || model<IUser>("User", userSchema);

export default User;
