/**
 * Modal de Detalhes do Imóvel
 * @author Augusto Campos <1977campos7@gmail.com>
 */
import React from "react";
import { X, Heart, Calendar, DollarSign } from "lucide-react";

function PropertyDetailsModal({ property, isOpen, onClose, onToggleFavorite, isFavorite }) {
  if (!isOpen || !property) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors z-10"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <img
              src={property.image_url}
              alt={property.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {property.property_type}
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {property.purpose === "alugar" ? "Aluguel" : property.purpose === "comprar" ? "Venda" : "Lançamento"}
                </span>
              </div>
              <button
                onClick={() => onToggleFavorite(property)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
                <span className="text-sm font-medium">
                  {isFavorite ? "Favorito" : "Favoritar"}
                </span>
              </button>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {property.title}
            </h2>
            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <span className="font-semibold text-blue-600">{formatPrice(property.price)}</span>
              <span>•</span>
              <span>{property.location}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{property.bedrooms}</div>
                <div className="text-sm text-gray-500">Quartos</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{property.bathrooms}</div>
                <div className="text-sm text-gray-500">Banheiros</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{property.area_sqm}</div>
                <div className="text-sm text-gray-500">m²</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Agendar Visita
              </button>
              <button className="w-full bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Contatar Corretor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsModal;
