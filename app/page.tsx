"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      "2025": {
        alcalde: { nombre: "Tomás Gárate Silva", votos: 0, partido: "Independiente" },
        concejales: [
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

// Convierte el año clave en su rango textual
function periodoLabel(año: string): string {
  if (año === "2016") return "2016–2021";
  if (año === "2021") return "2021–2024";
  if (año === "2025") return "2024–2028";
  return "";
}

// ─────────────────────────────────────────────────────────────────────
// Componente para mostrar Alcaldes 2016–2021 desde Google Sheets
function Alcaldes2016({ comuna }: { comuna: string }) {
  const [alcaldes, setAlcaldes] = useState<{ Candidatos: string; Votos: string; Estado?: string; Comuna?: string }[]>([]);
  const [orden, setOrden] = useState<"nombre" | "votos" | null>(null);
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    fetch("https://opensheet.vercel.app/16ES7-Qtc9fhptiABa9oyMyG1qK6ZwjimCtYJ353t3xM/Alcaldes")
      .then((res) => res.json())
      .then((data) => setAlcaldes(data));
  }, []);

  // Filtra por comuna (si tu hoja tiene esa columna)
  const filtrados = comuna
    ? alcaldes.filter((a) => a.Comuna === comuna)
    : alcaldes;

  // Orden dinámico
  const datosOrdenados = [...filtrados].sort((a, b) => {
    if (orden === "nombre") {
      return asc
        ? a.Candidatos.localeCompare(b.Candidatos)
        : b.Candidatos.localeCompare(a.Candidatos);
    } else if (orden === "votos") {
      const votosA = parseFloat(a.Votos.replace(/\./g, "").replace(",", "."));
      const votosB = parseFloat(b.Votos.replace(/\./g, "").replace(",", "."));
      return asc ? votosA - votosB : votosB - votosA;
    }
    return 0;
  });

  return (
    <div className="w-full max-w-4xl space-y-4">
      <h2 className="text-2xl font-bold text-center">Elección Alcalde 2016–2021</h2>
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="border-b bg-gray-200 dark:bg-gray-700">
            <th
              className="py-2 cursor-pointer"
              onClick={() => { setOrden("nombre"); setAsc(!asc); }}
            >
              Candidato {orden === "nombre" && (asc ? "▲" : "▼")}
            </th>
            <th
              className="py-2 cursor-pointer"
              onClick={() => { setOrden("votos"); setAsc(!asc); }}
            >
              Votos {orden === "votos" && (asc ? "▲" : "▼")}
            </th>
            <th className="py-2">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {datosOrdenados.map((a) => (
            <tr key={a.Candidatos} className="border-b even:bg-gray-100 dark:even:bg-gray-800">
              <td className="py-2 font-medium">{a.Candidatos}</td>
              <td className="py-2">{a.Votos}</td>
              <td className="py-2">
                {a.Estado?.toLowerCase() === "electo" ? (
                  <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-full">
                    Electo 🗳️
                  </span>
                ) : (
                  <span className="text-gray-500 text-xs">No electo</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Componente para mostrar Concejales 2016–2021 desde Google Sheets
function Concejales2016({ comuna }: { comuna: string }) {
  const [concejales, setConcejales] = useState<{ Candidatos: string; Votos: string; Estado?: string; Comuna?: string }[]>([]);
  const [orden, setOrden] = useState<"nombre" | "votos" | null>(null);
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    fetch("https://opensheet.vercel.app/16ES7-Qtc9fhptiABa9oyMyG1qK6ZwjimCtYJ353t3xM/Concejales")
      .then((res) => res.json())
      .then((data) => setConcejales(data));
  }, []);

  const filtrados = comuna
    ? concejales.filter((c) => c.Comuna === comuna)
    : concejales;

  const datosOrdenados = [...filtrados].sort((a, b) => {
    if (orden === "nombre") {
      return asc
        ? a.Candidatos.localeCompare(b.Candidatos)
        : b.Candidatos.localeCompare(a.Candidatos);
    } else if (orden === "votos") {
      const votosA = parseFloat(a.Votos.replace(/\./g, "").replace(",", "."));
      const votosB = parseFloat(b.Votos.replace(/\./g, "").replace(",", "."));
      return asc ? votosA - votosB : votosB - votosA;
    }
    return 0;
  });

  return (
    <div className="w-full max-w-4xl space-y-4">
      <h2 className="text-2xl font-bold text-center">Elección Concejales 2016–2021</h2>
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="border-b bg-gray-200 dark:bg-gray-700">
            <th
              className="py-2 cursor-pointer"
              onClick={() => { setOrden("nombre"); setAsc(!asc); }}
            >
              Candidato {orden === "nombre" && (asc ? "▲" : "▼")}
            </th>
            <th
              className="py-2 cursor-pointer"
              onClick={() => { setOrden("votos"); setAsc(!asc); }}
            >
              Votos {orden === "votos" && (asc ? "▲" : "▼")}
            </th>
            <th className="py-2">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {datosOrdenados.map((c) => (
            <tr key={c.Candidatos} className="border-b even:bg-gray-100 dark:even:bg-gray-800">
              <td className="py-2 font-medium">{c.Candidatos}</td>
              <td className="py-2">{c.Votos}</td>
              <td className="py-2">
                {c.Estado?.toLowerCase() === "electo" ? (
                  <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-full">
                    Electo 🗳️
                  </span>
                ) : (
                  <span className="text-gray-500 text-xs">No electo</span>
                )}
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
  const [selectedSection, setSelectedSection] = useState("Concejos Municipales");
  const [selectedComuna, setSelectedComuna] = useState("Puerto Varas");
  const [selectedAnio, setSelectedAnio] = useState("2021");
  const [darkMode, setDarkMode] = useState(true);

  // Estados para filtros jerárquicos en Elecciones
  const [selectedRegion, setSelectedRegion] = useState("Los Lagos");
  const [selectedDistrict, setSelectedDistrict] = useState("1");
  const [selectedProvince, setSelectedProvince] = useState("Llanquihue");
  const [selectedComunaElec, setSelectedComunaElec] = useState("Puerto Varas");

  // Opciones de ejemplo (puedes cargarlas dinámicamente si prefieres)
  const regiones = ["Los Lagos", "Biobío", "Araucanía"];
  const distritos = ["1", "2", "3"];
  const provincias = ["Llanquihue", "Osorno", "Chiloé"];
  const comunasElec = ["Puerto Varas", "Puerto Montt", "Castro"];

  // Persistir modo oscuro
  useEffect(() => {
    const saved = localStorage.getItem("modoOscuro");
    if (saved !== null) setDarkMode(saved === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("modoOscuro", String(darkMode));
  }, [darkMode]);

  const comunaData = comunasMunicipales.find((c) => c.nombre === selectedComuna);
  const periodo = comunaData?.periodos[selectedAnio];

  return (
    <div className={`min-h-screen p-6 space-y-6 flex flex-col items-center transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}>
      <div className="flex justify-between w-full max-w-5xl items-center">
        <h1 className="text-5xl font-extrabold tracking-wide text-blue-700 dark:text-blue-300">CIVIX</h1>
        <Button onClick={() => setDarkMode(!darkMode)} variant="outline" className="ml-4 rounded-full">
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400"/> : <Moon className="w-5 h-5 text-gray-900"/>}
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {sections.map((section) => (
          <Button
            key={section}
            onClick={() => setSelectedSection(section)}
            variant={selectedSection === section ? "default" : "outline"}
            className={`rounded-xl px-6 py-2 text-base ${
              selectedSection !== section && darkMode ? "text-black" : ""
            }`}
          >
            {section}
          </Button>
        ))}
      </div>

      {selectedSection === "Concejos Municipales" && (
        <>
          {/* Filtros Comuna / Período */}
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Selecciona una comuna</label>
                <select
                  value={selectedComuna}
                  onChange={(e) => setSelectedComuna(e.target.value)}
                  className="w-full bg-white text-black border rounded-xl px-3 py-2 text-sm shadow-sm focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                >
                  {comunasMunicipales.map((com) => (
                    <option key={com.nombre} value={com.nombre}>{com.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Selecciona un período</label>
                <select
                  value={selectedAnio}
                  onChange={(e) => setSelectedAnio(e.target.value)}
                  className="w-full bg-white text-black border rounded-xl px-3 py-2 text-sm shadow-sm focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                >
                  <option value="2016">2016–2021</option>
                  <option value="2021">2021–2024</option>
                  <option value="2025">2024–2028</option>
                </select>
              </div>
            </div>
          </div>

          {/* Datos Municipales */}
          <div className="flex flex-col gap-6 w-full max-w-5xl mt-6">
            {periodo && (
              <>
                <Card className="rounded-2xl shadow dark:bg-gray-800">
                  <CardContent className="p-6 text-center text-white">
                    <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                      <Vote className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Alcalde ({periodoLabel(selectedAnio)})
                    </h3>
                    <p><strong>Nombre:</strong> {periodo.alcalde.nombre}</p>
                    <p><strong>Votos:</strong> {periodo.alcalde.votos}</p>
                    <p><strong>Partido:</strong> {periodo.alcalde.partido}</p>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow dark:bg-gray-800">
                  <CardContent className="p-6 text-white">
                    <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Concejales ({periodoLabel(selectedAnio)})
                    </h3>
                    {periodo.concejales.length === 0 ? (
                      <p className="text-sm italic text-gray-400 text-center">Aún no se han definido concejales para este período.</p>
                    ) : (
                      <table className="w-full text-sm text-center">
                        <thead>
                          <tr className="border-b text-white">
                            <th className="py-2">Nombre</th>
                            <th className="py-2">Votos</th>
                            <th className="py-2">Partido</th>
                          </tr>
                        </thead>
                        <tbody>
                          {periodo.concejales.map((c) => (
                            <tr key={c.nombre} className="border-b even:bg-gray-50 hover:bg-gray-100 dark:even:bg-gray-700 dark:hover:bg-gray-600">
                              <td className="py-2 text-white">{c.nombre}</td>
                              <td className="py-2 text-white">{c.votos}</td>
                              <td className="py-2 text-white">{c.partido}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </>
      )}

      {selectedSection === "Elecciones" && (
        <div className="w-full max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold text-center">Historial de Elecciones</h2>

          {/* Filtros Jerárquicos */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Región</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:text-white"
              >
                {regiones.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Distrito</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:text-white"
              >
                {distritos.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Provincia</label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:text-white"
              >
                {provincias.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Comuna</label>
              <select
                value={selectedComunaElec}
                onChange={(e) => setSelectedComunaElec(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:text-white"
              >
                {comunasElec.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tablas de Elecciones */}
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