"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";

const sections = [
  "Senadores",
  "Diputados",
  "Gobierno Regional",
  "Concejos Municipales",
  "Comparar por Comuna",
];

const comunasMunicipales = [
  {
    nombre: "Puerto Varas",
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
    ],
    remuneraciones: [
      { nombre: "Tomás Gárate", monto: 279985493 },
      { nombre: "Marcelo Salazar", monto: 39325196 },
      { nombre: "Nataly Schadow", monto: 39325196 },
      { nombre: "Rodrigo Schnettler", monto: 39325196 },
      { nombre: "Juan Godoy", monto: 39325196 },
      { nombre: "Rocío Alvarado", monto: 39325196 },
      { nombre: "Antonio Horn", monto: 39070986 },
    ],
    asignaciones: [
      { nombre: "Antonio Horn", utilizadas: 17416827, noUtilizadas: 17533973 },
      { nombre: "Nataly Schadow", utilizadas: 20627200, noUtilizadas: 14323600 },
      { nombre: "Marcelo Salazar", utilizadas: 24323000, noUtilizadas: 10627800 },
      { nombre: "Rocío Alvarado", utilizadas: 26706552, noUtilizadas: 8244248 },
      { nombre: "Juan Godoy", utilizadas: 27612400, noUtilizadas: 7338400 },
      { nombre: "Rodrigo Schnettler", utilizadas: 31139600, noUtilizadas: 3811200 },
    ],
    puntosVarios: [
      { nombre: "Rodrigo Schnettler", puntos: 208 },
      { nombre: "Marcelo Salazar", puntos: 155 },
      { nombre: "Juan Godoy", puntos: 111 },
      { nombre: "Antonio Horn", puntos: 85 },
      { nombre: "Rocío Alvarado", puntos: 56 },
      { nombre: "Nataly Schadow", puntos: 47 },
    ],
  },
];

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("Concejos Municipales");
  const [selectedComuna, setSelectedComuna] = useState("Puerto Varas");
  const [municipalTab, setMunicipalTab] = useState("Remuneraciones");

  const comuna = comunasMunicipales.find((c) => c.nombre === selectedComuna);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Civix</h1>

      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <Button
            key={section}
            onClick={() => setSelectedSection(section)}
            variant={selectedSection === section ? "default" : "outline"}
          >
            {section}
          </Button>
        ))}
      </div>

      {selectedSection === "Concejos Municipales" && (
        <>
          <div>
            <label htmlFor="comuna-select" className="block text-sm font-medium text-gray-700 mb-1">
              Selecciona una comuna
            </label>
            <select
              id="comuna-select"
              value={selectedComuna}
              onChange={(e) => setSelectedComuna(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              {comunasMunicipales.map((com) => (
                <option key={com.nombre} value={com.nombre}>
                  {com.nombre}
                </option>
              ))}
            </select>
          </div>

          {comuna && (
            <div key={comuna.nombre} className="space-y-6">
              <h2 className="text-xl font-semibold">{comuna.nombre}</h2>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">Alcalde (2021–2024)</h3>
                  <p><strong>Nombre:</strong> {comuna.alcalde.nombre}</p>
                  <p><strong>Votos:</strong> {comuna.alcalde.votos.toLocaleString()}</p>
                  <p><strong>Partido:</strong> {comuna.alcalde.partido}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">Concejales (2021–2024)</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="py-2">Nombre</th>
                        <th className="py-2">Votos</th>
                        <th className="py-2">Partido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comuna.concejales.map((c) => (
                        <tr key={c.nombre} className="border-b hover:bg-gray-50">
                          <td className="py-2">{c.nombre}</td>
                          <td className="py-2">{c.votos.toLocaleString()}</td>
                          <td className="py-2">{c.partido}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-2">
                {["Remuneraciones", "Asignaciones", "Puntos Varios"].map((tab) => (
                  <Button
                    key={tab}
                    onClick={() => setMunicipalTab(tab)}
                    variant={municipalTab === tab ? "default" : "outline"}
                  >
                    {tab}
                  </Button>
                ))}
              </div>

              <Card>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {municipalTab === "Remuneraciones" ? (
                      <BarChart layout="vertical" data={comuna.remuneraciones} margin={{ left: 100 }}>
                        <XAxis type="number" />
                        <YAxis dataKey="nombre" type="category" />
                        <Tooltip />
                        <Bar dataKey="monto" fill="#06b6d4">
                          <LabelList dataKey="monto" position="right" />
                        </Bar>
                      </BarChart>
                    ) : municipalTab === "Asignaciones" ? (
                      <BarChart layout="vertical" data={comuna.asignaciones} margin={{ left: 100 }}>
                        <XAxis type="number" />
                        <YAxis dataKey="nombre" type="category" />
                        <Tooltip />
                        <Bar dataKey="utilizadas" stackId="a" fill="#86efac">
                          <LabelList dataKey="utilizadas" position="right" />
                        </Bar>
                        <Bar dataKey="noUtilizadas" stackId="a" fill="#f0f0f0">
                          <LabelList dataKey="noUtilizadas" position="right" />
                        </Bar>
                      </BarChart>
                    ) : (
                      <BarChart layout="vertical" data={comuna.puntosVarios} margin={{ left: 100 }}>
                        <XAxis type="number" />
                        <YAxis dataKey="nombre" type="category" />
                        <Tooltip />
                        <Bar dataKey="puntos" fill="#a78bfa">
                          <LabelList dataKey="puntos" position="right" />
                        </Bar>
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
