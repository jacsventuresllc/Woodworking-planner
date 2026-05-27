import Link from "next/link";
import { Plus, FileText, Trash2, Edit, Download, Settings, LogOut } from "lucide-react";

// Demo projects for display (will be replaced with database data)
const demoProjects = [
  {
    id: "1",
    name: "Farmhouse Dining Table",
    status: "complete",
    createdAt: "2026-05-20",
    thumbnail: null,
  },
  {
    id: "2",
    name: "Bookshelf",
    status: "draft",
    createdAt: "2026-05-22",
    thumbnail: null,
  },
  {
    id: "3",
    name: "Cutting Board",
    status: "draft",
    createdAt: "2026-05-25",
    thumbnail: null,
  },
];

export default function DashboardPage() {
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
              Manage and create your woodworking plans
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
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface rounded-card shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
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
                <p className="text-3xl font-bold text-gray-900">1</p>
              </div>
              <div className="bg-success/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <Download className="text-success" size={24} />
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
                <Settings className="text-accent" size={24} />
              </div>
            </div>
            <Link href="/pricing" className="text-sm text-accent hover:underline mt-2 inline-block">
              Upgrade to Pro →
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Project Card */}
          <Link
            href="/project/new"
            className="bg-surface rounded-card shadow-card p-6 border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors group"
          >
            <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg mb-4 group-hover:border-primary/50">
              <Plus size={48} className="text-gray-300 group-hover:text-primary" />
            </div>
            <p className="text-center text-gray-600 font-medium">
              Create New Project
            </p>
          </Link>

          {/* Project Cards */}
          {demoProjects.map((project) => (
            <div
              key={project.id}
              className="bg-surface rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
            >
              {/* Thumbnail */}
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileText size={48} className="text-gray-300" />
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading font-semibold text-gray-900 truncate">
                    {project.name}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      project.status === "complete"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {project.status === "complete" ? "Complete" : "Draft"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Created {project.createdAt}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/project/${project.id}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-button flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button className="p-2 text-gray-400 hover:text-error transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Info */}
        <div className="mt-8 bg-surface rounded-card shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-gray-900">
              Free Plan Usage
            </h3>
            <span className="text-sm text-gray-500">3 / 3 projects used</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            You&apos;ve used all your free projects. Upgrade to Pro for unlimited access.
          </p>
          <Link
            href="/pricing"
            className="inline-block mt-3 text-accent hover:underline font-medium"
          >
            View Pro Plans →
          </Link>
        </div>
      </div>
    </div>
  );
}
