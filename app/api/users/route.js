import { hashPassword, verifyToken } from "@/lib/auth";
import User from "@/model/User";
import { NextResponse } from "next/server";

const authenticateRequest = (req) => {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ error: "Token not provided" }, { status: 401 });
    }
    return verifyToken(token);
};

export async function GET(req) {
    try {
        const user = authenticateRequest(req);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const users = await User.findAll();
        users.sort((a, b) => a.id - b.id);
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const user = authenticateRequest(req);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json(); // Parse incoming JSON request
        const { name, password, email, role } = data;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }
        const hashedPassword = hashPassword(password);
        const newUser = await User.create({ name, email, role, password: hashedPassword });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error processing POST request:", error);
        return NextResponse.json({ error: 'Failed to process POST request' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const user = authenticateRequest(req);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const id = new URL(req.url).searchParams.get('id');
        if (!id) {
            console.warn("User ID not provided");
            return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
        }

        const data = await req.json();
        const { name, email, role } = data;

        const userToUpdate = await User.findByPk(id);
        if (!userToUpdate) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Update the user with new data
        userToUpdate.name = name;
        userToUpdate.email = email;
        userToUpdate.role = role;
        await userToUpdate.save();

        return NextResponse.json(userToUpdate, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const user = authenticateRequest(req);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const id = new URL(req.url).searchParams.get('id');
        if (!id) {
            console.warn("User ID not provided");
            return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
        }
        console.log("Delete user with ID:", id);
        const userToDelete = await User.findByPk(id);
        if (!userToDelete) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        await userToDelete.destroy();
        return NextResponse.json({ message: 'User deleted' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}