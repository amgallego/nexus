import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ESTADO_CONFIG = {
  pendiente: { label: "Pendiente", bg: "#FFF3CD", color: "#856404", icon: "⏳" },
  aprobado: { label: "Aprobado", bg: "#D1E7DD", color: "#0F5132", icon: "✓" },
  rechazado: { label: "Rechazado", bg: "#F8D7DA", color: "#842029", icon: "✕" },
  docs_pendientes: { label: "Docs. Pendientes", bg: "#CFF4FC", color: "#055160", icon: "📄" },
};

function Badge({ estado }) {
  const c = ESTADO_CONFIG[estado] || ESTADO_CONFIG.pendiente;
  return (
    <span style={{ background: c.bg, color: c.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
      {c.icon} {c.label}
    </span>
  );
}

function Modal({ aspirante, onClose, onAction }) {
  if (!aspirante) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: 520, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#1A3A5C", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
              {aspirante.nombre.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0D1B2A" }}>{aspirante.nombre}</h2>
            <p style={{ margin: "4px 0 0", color: "#6B7280", fontSize: 14 }}>{aspirante.carrera}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#9CA3AF", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {[
            ["Cédula", aspirante.cedula],
            ["Promedio", aspirante.promedio + " / 5.0"],
            ["Email", aspirante.email],
            ["Teléfono", aspirante.telefono],
            ["Fecha postulación", aspirante.fecha],
            ["Estado", <Badge estado={aspirante.estado} />],
          ].map(([label, val]) => (
            <div key={label} style={{ background: "#F9FAFB", borderRadius: 8, padding: "10px 14px" }}>
              <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{label}</p>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: "#0D1B2A", fontWeight: 500 }}>{val}</p>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 20 }}>
          <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600, color: "#374151" }}>Documentos entregados ({aspirante.documentos.length})</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {aspirante.documentos.map(d => <span key={d} style={{ background: "#D1E7DD", color: "#0F5132", padding: "3px 10px", borderRadius: 20, fontSize: 12 }}>✓ {d}</span>)}
          </div>
          {aspirante.faltantes.length > 0 && <>
            <p style={{ margin: "12px 0 8px", fontSize: 13, fontWeight: 600, color: "#374151" }}>Documentos faltantes ({aspirante.faltantes.length})</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {aspirante.faltantes.map(d => <span key={d} style={{ background: "#F8D7DA", color: "#842029", padding: "3px 10px", borderRadius: 20, fontSize: 12 }}>✕ {d}</span>)}
            </div>
          </>}
        </div>
        <div style={{ display: "flex", gap: 10, borderTop: "1px solid #E5E7EB", paddingTop: 20 }}>
          <button onClick={() => onAction(aspirante.id, "aprobado")} style={{ flex: 1, background: "#0F5132", color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>✓ Aprobar</button>
          <button onClick={() => onAction(aspirante.id, "rechazado")} style={{ flex: 1, background: "#842029", color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>✕ Rechazar</button>
          <button onClick={() => onAction(aspirante.id, "docs_pendientes")} style={{ flex: 1, background: "#055160", color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>📄 Solicitar docs</button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ aspirantes, carreras, docentes }) {
  const stats = [
    { label: "Total aspirantes", value: aspirantes.length, icon: "👥", color: "#1A3A5C" },
    { label: "Aprobados", value: aspirantes.filter(a => a.estado === "aprobado").length, icon: "✓", color: "#0F5132" },
    { label: "Pendientes", value: aspirantes.filter(a => a.estado === "pendiente").length, icon: "⏳", color: "#856404" },
    { label: "Carreras activas", value: carreras.length, icon: "🎓", color: "#4B1563" },
  ];
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0D1B2A", margin: "0 0 24px" }}>Panel general</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 20px", borderLeft: `4px solid ${s.color}` }}>
            <p style={{ margin: "0 0 8px", fontSize: 28 }}>{s.icon}</p>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6B7280" }}>{s.label}</p>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#374151", margin: "0 0 16px" }}>Ocupación por carrera</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {carreras.map(c => {
          const pct = Math.round((c.inscritos / c.cupos) * 100);
          return (
            <div key={c.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0D1B2A" }}>{c.nombre}</span>
                <span style={{ fontSize: 13, color: "#6B7280" }}>{c.inscritos}/{c.cupos} cupos</span>
              </div>
              <div style={{ background: "#F3F4F6", borderRadius: 99, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct > 85 ? "#DC2626" : pct > 60 ? "#D97706" : "#059669", borderRadius: 99, transition: "width 0.5s" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Aspirantes({ aspirantes, setAspirantes }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [modal, setModal] = useState(null);

  const filtrados = aspirantes.filter(a => {
    const coincide = a.nombre.toLowerCase().includes(busqueda.toLowerCase()) || a.cedula.includes(busqueda) || a.carrera.toLowerCase().includes(busqueda.toLowerCase());
    const estadoOk = filtroEstado === "todos" || a.estado === filtroEstado;
    return coincide && estadoOk;
  });

  const handleAction = (id, nuevoEstado) => {
    setAspirantes(prev => prev.map(a => a.id === id ? { ...a, estado: nuevoEstado } : a));
    setModal(null);
  };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0D1B2A", margin: "0 0 20px" }}>Aspirantes</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          placeholder="Buscar por nombre, cédula o carrera…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: "9px 14px", border: "1px solid #D1D5DB", borderRadius: 8, fontSize: 14, outline: "none" }}
        />
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} style={{ padding: "9px 14px", border: "1px solid #D1D5DB", borderRadius: 8, fontSize: 14, background: "#fff", outline: "none" }}>
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
          <option value="rechazado">Rechazado</option>
          <option value="docs_pendientes">Docs. Pendientes</option>
        </select>
      </div>
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["Aspirante", "Cédula", "Carrera", "Promedio", "Postulación", "Estado", "Acciones"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a, i) => (
              <tr key={a.id} style={{ borderBottom: "1px solid #F3F4F6", background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1A3A5C", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                      {a.nombre.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0D1B2A" }}>{a.nombre}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 14, color: "#6B7280" }}>{a.cedula}</td>
                <td style={{ padding: "14px 16px", fontSize: 14, color: "#374151" }}>{a.carrera}</td>
                <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 700, color: a.promedio >= 4 ? "#0F5132" : a.promedio >= 3.5 ? "#856404" : "#842029" }}>{a.promedio}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280" }}>{a.fecha}</td>
                <td style={{ padding: "14px 16px" }}><Badge estado={a.estado} /></td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => setModal(a)} title="Ver información" style={{ background: "#EFF6FF", color: "#1D4ED8", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>👁 Ver</button>
                    <button onClick={() => handleAction(a.id, "aprobado")} title="Aprobar" style={{ background: "#D1E7DD", color: "#0F5132", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>✓</button>
                    <button onClick={() => handleAction(a.id, "rechazado")} title="Rechazar" style={{ background: "#F8D7DA", color: "#842029", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>✕</button>
                    <button onClick={() => handleAction(a.id, "docs_pendientes")} title="Solicitar documentación" style={{ background: "#CFF4FC", color: "#055160", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>📄</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <div style={{ padding: 48, textAlign: "center", color: "#9CA3AF" }}>
            <p style={{ fontSize: 32, margin: 0 }}>🔍</p>
            <p style={{ fontSize: 15, marginTop: 8 }}>No se encontraron aspirantes</p>
          </div>
        )}
      </div>
      <p style={{ color: "#9CA3AF", fontSize: 13, marginTop: 10 }}>{filtrados.length} resultado{filtrados.length !== 1 ? "s" : ""}</p>
      <Modal aspirante={modal} onClose={() => setModal(null)} onAction={handleAction} />
    </div>
  );
}

function Carreras({ carreras }) {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0D1B2A", margin: "0 0 24px" }}>Administración de carreras</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {carreras.map(c => (
          <div key={c.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 22, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #1A3A5C, #2E7D9A)" }} />
            <div style={{ marginTop: 8 }}>
              <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, color: "#0D1B2A" }}>{c.nombre}</h3>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: "#6B7280" }}>{c.facultad}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Semestres", c.semestres, "🗓"],
                  ["Créditos", c.creditos, "📚"],
                  ["Cupos", c.cupos, "💺"],
                  ["Inscritos", c.inscritos, "👥"],
                ].map(([label, val, icon]) => (
                  <div key={label} style={{ background: "#F9FAFB", borderRadius: 8, padding: "10px 12px" }}>
                    <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{icon} {label}</p>
                    <p style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 800, color: "#0D1B2A" }}>{val}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>Ocupación</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0D1B2A" }}>{Math.round((c.inscritos / c.cupos) * 100)}%</span>
                </div>
                <div style={{ background: "#E5E7EB", borderRadius: 99, height: 6 }}>
                  <div style={{ width: `${(c.inscritos / c.cupos) * 100}%`, height: "100%", background: "#1A3A5C", borderRadius: 99 }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Docentes({ docentes }) {
  const [busqueda, setBusqueda] = useState("");
  const filtrados = docentes.filter(d =>
    d.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.cedula.includes(busqueda) ||
    d.carrera.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.cargo.toLowerCase().includes(busqueda.toLowerCase())
  );
  const cargos = { "Profesor Titular": "#1A3A5C", "Profesora Titular": "#1A3A5C", "Profesor Asociado": "#2E7D9A", "Profesora Asociada": "#2E7D9A", "Instructor": "#6B7280", "Catedrático": "#4B1563", "Esp. Hernán Castro": "#4B1563" };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0D1B2A", margin: "0 0 20px" }}>Administración de docentes</h2>
      <input
        placeholder="Buscar docente…"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{ width: "100%", padding: "9px 14px", border: "1px solid #D1D5DB", borderRadius: 8, fontSize: 14, outline: "none", marginBottom: 20, boxSizing: "border-box" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {filtrados.map(d => {
          const initials = d.nombre.replace(/^(Dr\.|Dra\.|Mg\.|Esp\.|Arq\.)\s/, "").split(" ").map(n => n[0]).slice(0, 2).join("");
          const accentColor = cargos[d.cargo] || "#4B5563";
          return (
            <div key={d.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: accentColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
                {initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ margin: "0 0 3px", fontSize: 15, fontWeight: 700, color: "#0D1B2A" }}>{d.nombre}</h3>
                <span style={{ display: "inline-block", background: accentColor + "22", color: accentColor, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, marginBottom: 10, letterSpacing: "0.03em" }}>{d.cargo}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    ["Cédula", d.cedula],
                    ["Carrera", d.carrera],
                    ["Depto.", d.departamento],
                    ["Email", d.email],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", gap: 6, fontSize: 13 }}>
                      <span style={{ color: "#9CA3AF", minWidth: 52, fontWeight: 600 }}>{l}</span>
                      <span style={{ color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filtrados.length === 0 && (
        <div style={{ textAlign: "center", color: "#9CA3AF", padding: 48 }}>
          <p style={{ fontSize: 32, margin: 0 }}>🔍</p>
          <p style={{ fontSize: 15, marginTop: 8 }}>No se encontraron docentes</p>
        </div>
      )}
    </div>
  );
}

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "aspirantes", label: "Aspirantes", icon: "👥" },
  { key: "carreras", label: "Carreras", icon: "🎓" },
  { key: "docentes", label: "Docentes", icon: "👨‍🏫" },
];

export default function App() {
  const [seccion, setSeccion] = useState("dashboard");
  const [aspirantes, setAspirantes] = useState(MOCK_ASPIRANTES);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContenido = () => {
    switch (seccion) {
      case "dashboard": return <Dashboard aspirantes={aspirantes} carreras={MOCK_CARRERAS} docentes={MOCK_DOCENTES} />;
      case "aspirantes": return <Aspirantes aspirantes={aspirantes} setAspirantes={setAspirantes} />;
      case "carreras": return <Carreras carreras={MOCK_CARRERAS} />;
      case "docentes": return <Docentes docentes={MOCK_DOCENTES} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F3F4F6" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 240 : 64,
        background: "#0D1B2A",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#2E7D9A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🎓</div>
          {sidebarOpen && (
            <div>
              <p style={{ margin: 0, color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>UniAdmisiones</p>
              <p style={{ margin: 0, color: "#94A3B8", fontSize: 11 }}>Sistema académico</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => setSeccion(item.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "11px 12px",
                background: seccion === item.key ? "rgba(46,125,154,0.35)" : "transparent",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                marginBottom: 2,
                textAlign: "left",
                borderLeft: seccion === item.key ? "3px solid #2E7D9A" : "3px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ color: seccion === item.key ? "#fff" : "#94A3B8", fontSize: 14, fontWeight: seccion === item.key ? 600 : 400, whiteSpace: "nowrap" }}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ margin: "8px", padding: "10px", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 8, cursor: "pointer", color: "#94A3B8", fontSize: 16, display: "flex", justifyContent: "center" }}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0D1B2A" }}>
              {NAV_ITEMS.find(n => n.key === seccion)?.label}
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>Período académico 2025-I</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1A3A5C", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>AD</div>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0D1B2A" }}>Administrador</p>
              <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF" }}>admin@univ.edu</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
          {renderContenido()}
        </div>
      </div>
    </div>
  );
}