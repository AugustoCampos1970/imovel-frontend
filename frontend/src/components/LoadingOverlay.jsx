import React, { useEffect, useState } from "react";
import { Loader2, Server } from "lucide-react";

/**
 * Componente de LoadingOverlay e Feedback de Cold Start
 * @author Janayna Nascimento <janayna.nasc2022@gmail.com>
 */
export default function LoadingOverlay({ loading, message }) {
  const [showSlowWarning, setShowSlowWarning] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      setShowSlowWarning(false);
      timer = setTimeout(() => {
        setShowSlowWarning(true);
      }, 4000);
    } else {
      setShowSlowWarning(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {message || "Carregando..."}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Por favor, aguarde um momento.
        </p>

        {showSlowWarning && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-xs flex items-start gap-2 text-left animate-fadeIn">
            <Server className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Servidor em Cold Start</span>
              O servidor gratuito no Render está iniciando (pode levar até 50 segundos). Obrigado pela paciência!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
