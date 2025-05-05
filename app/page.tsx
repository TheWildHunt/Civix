// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Users, Vote } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────
// Secciones de la aplicación
const sections = [
  "Senado",
  "Cámara de Diputados",
  "Gobierno Regional",
  "Concejos Municipales",
  "Elecciones",
];

// Datos estáticos de Concejos Municipales
const comunasMunicipales = [
  {
    nombre: "Puerto Varas",
    periodos: {
      "2016": {
        alcalde: { nombre: "Ramón Bahamonde Cea", votos: 5659, partido: "Independiente" },
        concejales: [
          { nombre: "Renato Aichele Horn", votos: 1624, partido: "Renovación Nacional" },
          { nombre: "Javier Antonio Aburto Oyarzun", votos: 1298, partido: "Democracia Cristiana" },
          { nombre: "Luis Becerra Vargas", votos: 1288, partido: "Independiente" },
          { nombre: "Patricio Cortés Jones", votos: 777, partido: "Independiente" },
          { nombre: "Rosa Esther Benavides Mundaca", votos: 775, partido: "Democracia Cristiana" },
          { nombre: "Marcelo Salazar Vallejos", votos: 529, partido: "Unión Demócrata Independiente" },
        ],
      },
      "2021": {
        alcalde: { nombre: "Tomás Gárate Silva", votos: 5677, partido: "Independiente" },
        concejales: [
          { nombre: "Rocío Alvarado Díaz", votos: 3980, partido: "Independiente" },
          { nombre: "Juan Patricio Godoy", votos: 2516, partido: "Independiente" },
          { nombre: "Marcelo Salazar Vallejos", votos: 1009, partido: "Unión Demócrata Independiente" },
          { nombre: "Antonio Horn Cruz", votos: 953, partido: "Renovación Nacional" },
          { nombre: "Rodrigo Schnettler Weisser", votos: 773, partido: "Democracia Cristiana" },
          { nombre: "Nataly Schadow Muñoz", votos: 758, partido: "Partido Socialista de Chile" },
        ],
      },
      "2024": { // para período 2024–2028
        alcalde:   { nombre: "Tomás Gárate Silva", votos: 0, partido: "Independiente" },
        concejales:[
          { nombre: "Tamara Rammsy Sánchez", votos: 0, partido: "Independiente" },
          { nombre: "Nicolás Yunge Jurgensen", votos: 0, partido: "Independiente" },
          { nombre: "Juan Patricio Godoy", votos: 0, partido: "Independiente" },
          { nombre: "Rodrigo Schnettler Weisser", votos: 0, partido: "Democracia Cristiana" },
          { nombre: "Antonio Horn Cruz", votos: 0, partido: "Renovación Nacional" },
          { nombre: "Blanca Bongain Acevedo", votos: 0, partido: "Independiente" },
        ],
      },
    },
  },
];

function periodoLabel(año: string): string {
  if (año === "2016") return "2016–2021";
  if (año === "2021") return "2021–2024";
  if (año === "2024") return "2024–2028";
  return "";
}

