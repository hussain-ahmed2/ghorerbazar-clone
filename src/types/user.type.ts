export type UserType = {
	_id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	email: string;
	password: string;
	phone: string;
	address: string;
	avatar: string;
	role: UserRole;
	createdAt: string;
	updatedAt: string;
};

export enum UserRole {
	USER = "user",
	ADMIN = "admin",
}

export type JWTPayload = {
	id: string;
	role: UserRole;
};
