'use server';

import { createClient } from "../lib/supServer";
import { redirect } from "next/navigation";

export async function cerrarSesion() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Error al cerrar sesión:", error.message);
        return;
    }

    redirect("/");
}