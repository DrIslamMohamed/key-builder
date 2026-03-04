import { auth } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await request.json();

  if (!data) {
    return NextResponse.json({ error: "No image data" }, { status: 400 });
  }

  const url = await uploadImage(data);
  return NextResponse.json({ url });
}
