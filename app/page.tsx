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

      {/* Contenido de sección: solo mostramos si está seleccionada la sección de comparación */}
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
    </div>
  );
}

