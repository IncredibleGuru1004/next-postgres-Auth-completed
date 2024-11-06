import { hashPassword } from "@/lib/auth";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const data = await req.json(); // Parse incoming JSON request
		const {name, password,email} = data

		const existingUser = await User.findOne({where:{email}});
		if (existingUser) {
			return NextResponse.json({error: 'User already exists'}, {status:409})
		}
		const hashedPassword = hashPassword(password)
		const newUser = await User.create({name, email,password:hashedPassword})

		return NextResponse.json(newUser, { status: 201 });
	} catch (error) {
		console.error("Error processing POST request:", error);
		return NextResponse.json({ error: 'Failed to process POST request' }, { status: 500 });
	}
}
