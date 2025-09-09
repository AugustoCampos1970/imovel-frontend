import React, { useState } from "react";
import axios from "axios";
import {
  Building2,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  Send,
} from "lucide-react";

const API_URL = "/api";

const PROPERTY_TYPES = [
  { value: "Casa", label: "Casa" },
  { value: "Apartamento", label: "Apartamento" },
  { value: "Cobertura", label: "Cobertura" },
  { value: "Terreno", label: "Terreno" },
];

const PURPOSES = [
  { value: "comprar", label: "Comprar" },
  { value: "alugar", label: "Alugar" },
  { value: "lancamento", label: "Lançamento" },
];

const STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
];

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

function Field({ label, required = false, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500";

function Anunciar({ onBack, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    property_type: "Casa",
    purpose: "comprar",
    price: "",
    location: "",
    neighborhood: "",
    city: "",
    state: "SP",
    bedrooms: "",
    bathrooms: "",
    area_sqm: "",
    image_url: "",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        bedrooms: parseInt(form.bedrooms, 10) || 0,
        bathrooms: parseInt(form.bathrooms, 10) || 0,
        area_sqm: parseInt(form.area_sqm, 10) || 0,
        image_url: form.image_url || DEFAULT_IMAGE,
      };

      await axios.post(`${API_URL}/properties`, payload);
      setSuccess("Imóvel cadastrado com sucesso!");
      onCreated();
      setTimeout(onBack, 1500);
    } catch (err) {
      console.error("Erro ao cadastrar imóvel:", err);
      setError(
        "Não foi possível cadastrar o imóvel. Verifique se o backend está rodando e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner de topo */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para a home
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/15 rounded-xl p-3">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Anuncie seu imóvel</h1>
          </div>
          <p className="text-blue-100">
            Preencha os dados abaixo e publique seu anúncio gratuitamente.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Feedback */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          {/* Dados principais */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Informações do anúncio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="md:col-span-2">
              <Field label="Título do anúncio" required>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Casa Moderna com Piscina"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="md:col-span-2">
              <Field label="Descrição" required>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Descreva os detalhes do imóvel..."
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Tipo de imóvel" required>
              <select
                name="property_type"
                value={form.property_type}
                onChange={handleChange}
                className={inputClass}
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Finalidade" required>
              <select
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                className={inputClass}
              >
                {PURPOSES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Preço (R$)" required>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="Ex: 680000"
                className={inputClass}
              />
            </Field>

            <Field label="Área (m²)">
              <input
                type="number"
                name="area_sqm"
                value={form.area_sqm}
                onChange={handleChange}
                min="0"
                placeholder="Ex: 120"
                className={inputClass}
              />
            </Field>

            <Field label="Quartos">
              <input
                type="number"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                min="0"
                placeholder="Ex: 3"
                className={inputClass}
              />
            </Field>

            <Field label="Banheiros">
              <input
                type="number"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                min="0"
                placeholder="Ex: 2"
                className={inputClass}
              />
            </Field>
          </div>

          {/* Localização */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Localização
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="md:col-span-2">
              <Field label="Endereço / Localização" required>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Av. Paulista, 1000 - Jardim Paulista"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Bairro">
              <input
                type="text"
                name="neighborhood"
                value={form.neighborhood}
                onChange={handleChange}
                placeholder="Ex: Moema"
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Cidade" required>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder="Ex: São Paulo"
                  className={inputClass}
                />
              </Field>

              <Field label="UF" required>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {/* Imagem e destaque */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Imagem e destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Field label="URL da imagem">
              <div className="relative">
                <ImageIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  name="image_url"
                  value={form.image_url}
                  onChange={handleChange}
                  placeholder="https://... (opcional)"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </Field>

            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Marcar como imóvel em destaque
              </label>
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publicando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Publicar anúncio
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Anunciar;
