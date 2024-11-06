
import { hashPassword } from "@/lib/auth";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(req, res)
{
	try {
		const users = await User.findAll()
		users.sort((a,b) => a.id - b.id);
		return NextResponse.json(users, { status: 200 });
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
	}
}

export async function POST(req)
{
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

export async function PUT(req)
{

	try {
		const id = new URL(req.url).searchParams.get('id');
		if (!id) {
			console.warn("User ID not provided");
			return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
		}

		const data = await req.json();
		const {name, email, role} = data;

		const user = await User.findByPk(id);
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Update the user with new data
		user.name = name;
		user.email = email;
		user.role = role;
		await user.save();

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
	}
}

export async function DELETE(req)
{
	try {
		const id = new URL(req.url).searchParams.get('id');
		if (!id) {
			console.warn("User ID not provided");
			return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
		}
		console.log("delete user with ID:", id);
		const user = await User.findByPk(id);
		if (!user) {
			return NextResponse.json({ error: 'user not found' }, { status: 404 });
		}
		await user.destroy();
		return NextResponse.json({ message: 'user deleted' }, { status: 200 });
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
	}
}
