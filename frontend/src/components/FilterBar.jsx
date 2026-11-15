import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

/**
 * Componente dedicado de Filtros e Ordenação Avançada (UI-08)
 * @author Mara Rakel <mara.rakel2016@outlook.com>
 */
export default function FilterBar({ onSearchChange, purpose, setPurpose, sortBy, setSortBy }) {
  const [filters, setFilters] = useState({
    query: "",
    property_type: "todos",
    location: "",
    max_price: "",
    bedrooms: "",
  });

  const purposes = [
    { id: "comprar", label: "Comprar" },
    { id: "alugar", label: "Alugar" },
    { id: "lancamento", label: "Lançamentos" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange({ ...filters, purpose });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Tabs de Finalidade */}
          <div className="flex gap-2">
            {purposes.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPurpose(p.id)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  purpose === p.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Ordenação */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm text-gray-500 whitespace-nowrap">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full md:w-auto"
            >
              <option value="recent">Mais recentes</option>
              <option value="price_asc">Menor preço</option>
              <option value="price_desc">Maior preço</option>
              <option value="area_desc">Maior área</option>
            </select>
          </div>
        </div>

        {/* Formulário de Filtros Avançados */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Palavra-chave
            </label>
            <div className="relative">
              <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="query"
                value={filters.query}
                onChange={handleChange}
                placeholder="Ex: piscina, varanda, mobiliado..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Imóvel
            </label>
            <select
              name="property_type"
              value={filters.property_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="todos">Todos</option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Cobertura">Cobertura</option>
              <option value="Terreno">Terreno</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Localização
            </label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Cidade ou bairro"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço Máximo
            </label>
            <select
              name="max_price"
              value={filters.max_price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="">Qualquer preço</option>
              <option value="500000">R$ 500.000</option>
              <option value="1000000">R$ 1.000.000</option>
              <option value="1500000">R$ 1.500.000</option>
              <option value="2000000">R$ 2.000.000</option>
              <option value="3000000">R$ 3.000.000+</option>
            </select>
          </div>

          <div className="lg:col-span-5 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                const resetState = { query: "", property_type: "todos", location: "", max_price: "", bedrooms: "" };
                setFilters(resetState);
                onSearchChange({ ...resetState, purpose });
              }}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              Limpar Filtros
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <SearchIcon className="w-4 h-4" />
              Aplicar Filtros
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
