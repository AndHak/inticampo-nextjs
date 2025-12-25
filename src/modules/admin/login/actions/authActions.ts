"use server";

export async function loginAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (username === adminUser && password === adminPass) {
    return { success: true };
  }

  return { success: false, error: "Credenciales inválidas" };
}
