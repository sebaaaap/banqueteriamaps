import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
    try {
        const { body, isValidSignature } = await parseBody<{ _type: string }>(
            req,
            process.env.SANITY_REVALIDATE_SECRET
        );

        if (!isValidSignature) {
            return new NextResponse("Invalid signature", { status: 401 });
        }

        if (!body?._type) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        // Revalidad las rutas principales cuando algo cambia en Sanity
        console.log(`Revalidando por cambio en: ${body._type}`);

        revalidatePath("/");
        revalidatePath("/servicios");
        revalidatePath("/eventos");

        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        });
    } catch (err: any) {
        console.error(err);
        return new NextResponse(err.message, { status: 500 });
    }
}
