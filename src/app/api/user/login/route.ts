import { DB, readDB } from "@lib/DB";
import { NextRequest, NextResponse } from "next/server";
import sleep from "sleep-promise";
import { Database } from "@lib/types";

import jwt from "jsonwebtoken";

/* POST http://localhost:3000/api/user/login */
export const POST = async (request:NextRequest) => {
  const body = await request.json();
  const { username, password } = body;

  //you should do the validation here
  readDB();
  const user = (<Database>DB).users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        message: "Username or password is incorrect",
      },
      { status: 400 }
    );
  }

  const secret = process.env.JWT_SECRET || "This is another secret"

  //if found user, sign a JWT TOKEN
  const token = jwt.sign(
    { username, role: user.role, studentId: user.studentId },
    secret,
    { expiresIn: "8h" }
  );

  await sleep(1000);

  return NextResponse.json({ ok: true, token, username });
};
