"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supbase/client";
import { useRouter } from "next/navigation";
import ProfileComponent from "@/components/ProfileComponet";
import { motion } from "framer-motion";
import { BackButton } from "@/components/ui/back-button";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
        return;
      }

      const { data: user, error: userError } = await supabase
        .from("user")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (user) {
        setUserData(user);
      } else {
        // Fallback to session user data if row missing
        const meta = session.user.user_metadata || {};
        setUserData({
          id: session.user.id,
          email: session.user.email,
          name: meta.full_name || meta.name || session.user.email?.split("@")[0],
          avatar: meta.avatar_url || meta.picture || null,
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="mt-6">
          <ProfileComponent user={userData} />
        </div>
      </div>
    </motion.div>
  );
}