// ─────────────────────────────────────────────────────────────────────
// Componentes de Datos (idénticos a como los tenías, con orden y parseFloat...)
function Alcaldes2016({ comuna }: { comuna: string }) {
  const [alcaldes, setAlcaldes] = useState<{ Candidatos: string; Votos: string; Estado?: string; Comuna?: string }[]>([]);
  const [orden, setOrden]       = useState<"nombre" | "votos" | null>(null);
  const [asc, setAsc]           = useState(true);

  useEffect(() => {
    fetch("https://opensheet.vercel.app/16ES7-Qtc9fhptiABa9oyMyG1qK6ZwjimCtYJ353t3xM/Alcaldes")
      .then(res => res.json())
      .then(data => setAlcaldes(data));
  }, []);

  const filtrados = alcaldes.filter(a => a.Comuna === comuna);
  const datosOrdenados = [...filtrados].sort((a, b) => {
    if (orden === "nombre") {
      return asc
        ? a.Candidatos.localeCompare(b.Candidatos)
        : b.Candidatos.localeCompare(a.Candidatos);
    } else if (orden === "votos") {
      const va = parseFloat(a.Votos.replace(/\./g, "").replace(",", "."));
      const vb = parseFloat(b.Votos.replace(/\./g, "").replace(",", "."));
      return asc ? va - vb : vb - va;
    }
    return 0;
  });

  return (
    <div className="w-full max-w-4xl space-y-4">
      <h2 className="text-2xl font-bold text-center text-black">Elección Alcalde 2016–2021</h2>
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="py-2 cursor-pointer" onClick={() => { setOrden("nombre"); setAsc(!asc); }}>
              Candidato {orden === "nombre" && (asc ? "▲" : "▼")}
            </th>
            <th className="py-2 cursor-pointer" onClick={() => { setOrden("votos"); setAsc(!asc); }}>
              Votos {orden === "votos" && (asc ? "▲" : "▼")}
            </th>
            <th className="py-2">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {datosOrdenados.map(a => (
            <tr key={a.Candidatos} className="border-b even:bg-gray-100">
              <td className="py-2 font-medium text-black">{a.Candidatos}</td>
              <td className="py-2 text-black">{a.Votos}</td>
              <td className="py-2 text-black">
                {a.Estado?.toLowerCase() === "electo"
                  ? <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-full">Electo 🗳️</span>
                  : <span className="text-gray-500 text-xs">No electo</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Concejales2016({ comuna }: { comuna: string }) {
  const [concejales, setConcejales] = useState<{ Candidatos: string; Votos: string; Estado?: string; Comuna?: string }[]>([]);
  const [orden, setOrden]           = useState<"nombre" | "votos" | null>(null);
  const [asc, setAsc]               = useState(true);

  useEffect(() => {
    fetch("https://opensheet.vercel.app/16ES7-Qtc9fhptiABa9oyMyG1qK6ZwjimCtYJ353t3xM/Concejales")
      .then(res => res.json())
      .then(data => setConcejales(data));
  }, []);

  const filtrados = concejales.filter(c => c.Comuna === comuna);
  const datosOrdenados = [...filtrados].sort((a, b) => {
    if (orden === "nombre") {
      return asc
        ? a.Candidatos.localeCompare(b.Candidatos)
        : b.Candidatos.localeCompare(a.Candidatos);
    } else if (orden === "votos") {
      const va = parseFloat(a.Votos.replace(/\./g, "").replace(",", "."));
      const vb = parseFloat(b.Votos.replace(/\./g, "").replace(",", "."));
      return asc ? va - vb : vb - va;
    }
    return 0;
  });

  return (
    <div className="w-full max-w-4xl space-y-4">
      <h2 className="text-2xl font-bold text-center text-black">Elección Concejales 2016–2021</h2>
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="py-2 cursor-pointer" onClick={() => { setOrden("nombre"); setAsc(!asc); }}>
              Candidato {orden === "nombre" && (asc ? "▲" : "▼")}
            </th>
            <th className="py-2 cursor-pointer" onClick={() => { setOrden("votos"); setAsc(!asc); }}>
              Votos {orden === "votos" && (asc ? "▲" : "▼")}
            </th>
            <th className="py-2">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {datosOrdenados.map(c => (
            <tr key={c.Candidatos} className="border-b even:bg-gray-100">
              <td className="py-2 font-medium text-black">{c.Candidatos}</td>
              <td className="py-2 text-black">{c.Votos}</td>
              <td className="py-2 text-black">
                {c.Estado?.toLowerCase() === "electo"
                  ? <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-full">Electo 🗳️</span>
                  : <span className="text-gray-500 text-xs">No electo</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Componente principal
export default function Home() {
  const [darkMode, setDarkMode]                 = useState(true);
  const [selectedSection, setSelectedSection]   = useState("Concejos Municipales");
  const [selectedComuna, setSelectedComuna]     = useState("Puerto Varas");
  const [selectedAnio, setSelectedAnio]         = useState<"2016" | "2021" | "2024">("2016");

  // Filtros para Elecciones
  const [selectedRegion]      = useState("Los Lagos");
  const [selectedDistrict]    = useState("25");
  const [selectedProvince]    = useState("Llanquihue");
  const [selectedComunaElec,  setSelectedComunaElec]  = useState("Puerto Varas");
  const [selectedTipoEleccion,setSelectedTipoEleccion]= useState("Alcalde");
  const [selectedEstablecimientos, setSelectedEstablecimientos] = useState<string[]>([]);

  const establecimientos = [
    "Hospital Puerto Varas",
    "Escuela Básica Puerto Varas",
    "CESFAM Puerto Varas",
  ];
  const tiposEleccion = [
    "Alcalde", "Concejal", "Concejero Regional",
    "Gobernador","Diputado","Senador","Presidente",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("modoOscuro");
    if (saved !== null) setDarkMode(saved === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("modoOscuro", String(darkMode));
  }, [darkMode]);

  const comunaData = comunasMunicipales.find(c => c.nombre === selectedComuna);
  const periodo    = comunaData?.periodos[selectedAnio];

  return (
    <div
      className={`min-h-screen p-6 flex flex-col items-center transition-colors font-sans ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } text-black`}
    >
      <header className="flex justify-between w-full max-w-5xl mb-6">
        <h1 className="text-5xl font-extrabold">CIVIX</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/20 backdrop-blur"
        >
          {darkMode
            ? <Sun className="w-5 h-5 text-yellow-400"/>
            : <Moon className="w-5 h-5 text-gray-900"/>}
        </button>
      </header>

      {/* Segmented control */}
      <div className="inline-flex bg-white/20 backdrop-blur rounded-full p-1 mb-6">
        {sections.map(sec => (
          <button
            key={sec}
            onClick={() => setSelectedSection(sec)}
            className={`px-4 py-1 text-sm rounded-full transition ${
              selectedSection === sec
                ? "bg-white bg-opacity-80 text-gray-900"
                : "text-white/80 hover:text-white"
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {selectedSection === "Concejos Municipales" && periodo && (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-5xl">
            <div className="flex-1">
              <label className="block text-sm mb-1">Comuna</label>
              <select
                value={selectedComuna}
                onChange={e => setSelectedComuna(e.target.value)}
                className="w-full p-2 border rounded-xl bg-white/20 backdrop-blur"
              >
                {comunasMunicipales.map(c => (
                  <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Período</label>
              <select
                value={selectedAnio}
                onChange={e => setSelectedAnio(e.target.value as any)}
                className="w-full p-2 border rounded-xl bg-white/20 backdrop-blur"
              >
                <option value="2016">2016–2021</option>
                <option value="2021">2021–2024</option>
                <option value="2024">2024–2028</option>
              </select>
            </div>
          </div>

          <div className="space-y-6 w-full max-w-5xl">
            <div className="backdrop-blur bg-white/30 rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
                <Vote className="w-5 h-5 text-blue-600"/> Alcalde ({periodoLabel(selectedAnio)})
              </h3>
              <div className="mt-4 space-y-1 text-black">
                <p><strong>Nombre:</strong> {periodo.alcalde.nombre}</p>
                <p><strong>Votos:</strong> {periodo.alcalde.votos}</p>
                <p><strong>Partido:</strong> {periodo.alcalde.partido}</p>
              </div>
            </div>
            <div className="backdrop-blur bg-white/30 rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
                <Users className="w-5 h-5 text-blue-600"/> Concejales ({periodoLabel(selectedAnio)})
              </h3>
              <table className="w-full text-sm text-center">
                <thead>
                  <tr className="border-b bg-gray-200">
                    <th className="py-2">Nombre</th>
                    <th className="py-2">Votos</th>
                    <th className="py-2">Partido</th>
                  </tr>
                </thead>
                <tbody>
                  {periodo.concejales.map(c => (
                    <tr key={c.nombre} className="border-b even:bg-gray-100">
                      <td className="py-2 text-black">{c.nombre}</td>
                      <td className="py-2 text-black">{c.votos}</td>
                      <td className="py-2 text-black">{c.partido}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {selectedSection === "Elecciones" && (
        <div className="w-full max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold text-center text-black">Historial de Elecciones</h2>
          {/* Aquí puedes volver a incluir Alcaldes2016 y Concejales2016 u otros componentes de elecciones */}
          <Alcaldes2016 comuna={selectedComunaElec} />
          <Concejales2016 comuna={selectedComunaElec} />
        </div>
      )}

      {selectedSection !== "Concejos Municipales" && selectedSection !== "Elecciones" && (
        <div className="text-gray-500 italic">Sección aún en desarrollo.</div>
      )}
    </div>
  );
}
