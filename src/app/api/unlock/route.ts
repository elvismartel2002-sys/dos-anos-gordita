import { NextResponse } from "next/server";
import { validateUnlockSecret } from "@/lib/auth/unlock";

const COOKIE_NAME = "anniversary_unlock";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 días

export async function POST(request: Request) {
  const secret = process.env.UNLOCK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "server_config" },
      { status: 500 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (!validateUnlockSecret(password, secret)) {
    return NextResponse.json({ ok: false, error: "invalid_password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });

  return response;
}

export async function GET(request: Request) {
  const unlocked = request.cookies.get(COOKIE_NAME)?.value === "1";
  return NextResponse.json({ unlocked });
}
