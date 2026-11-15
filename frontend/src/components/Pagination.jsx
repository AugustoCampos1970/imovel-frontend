import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Componente de Paginação na Vitrine
 * @author F. Silva <fsilvasmbg@gmail.com>
 */
export default function Pagination({ offset, limit, total, onPageChange }) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit) || 1;

  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange((currentPage - 2) * limit);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage * limit);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      <span className="text-sm text-gray-600">
        Página <strong className="text-gray-900">{currentPage}</strong> de <strong className="text-gray-900">{totalPages}</strong>
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Próxima
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
