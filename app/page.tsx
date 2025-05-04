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
const sections = ["Senadores", "Diputados", "Gobernadores y CORE", "Alcaldes", "Concejales", "Comparar por Comuna"];

const alcaldePuertoVaras = {
  nombre: "Tomás Gárate Silva",
  votos: 5677,
  partido: "Independiente",
};

const concejalesPuertoVaras = [
  {
    nombre: "Rocío Alvarado Díaz",
    votos: 3980,
    partido: "Independiente",
  },
  {
    nombre: "Juan Patricio Godoy",
    votos: 2516,
    partido: "Independiente",
  },
  {
    nombre: "Marcelo Salazar Vallejos",
    votos: 1009,
    partido: "Unión Demócrata Independiente",
  },
  {
    nombre: "Antonio Horn Cruz",
    votos: 953,
    partido: "Renovación Nacional",
  },
  {
    nombre: "Rodrigo Schnettler Weisser",
    votos: 773,
    partido: "Democracia Cristiana",
  },
  {
    nombre: "Nataly Schadow Muñoz",
    votos: 758,
    partido: "Partido Socialista de Chile",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("planta");
  const [selectedSection, setSelectedSection] = useState("Comparar por Comuna");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tus Políticos</h1>

      {/* Navegación principal */}
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

      {/* Sección: Comparar por Comuna */}
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

      {/* Sección: Alcaldes */}
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

      {/* Sección: Concejales */}
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
    </div>
  );
}