"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { comuna: "Puerto Varas", planta: 45, contrata: 47, honorarios: 32, codigo: 19 },
  { comuna: "Puerto Montt", planta: 34, contrata: 38, honorarios: 26, codigo: 15 },
  { comuna: "Castro", planta: 20, contrata: 29, honorarios: 22, codigo: 13 },
];

const categories = ["planta", "contrata", "honorarios", "codigo"];
const sections = [
  "Senadores",
  "Diputados",
  "Gobernadores y CORE",
  "Alcaldes",
  "Concejales",
  "Comparar por Comuna",
  "Asistencia Ordinaria",
  "Asistencia Extraordinaria",
  "Asistencia Total",
  "Remuneraciones",
  "Asignaciones",
  "Puntos Varios"
];

const alcaldePuertoVaras = {
  nombre: "Tomás Gárate Silva",
  votos: 5677,
  partido: "Independiente",
};

const concejalesPuertoVaras = [
  { nombre: "Rocío Alvarado Díaz", votos: 3980, partido: "Independiente" },
  { nombre: "Juan Patricio Godoy", votos: 2516, partido: "Independiente" },
  { nombre: "Marcelo Salazar Vallejos", votos: 1009, partido: "Unión Demócrata Independiente" },
  { nombre: "Antonio Horn Cruz", votos: 953, partido: "Renovación Nacional" },
  { nombre: "Rodrigo Schnettler Weisser", votos: 773, partido: "Democracia Cristiana" },
  { nombre: "Nataly Schadow Muñoz", votos: 758, partido: "Partido Socialista de Chile" },
];

const asistenciaOrdinaria = [
  { nombre: "Marcelo Salazar", asistencia: 125, inasistencia: 0 },
  { nombre: "Rodrigo Schnettler", asistencia: 125, inasistencia: 0 },
  { nombre: "Rocío Alvarado", asistencia: 119, inasistencia: 6 },
  { nombre: "Nataly Schadow", asistencia: 115, inasistencia: 10 },
  { nombre: "Tomás Gárate", asistencia: 114, inasistencia: 11 },
  { nombre: "Antonio Horn", asistencia: 106, inasistencia: 19 },
  { nombre: "Juan Godoy", asistencia: 96, inasistencia: 29 },
];

const asistenciaExtraordinaria = [
  { nombre: "Rodrigo Schnettler", asistencia: 30, inasistencia: 0 },
  { nombre: "Rocío Alvarado", asistencia: 29, inasistencia: 1 },
  { nombre: "Nataly Schadow", asistencia: 28, inasistencia: 2 },
  { nombre: "Marcelo Salazar", asistencia: 28, inasistencia: 2 },
  { nombre: "Tomás Gárate", asistencia: 27, inasistencia: 3 },
  { nombre: "Antonio Horn", asistencia: 24, inasistencia: 6 },
  { nombre: "Juan Godoy", asistencia: 20, inasistencia: 10 },
];

const asistenciaTotal = [
  { nombre: "Rodrigo Schnettler", asistencia: 155, inasistencia: 0 },
  { nombre: "Marcelo Salazar", asistencia: 153, inasistencia: 2 },
  { nombre: "Rocío Alvarado", asistencia: 148, inasistencia: 7 },
  { nombre: "Nataly Schadow", asistencia: 143, inasistencia: 12 },
  { nombre: "Tomás Gárate", asistencia: 141, inasistencia: 14 },
  { nombre: "Antonio Horn", asistencia: 130, inasistencia: 25 },
  { nombre: "Juan Godoy", asistencia: 116, inasistencia: 39 },
];

const remuneraciones = [
  { nombre: "Tomás Gárate", monto: 279985493 },
  { nombre: "Marcelo Salazar", monto: 39325196 },
  { nombre: "Nataly Schadow", monto: 39325196 },
  { nombre: "Rodrigo Schnettler", monto: 39325196 },
  { nombre: "Juan Godoy", monto: 39325196 },
  { nombre: "Rocío Alvarado", monto: 39325196 },
  { nombre: "Antonio Horn", monto: 39070986 },
];

