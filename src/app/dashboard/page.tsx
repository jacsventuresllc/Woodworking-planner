"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, Trash2, Edit, LogOut, Loader2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  imageUrl: string | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/projects")
        .then((res) => res.json())
        .then((data) => {
          setProjects(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects(projects.filter((p) => p.id !== id));
  };

  const completedCount = projects.filter((p) => p.status === "complete").length;

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900">
              Your Projects
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {session?.user?.name || "Woodworker"}!
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/project/new"
              className="bg-accent hover:bg-accent-dark text-white font-medium px-4 py-2 rounded-button flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              New Project
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-surface hover:bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-button flex items-center gap-2 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface rounded-card shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
              </div>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <FileText className="text-primary" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-surface rounded-card shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{completedCount}</p>
              </div>
              <div className="bg-success/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <FileText className="text-success" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-surface rounded-card shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Plan</p>
                <p className="text-3xl font-bold text-gray-900">Free</p>
              </div>
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <FileText className="text-accent" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Project Card */}
          <Link
            href="/project/new"
            className="bg-surface rounded-card shadow-card p-6 border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors group"
          >
            <div className="h-40 flex flex-col items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
              <Plus size={48} />
              <p className="mt-2 font-medium">Start New Project</p>
            </div>
          </Link>

          {/* Project Cards */}
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-surface rounded-card shadow-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {project.name}
                  </h3>
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
                      project.status === "complete"
                        ? "bg-success/10 text-success"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/project/${project.id}`}
                  className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 font-medium px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Edit size={16} />
                  View
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p>No projects yet. Create your first one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
