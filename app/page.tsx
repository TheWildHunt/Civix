"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun, Users, Vote } from "lucide-react";

const sections = [
  "Senadores",
  "Diputados",
  "Gobierno Regional",
  "Concejos Municipales",
];

const comunasMunicipales = [
  {
    nombre: "Puerto Varas",
    periodos: {
      "2021": {
        alcalde: {
          nombre: "Tomás Gárate Silva",
          votos: 5677,
          partido: "Independiente",
        },
        concejales: [
          { nombre: "Rocío Alvarado Díaz", votos: 3980, partido: "Independiente" },
          { nombre: "Juan Patricio Godoy", votos: 2516, partido: "Independiente" },
          { nombre: "Marcelo Salazar Vallejos", votos: 1009, partido: "Unión Demócrata Independiente" },
          { nombre: "Antonio Horn Cruz", votos: 953, partido: "Renovación Nacional" },
          { nombre: "Rodrigo Schnettler Weisser", votos: 773, partido: "Democracia Cristiana" },
          { nombre: "Nataly Schadow Muñoz", votos: 758, partido: "Partido Socialista de Chile" },
        ]
      },
      "2025": {
        alcalde: {
          nombre: "Por definir",
          votos: 0,
          partido: "-",
        },
        concejales: []
      }
    }
  },
];

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("Concejos Municipales");
  const [selectedComuna, setSelectedComuna] = useState("Puerto Varas");
  const [selectedAnio, setSelectedAnio] = useState("2021");
  const [darkMode, setDarkMode] = useState(false);

  const comuna = comunasMunicipales.find((c) => c.nombre === selectedComuna);
  const periodo = comuna?.periodos[selectedAnio];

  return (
    <div className={`min-h-screen p-6 space-y-6 flex flex-col items-center transition-colors ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <div className="flex justify-between w-full max-w-5xl items-center">
        <h1 className="text-5xl font-extrabold tracking-wide text-center text-blue-700 dark:text-blue-300">CIVIX</h1>
        <Button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 rounded-full"
          variant="outline"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-900" />}
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {sections.map((section) => (
          <Button
            key={section}
            onClick={() => setSelectedSection(section)}
            variant={selectedSection === section ? "default" : "outline"}
            className={`rounded-xl px-6 py-2 text-base ${selectedSection !== section && darkMode ? "text-black" : ""}`}
          >
            {section}
          </Button>
        ))}
      </div>

      {selectedSection === "Concejos Municipales" && (
        <>
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
            <div className="flex-1 space-y-4">
              <div>
                <label htmlFor="comuna-select" className="block text-sm font-medium mb-1">
                  Selecciona una comuna
                </label>
                <select
                  id="comuna-select"
                  value={selectedComuna}
                  onChange={(e) => setSelectedComuna(e.target.value)}
                  className="bg-white text-black border border-gray-300 rounded-xl px-3 py-2 text-sm w-full shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                >
                  {comunasMunicipales.map((com) => (
                    <option key={com.nombre} value={com.nombre}>
                      {com.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="anio-select" className="block text-sm font-medium mb-1">
                  Selecciona un período
                </label>
                <select
                  id="anio-select"
                  value={selectedAnio}
                  onChange={(e) => setSelectedAnio(e.target.value)}
                  className="bg-white text-black border border-gray-300 rounded-xl px-3 py-2 text-sm w-full shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                >
                  <option value="2021">2021–2024</option>
                  <option value="2025">2025–2028</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-5xl mt-6">
            {comuna && periodo && (
              <>
                <Card className="rounded-2xl shadow dark:bg-gray-800">
                  <CardContent className="p-6 text-center text-white">
                    <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                      <Vote className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Alcalde ({selectedAnio}–{+selectedAnio + 3})
                    </h3>
                    <p><strong>Nombre:</strong> {periodo.alcalde.nombre}</p>
                    <p><strong>Votos:</strong> {periodo.alcalde.votos}</p>
                    <p><strong>Partido:</strong> {periodo.alcalde.partido}</p>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow dark:bg-gray-800">
                  <CardContent className="p-6 text-white">
                    <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Concejales ({selectedAnio}–{+selectedAnio + 3})
                    </h3>
                    {periodo.concejales.length === 0 ? (
                      <p className="text-sm italic text-gray-400 text-center">Aún no se han definido los concejales para este período.</p>
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

      {selectedSection !== "Concejos Municipales" && (
        <div className="text-gray-500 italic">Sección aún en desarrollo.</div>
      )}
    </div>
  );
}