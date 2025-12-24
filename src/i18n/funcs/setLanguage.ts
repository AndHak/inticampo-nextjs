// app/actions/setLanguage.ts
"use server";

import { cookies } from "next/headers";

export async function setLanguage(lang: string) {
  // En algunas versiones cookies() es síncrono, en otras puede ser una Promise,
  // por eso usamos await para cubrir ambos casos sin error de tipos.
  const cookieStore = await cookies();

  // Usamos la forma de objeto; es la más explícita y evita ambigüedades.
  cookieStore.set({
    name: "locale",
    value: lang,
    path: "/",          // accesible en todo el sitio
    // secure: true,     // opcional: solo en https
    // httpOnly: true,   // opcional: si lo pones true no será accesible desde document.cookie
    // sameSite: "lax",
    // maxAge: 60 * 60 * 24 * 365
  });
}
