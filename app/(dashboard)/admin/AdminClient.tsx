"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

type Member = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  page: {
    id: string;
    slug: string;
    published: boolean;
    _count: { submissions: number };
  } | null;
};

export default function AdminClient({ members: initial }: { members: Member[] }) {
  const router = useRouter();
  const [members, setMembers] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "Failed to create member");
      return;
    }

    toast.success(`Member "${data.user.name}" created!`);
    setShowForm(false);
    router.refresh();
    // Optimistic update
    setMembers((prev) => [data.user, ...prev]);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-yellow-400">KEY</span>
          <span className="text-zinc-400">Admin Dashboard</span>
        </div>
        <Button
          variant="ghost"
          className="text-zinc-400 hover:text-white"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Sign Out
        </Button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-white">{members.length}</div>
              <div className="text-zinc-400 text-sm mt-1">Total Members</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-400">
                {members.filter((m) => m.page?.published).length}
              </div>
              <div className="text-zinc-400 text-sm mt-1">Published Pages</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-yellow-400">
                {members.reduce((acc, m) => acc + (m.page?._count?.submissions ?? 0), 0)}
              </div>
              <div className="text-zinc-400 text-sm mt-1">Total Submissions</div>
            </CardContent>
          </Card>
        </div>

        {/* Members Section */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Team Members</CardTitle>
            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add Member"}
            </Button>
          </CardHeader>

          {showForm && (
            <CardContent className="border-t border-zinc-800 pt-4">
              <form onSubmit={handleCreate} className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-zinc-300">Full Name</Label>
                  <Input name="name" required placeholder="Ahmed Ali" className="bg-zinc-800 border-zinc-700 text-white" />
                </div>
                <div className="space-y-1">
                  <Label className="text-zinc-300">Email</Label>
                  <Input name="email" type="email" required placeholder="ahmed@key.com" className="bg-zinc-800 border-zinc-700 text-white" />
                </div>
                <div className="space-y-1">
                  <Label className="text-zinc-300">Password</Label>
                  <Input name="password" type="password" required placeholder="••••••••" className="bg-zinc-800 border-zinc-700 text-white" />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="col-span-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                >
                  {loading ? "Creating..." : "Create Member"}
                </Button>
              </form>
            </CardContent>
          )}

          <CardContent>
            {members.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">No members yet. Add your first team member.</p>
            ) : (
              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-zinc-800 border border-zinc-700"
                  >
                    <div>
                      <div className="font-medium text-white">{member.name}</div>
                      <div className="text-sm text-zinc-400">{member.email}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-zinc-400">
                        {member.page?._count?.submissions ?? 0} leads
                      </span>
                      {member.page?.published ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Published
                        </Badge>
                      ) : (
                        <Badge className="bg-zinc-700 text-zinc-400 border-zinc-600">
                          Draft
                        </Badge>
                      )}
                      {member.page && (
                        <a
                          href={`/p/${member.page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-yellow-400 hover:text-yellow-300"
                        >
                          /p/{member.page.slug}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
