import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-2 px-4 bg-primary/10 text-center text-sm">
        <p>Admin Panel - Restricted Access</p>
      </div>
      {children}
    </div>
  )
}
