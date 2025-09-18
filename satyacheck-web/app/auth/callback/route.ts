import { createClient } from "@/utils/supbase/server";
import { storeUserData } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export async function GET(request: any) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    redirect("/error");
    return;
  }

  try {
    const supabase = createClient();
    const { data, error } = await (
      await supabase
    ).auth.exchangeCodeForSession(code);

    if (error) {
      redirect("/error");
      return;
    }

    if (data?.session?.user) {
      await storeUserData(data.session.user);
    }
  } catch {
    redirect("/error");
    return;
  }

  redirect("/profile");
}
