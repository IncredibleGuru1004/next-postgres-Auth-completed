import { comparePasswords, generateToken } from "@/lib/auth";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, password } = data;

    const existingUser = await User.findOne({ where: { email } });

    if (password === "Google") {
      if (existingUser) {
        const token = generateToken({ email: existingUser.email, id: existingUser.id });
        return NextResponse.json({ token, user: existingUser }, { status: 409 });
      }

      const newUser = await User.create({ name, email, password });
      const token = generateToken({ email: email, id: newUser.id });
      return NextResponse.json({ token, user: newUser }, { status: 200 });
    } else if (password) {
      if (existingUser && existingUser.password === "Google") {
        return NextResponse.json({ error: 'You have to sign in with "Sign In With Google"' }, { status: 403 });
      }
      if (!existingUser || !comparePasswords(password, existingUser.password)) {
        return NextResponse.json({ error: 'Invalid credentials!' }, { status: 401 });
      }
      
      const token = generateToken({ id: existingUser.id, email: existingUser.email });
      return NextResponse.json({ token, user: existingUser }, { status: 200 });
    }

    return NextResponse.json({ error: 'Missing information' }, { status: 400 });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ error: 'Failed to process POST request' }, { status: 500 });
  }
}