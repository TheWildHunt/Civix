// Home.tsx
"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Users, Vote } from "lucide-react";

// ─── datos estáticos ───────────────────────────────────────────────
const sections = [
  "Senado",
  "Cámara de Diputados",
  "Gobierno Regional",
  "Concejos Municipales",
  "Elecciones",
];

const comunasMunicipales = [ /* ...igual que antes...*/ ];

// ─── utilidades ───────────────────────────────────────────────────
function periodoLabel(año: string): string {
  if (año === "2016") return "2016–2021";
  if (año === "2021") return "2021–2024";
  if (año === "2025") return "2024–2028";
  return "";
}

// ─── componentes de datos ─────────────────────────────────────────
function Alcaldes2016({ comuna }: { comuna: string }) {
  /* igual que antes, con orden y parseFloat(...) */
}

function Concejales2016({ comuna }: { comuna: string }) {
  /* igual que antes, con orden y parseFloat(...) */
}

// ─── componente principal ─────────────────────────────────────────
export default function Home() {
  const [selectedSection, setSelectedSection] = useState("Concejos Municipales");
  const [selectedComuna, setSelectedComuna] = useState("Puerto Varas");
  const [selectedAnio, setSelectedAnio] = useState("2021");
  const [darkMode, setDarkMode] = useState(true);

  // elecciones
  const [selectedRegion] = useState("Los Lagos");
  const [selectedDistrict] = useState("25");
  const [selectedProvince] = useState("Llanquihue");
  const [selectedComunaElec, setSelectedComunaElec] = useState("Puerto Varas");
  const [selectedTipoEleccion, setSelectedTipoEleccion] = useState("Alcalde");
  const establecimientos = [
    "Hospital Puerto Varas",
    "Escuela Básica Puerto Varas",
    "CESFAM Puerto Varas",
  ];
  const tiposEleccion = [
    "Alcalde",
    "Concejal",
    "Concejero Regional",
    "Gobernador",
    "Diputado",
    "Senador",
    "Presidente",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("modoOscuro");
    if (saved !== null) setDarkMode(saved === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("modoOscuro", String(darkMode));
  }, [darkMode]);

  const comunaData = comunasMunicipales.find(c => c.nombre === selectedComuna);
  const periodo = comunaData?.periodos[selectedAnio];

  return (
    <div className={`min-h-screen p-6 flex flex-col items-center transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      } font-sans`}>
      <header className="flex justify-between w-full max-w-5xl items-center mb-6">
        <h1 className="text-5xl font-extrabold">CIVIX</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/20 backdrop-blur"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400"/> : <Moon className="w-5 h-5 text-gray-900"/>}
        </button>
      </header>

      {/* ─── segmented control ───────────────────────────────────────── */}
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
        <div className="space-y-6 w-full max-w-5xl">
          <div className="backdrop-blur bg-white/30 dark:bg-gray-800/30 rounded-3xl shadow-xl p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Vote className="w-5 h-5 text-blue-600"/> Alcalde ({periodoLabel(selectedAnio)})
            </h3>
            <div className="mt-4 space-y-1">
              <p><strong>Nombre:</strong> {periodo.alcalde.nombre}</p>
              <p><strong>Votos:</strong> {periodo.alcalde.votos}</p>
              <p><strong>Partido:</strong> {periodo.alcalde.partido}</p>
            </div>
          </div>
          <div className="backdrop-blur bg-white/30 dark:bg-gray-800/30 rounded-3xl shadow-xl p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600"/> Concejales ({periodoLabel(selectedAnio)})
            </h3>
            {/* tabla ordenable igual que antes */}
          </div>
        </div>
      )}

      {selectedSection === "Elecciones" && (
        <div className="w-full max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold text-center">Historial de Elecciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Región</label>
              <select
                disabled
                value={selectedRegion}
                className="w-full p-2 border rounded-xl bg-white/20 backdrop-blur"
              >
                <option>{selectedRegion}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Distrito</label>
              <select
                disabled
                value={selectedDistrict}
                className="w-full p-2 border rounded-xl bg-white/20 backdrop-blur"
              >
                <option>{selectedDistrict}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Provincia</label>
              <select
                disabled
                value={selectedProvince}
                className="w-full p-2 border rounded-xl bg-white/20 backdrop-blur"
              >
                <option>{selectedProvince}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Comuna</label>
              <select
                value={selectedComunaElec}
                onChange={e => setSelectedComunaElec(e.target.value)}
                className="w-full p-2 border rounded-xl bg-white/20 backdrop-blur"
              >
                <option>{selectedComunaElec}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Tipo de elección</label>
            <div className="inline-flex bg-white/20 backdrop-blur rounded-full p-1">
              {tiposEleccion.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTipoEleccion(t)}
                  className={`px-3 py-1 text-sm rounded-full transition ${
                    selectedTipoEleccion === t
                      ? "bg-white bg-opacity-80 text-gray-900"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Establecimientos</label>
            <select
              multiple
              value={selectedEstablecimientos}
              onChange={e =>
                setSelectedEstablecimientos(
                  Array.from(e.target.selectedOptions, o => o.value)
                )
              }
              className="w-full h-32 p-2 border rounded-xl bg-white/20 backdrop-blur"
            >
              {establecimientos.map(est => (
                <option key={est} value={est}>{est}</option>
              ))}
            </select>
          </div>

          {selectedTipoEleccion === "Alcalde" && (
            <Alcaldes2016 comuna={selectedComunaElec}/>
          )}
          {selectedTipoEleccion === "Concejal" && (
            <Concejales2016 comuna={selectedComunaElec}/>
          )}
          {["Concejero Regional","Gobernador","Diputado","Senador","Presidente"]
            .includes(selectedTipoEleccion) && (
            <p className="italic text-center">Sección en desarrollo…</p>
          )}
        </div>
      )}
    </div>
  );
}
