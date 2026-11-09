import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CheckCircle2,
  Edit3,
  Loader2,
  MapPin,
  Ruler,
  Trash2,
  X,
} from "lucide-react";
import api, { getApiErrorMessage } from "./api.js";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500";

function ManageProperties({ onBack }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/properties/mine");
      setProperties(response.data);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Não foi possível carregar seus anúncios.")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(price);

  const openEditor = (property) => {
    setEditing(property);
    setError(null);
    setSuccess(null);
    setForm({
      title: property.title || "",
      description: property.description || "",
      property_type: property.property_type || "Casa",
      purpose: property.purpose || "comprar",
      price: property.price ?? "",
      location: property.location || "",
      neighborhood: property.neighborhood || "",
      city: property.city || "",
      state: property.state || "SP",
      bedrooms: property.bedrooms ?? 0,
      bathrooms: property.bathrooms ?? 0,
      area_sqm: property.area_sqm ?? 0,
      image_url: property.image_url || "",
      featured: Boolean(property.featured),
    });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        area_sqm: Number(form.area_sqm) || 0,
      };
      const response = await api.put(`/properties/${editing.id}`, payload);
      setProperties((current) =>
        current.map((item) =>
          item.id === editing.id ? response.data : item
        )
      );
      setEditing(null);
      setSuccess("Imóvel atualizado com sucesso.");
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Não foi possível atualizar o imóvel.")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setError(null);
    try {
      await api.delete(`/properties/${deleteTarget.id}`);
      setProperties((current) =>
        current.filter((item) => item.id !== deleteTarget.id)
      );
      setDeleteTarget(null);
      setSuccess("Imóvel excluído com sucesso.");
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Não foi possível excluir o imóvel.")
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para a home
          </button>
          <h1 className="text-3xl font-bold">Meus anúncios</h1>
          <p className="text-blue-100 mt-2">
            Edite ou exclua os imóveis publicados pela sua conta.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
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

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Você ainda não possui anúncios ativos
            </h2>
            <p className="text-gray-500 mt-2">
              Publique um imóvel para poder gerenciá-lo nesta tela.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <article
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row"
              >
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="w-full sm:w-44 h-48 object-cover"
                />
                <div className="p-5 flex-1">
                  <h2 className="font-semibold text-gray-900 line-clamp-2">
                    {property.title}
                  </h2>
                  <p className="text-blue-600 font-bold mt-2">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mt-2">
                    <MapPin className="w-4 h-4" /> {property.location}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-3">
                    <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" />{property.bedrooms}</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{property.bathrooms}</span>
                    <span className="flex items-center gap-1"><Ruler className="w-4 h-4" />{property.area_sqm} m²</span>
                  </div>
                  <div className="flex gap-2 mt-5">
                    <button
                      type="button"
                      onClick={() => openEditor(property)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <Edit3 className="w-4 h-4" /> Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(property)}
                      className="flex items-center justify-center gap-2 border border-red-200 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" /> Excluir
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {editing && (
        <div className="fixed inset-0 z-[100] bg-black/60 p-4 flex items-center justify-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-property-title"
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 id="edit-property-title" className="text-xl font-bold">Editar imóvel</h2>
              <button type="button" onClick={() => setEditing(null)} aria-label="Fechar edição">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="md:col-span-2 text-sm font-medium">Título
                <input name="title" value={form.title} onChange={handleChange} required className={`${inputClass} mt-1`} />
              </label>
              <label className="md:col-span-2 text-sm font-medium">Descrição
                <textarea name="description" value={form.description} onChange={handleChange} rows="4" className={`${inputClass} mt-1`} />
              </label>
              <label className="text-sm font-medium">Tipo
                <select name="property_type" value={form.property_type} onChange={handleChange} className={`${inputClass} mt-1`}>
                  <option>Casa</option><option>Apartamento</option><option>Cobertura</option><option>Terreno</option>
                </select>
              </label>
              <label className="text-sm font-medium">Finalidade
                <select name="purpose" value={form.purpose} onChange={handleChange} className={`${inputClass} mt-1`}>
                  <option value="comprar">Comprar</option><option value="alugar">Alugar</option><option value="lancamento">Lançamento</option>
                </select>
              </label>
              <label className="text-sm font-medium">Preço
                <input type="number" min="0.01" step="0.01" name="price" value={form.price} onChange={handleChange} required className={`${inputClass} mt-1`} />
              </label>
              <label className="text-sm font-medium">Área (m²)
                <input type="number" min="0" name="area_sqm" value={form.area_sqm} onChange={handleChange} className={`${inputClass} mt-1`} />
              </label>
              <label className="md:col-span-2 text-sm font-medium">Localização
                <input name="location" value={form.location} onChange={handleChange} required className={`${inputClass} mt-1`} />
              </label>
              <label className="text-sm font-medium">Bairro
                <input name="neighborhood" value={form.neighborhood} onChange={handleChange} className={`${inputClass} mt-1`} />
              </label>
              <label className="text-sm font-medium">Cidade
                <input name="city" value={form.city} onChange={handleChange} required className={`${inputClass} mt-1`} />
              </label>
              <label className="text-sm font-medium">UF
                <input name="state" value={form.state} onChange={handleChange} minLength="2" maxLength="2" required className={`${inputClass} mt-1 uppercase`} />
              </label>
              <label className="text-sm font-medium">Quartos
                <input type="number" min="0" name="bedrooms" value={form.bedrooms} onChange={handleChange} className={`${inputClass} mt-1`} />
              </label>
              <label className="text-sm font-medium">Banheiros
                <input type="number" min="0" name="bathrooms" value={form.bathrooms} onChange={handleChange} className={`${inputClass} mt-1`} />
              </label>
              <label className="md:col-span-2 text-sm font-medium">URL da imagem
                <input type="url" name="image_url" value={form.image_url} onChange={handleChange} className={`${inputClass} mt-1`} />
              </label>
              <label className="md:col-span-2 flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Imóvel em destaque
              </label>
              <div className="md:col-span-2 flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setEditing(null)} className="px-5 py-2.5 border rounded-lg">Cancelar</button>
                <button type="submit" disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />} Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[110] bg-black/60 p-4 flex items-center justify-center">
          <div role="alertdialog" aria-modal="true" className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Excluir este imóvel?</h2>
            <p className="text-gray-600 mt-2">
              “{deleteTarget.title}” será removido da vitrine. Esta ação não poderá ser desfeita pela interface.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" disabled={deleting} onClick={() => setDeleteTarget(null)} className="px-4 py-2 border rounded-lg">Cancelar</button>
              <button type="button" disabled={deleting} onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-2">
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />} Confirmar exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProperties;
