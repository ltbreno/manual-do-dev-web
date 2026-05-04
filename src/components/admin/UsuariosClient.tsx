"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import { Users, Plus, Trash2, Pencil, XCircle, Check, Shield } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

const ROLES = [
  { value: "admin", label: "Admin", color: "var(--dash-accent-pink)" },
  { value: "manager", label: "Manager", color: "var(--dash-accent-blue)" },
  { value: "viewer", label: "Viewer", color: "var(--dash-muted)" },
];

function roleColor(role: string) {
  return ROLES.find((r) => r.value === role)?.color ?? "var(--dash-muted)";
}
function roleLabel(role: string) {
  return ROLES.find((r) => r.value === role)?.label ?? role;
}

export default function UsuariosClient() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadUsers() {
    setLoading(true);
    fetch("/api/usuarios")
      .then((r) => r.json())
      .then((d) => { setUsers(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { loadUsers(); }, []);

  async function saveUser(form: { name: string; email: string; role: string }) {
    setSaving(true);
    setError("");
    try {
      const url = editUser ? `/api/usuarios/${editUser.id}` : "/api/usuarios";
      const method = editUser ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json() as { error?: string };
        setError(d.error ?? "Erro ao salvar");
        return;
      }
      await loadUsers();
      setShowModal(false);
      setEditUser(null);
    } finally {
      setSaving(false);
    }
  }

  async function deleteUser(id: string) {
    const res = await fetch(`/api/usuarios/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
    setDeleteId(null);
  }

  function openEdit(user: AdminUser) {
    setEditUser(user);
    setShowModal(true);
    setError("");
  }

  function openAdd() {
    setEditUser(null);
    setShowModal(true);
    setError("");
  }

  return (
    <div className="flex min-h-screen bg-[var(--dash-bg)] text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 min-w-0 font-sans">
        <TopBar />
        <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Gestão de Usuários</h2>
              <p className="text-[var(--dash-muted)] text-xs mt-0.5">{users.length} usuários cadastrados</p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-[var(--dash-accent-pink)] hover:bg-[var(--dash-accent-pink)]/80 text-white rounded-2xl font-bold text-sm shadow-lg shadow-pink-500/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Adicionar Usuário
            </button>
          </div>

          {loading ? (
            <div className="bg-[var(--dash-card)] border border-[var(--dash-border)] rounded-3xl p-8">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-14 bg-white/5 rounded-2xl animate-pulse" />
                ))}
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="bg-[var(--dash-card)] border border-[var(--dash-border)] rounded-3xl p-16 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-[var(--dash-muted)] opacity-30" />
              <p className="text-[var(--dash-muted)] font-medium">Nenhum usuário cadastrado ainda.</p>
              <button
                onClick={openAdd}
                className="mt-4 text-[var(--dash-accent-pink)] text-sm font-bold hover:underline"
              >
                Adicionar o primeiro usuário
              </button>
            </div>
          ) : (
            <div className="bg-[var(--dash-card)] border border-[var(--dash-border)] rounded-3xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.01] border-b border-[var(--dash-border)]">
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Usuário</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Email</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Papel</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Cadastrado em</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user) => {
                    const color = roleColor(user.role);
                    const initials = user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
                    return (
                      <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                              style={{ background: `${color}20`, color }}
                            >
                              {initials}
                            </div>
                            <p className="font-bold text-white text-sm">{user.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-[var(--dash-muted)]">{user.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5" style={{ color }} />
                            <span
                              className="text-xs font-black uppercase px-2 py-0.5 rounded-full"
                              style={{ color, background: `${color}20` }}
                            >
                              {roleLabel(user.role)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-[var(--dash-muted)]">
                            {new Date(user.created_at).toLocaleDateString("pt-BR")}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => openEdit(user)}
                              className="p-2 rounded-xl bg-white/5 border border-white/5 text-[var(--dash-muted)] hover:text-white hover:bg-white/10 transition-all"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteId(user.id)}
                              className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <UserModal
          user={editUser}
          onClose={() => { setShowModal(false); setEditUser(null); }}
          onSave={saveUser}
          saving={saving}
          error={error}
        />
      )}

      {deleteId && (
        <ConfirmDelete
          onConfirm={() => deleteUser(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

function UserModal({
  user,
  onClose,
  onSave,
  saving,
  error,
}: {
  user: AdminUser | null;
  onClose: () => void;
  onSave: (f: { name: string; email: string; role: string }) => void;
  saving: boolean;
  error: string;
}) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState(user?.role ?? "viewer");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ name, email, role });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[var(--dash-bg)] border border-[var(--dash-border)] w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-[var(--dash-border)] flex justify-between items-center">
          <h3 className="font-bold text-white">{user ? "Editar Usuário" : "Novo Usuário"}</h3>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={submit} className="p-8 space-y-5">
          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
          )}
          {[
            { label: "Nome", value: name, onChange: setName, type: "text", placeholder: "João Silva" },
            { label: "Email", value: email, onChange: setEmail, type: "email", placeholder: "joao@empresa.com" },
          ].map(({ label, value, onChange, type, placeholder }) => (
            <div key={label}>
              <label className="block text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest mb-2">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
          ))}
          <div>
            <label className="block text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest mb-2">Papel</label>
            <div className="flex gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    role === r.value ? "text-white border-white/20 bg-white/10" : "text-[var(--dash-muted)] border-white/5 hover:border-white/10"
                  }`}
                  style={role === r.value ? { color: r.color } : undefined}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl text-sm font-bold text-[var(--dash-muted)] hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--dash-accent-pink)] hover:bg-[var(--dash-accent-pink)]/80 text-white rounded-2xl font-bold text-sm shadow-lg shadow-pink-500/20 transition-all disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              {user ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmDelete({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[var(--dash-bg)] border border-red-500/30 w-full max-w-sm rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center">
          <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h3 className="font-bold text-white text-lg">Remover usuário?</h3>
          <p className="text-[var(--dash-muted)] text-sm mt-1">Esta ação não pode ser desfeita.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl text-sm font-bold text-[var(--dash-muted)] hover:text-white transition-colors border border-white/5"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-sm transition-all"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
