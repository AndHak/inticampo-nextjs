import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function langMiddleware(request: NextRequest) {
  // Leer cookie "lang"
  const lang = request.cookies.get("locale")?.value || "es";

  // Guardar el idioma como header para usarlo en next-intl
  const response = NextResponse.next();
  response.headers.set("x-user-lang", lang);

  return response;
}

export const config = {
  matcher: "/:path*",
};