const asignaciones = [
  { nombre: "Antonio Horn", utilizadas: 17416827, noUtilizadas: 17533973 },
  { nombre: "Nataly Schadow", utilizadas: 20627200, noUtilizadas: 14323600 },
  { nombre: "Marcelo Salazar", utilizadas: 24323000, noUtilizadas: 10627800 },
  { nombre: "Rocío Alvarado", utilizadas: 26706552, noUtilizadas: 8244248 },
  { nombre: "Juan Godoy", utilizadas: 27612400, noUtilizadas: 7338400 },
  { nombre: "Rodrigo Schnettler", utilizadas: 31139600, noUtilizadas: 3811200 },
];

const puntosVarios = [
  { nombre: "Rodrigo Schnettler", puntos: 208 },
  { nombre: "Marcelo Salazar", puntos: 155 },
  { nombre: "Juan Godoy", puntos: 111 },
  { nombre: "Antonio Horn", puntos: 85 },
  { nombre: "Rocío Alvarado", puntos: 56 },
  { nombre: "Nataly Schadow", puntos: 47 },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("planta");
  const [selectedSection, setSelectedSection] = useState("Comparar por Comuna");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tus Políticos</h1>

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

      {selectedSection === "Comparar por Comuna" && (
        <>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? "default" : "outline"}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
          <Card>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="comuna" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey={selectedCategory} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      {selectedSection === "Alcaldes" && (
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Alcalde de Puerto Varas (2021–2024)</h2>
            <p><strong>Nombre:</strong> {alcaldePuertoVaras.nombre}</p>
            <p><strong>Votos:</strong> {alcaldePuertoVaras.votos.toLocaleString()}</p>
            <p><strong>Partido:</strong> {alcaldePuertoVaras.partido}</p>
          </CardContent>
        </Card>
      )}

      {selectedSection === "Concejales" && (
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Concejales de Puerto Varas (2021–2024)</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Votos</th>
                  <th className="py-2">Partido</th>
                </tr>
              </thead>
              <tbody>
                {concejalesPuertoVaras.map((c) => (
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
      )}

      {["Asistencia Ordinaria", "Asistencia Extraordinaria", "Asistencia Total"].includes(selectedSection) && (
        <Card>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={
                  selectedSection === "Asistencia Ordinaria"
                    ? asistenciaOrdinaria
                    : selectedSection === "Asistencia Extraordinaria"
                    ? asistenciaExtraordinaria
                    : asistenciaTotal
                }
                margin={{ top: 20, right: 20, bottom: 20, left: 100 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="nombre" type="category" />
                <Tooltip />
                <Bar dataKey="asistencia" stackId="a" fill="#86efac" name="Asistencia" />
                <Bar dataKey="inasistencia" stackId="a" fill="#fca5a5" name="Inasistencia" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {selectedSection === "Remuneraciones" && (
        <Card>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={remuneraciones} margin={{ left: 100 }}>
                <XAxis type="number" />
                <YAxis dataKey="nombre" type="category" />
                <Tooltip />
                <Bar dataKey="monto" fill="#06b6d4" name="Remuneración Bruta" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {selectedSection === "Asignaciones" && (
        <Card>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={asignaciones} margin={{ left: 100 }}>
                <XAxis type="number" />
                <YAxis dataKey="nombre" type="category" />
                <Tooltip />
                <Bar dataKey="utilizadas" stackId="a" fill="#86efac" name="Utilizadas" />
                <Bar dataKey="noUtilizadas" stackId="a" fill="#f0f0f0" name="No utilizadas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {selectedSection === "Puntos Varios" && (
        <Card>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={puntosVarios} margin={{ left: 100 }}>
                <XAxis type="number" />
                <YAxis dataKey="nombre" type="category" />
                <Tooltip />
                <Bar dataKey="puntos" fill="#a78bfa" name="Puntos varios" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}