/**
 * Catálogo de Imóveis, Vitrine, Grid de Cards, Modal de Detalhes e Favoritos
 * @author Janayna Nascimento <janayna.nasc2022@gmail.com>
 * @author Augusto Campos <1977campos7@gmail.com>
 * @author F. Silva <fsilvasmbg@gmail.com>
 * @author Mara Rakel <mara.rakel2016@outlook.com>
 */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Anunciar from "./Anunciar.jsx";
import Auth from "./Auth.jsx";
import {
  Home,
  Heart,
  User,
  Search as SearchIcon,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Building2,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Menu,
  X,
  ChevronLeft,
  Calendar,
  DollarSign,
  CircleDot,
  LogOut,
  ArrowUp,
} from "lucide-react";

// ============================================================================
// Configuração da API
// ============================================================================
const API_URL = "/api";

// ============================================================================
// Componente: Header / Navbar
// ============================================================================
function Header({ onAnunciar, onAuth, user, onLogout, onShowFavorites, favoritesCount, view }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmed = window.confirm("Tem certeza que deseja sair da sua conta?");
    if (confirmed) {
      onLogout();
    }
  };

  const handleFavoritesClick = () => {
    setMenuOpen(false);
    if (onShowFavorites) onShowFavorites();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-xl p-2">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Imóvel<span className="text-blue-600">Fácil</span>
            </span>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={handleFavoritesClick}
              className={`flex items-center gap-2 px-4 py-2 transition-colors rounded-lg hover:bg-blue-50 ${
                view === "favorites"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  view === "favorites" ? "fill-red-500 text-red-500" : ""
                }`}
              />
              Favoritos
              {favoritesCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            {user ? (
              <>
                <div
                  className="relative group flex items-center gap-2 px-4 py-2 text-gray-700"
                  title={user.name}
                >
                  <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span>{user.name.split(" ")[0]}</span>
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">
                    <CircleDot className="w-3 h-3" />
                    Sessão ativa
                  </span>
                  {/* Tooltip com nome completo */}
                  <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={onAuth}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
              >
                <User className="w-5 h-5" />
                Entrar
              </button>
            )}
            <button
              onClick={onAnunciar}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Anunciar
            </button>
          </nav>

          {/* Botão Menu Mobile */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <button
              onClick={handleFavoritesClick}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${
                view === "favorites"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  view === "favorites" ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span>Favoritos</span>
              {favoritesCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            {user ? (
              <>
                <div
                  className="flex items-center gap-2 w-full px-4 py-2 text-gray-700"
                  title={user.name}
                >
                  <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span>{user.name.split(" ")[0]}</span>
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">
                    <CircleDot className="w-3 h-3" />
                    Sessão ativa
                  </span>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onAuth();
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
              >
                <User className="w-5 h-5" />
                Entrar
              </button>
            )}
            <button
              onClick={() => {
                setMenuOpen(false);
                onAnunciar();
              }}
              className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium"
            >
              Anunciar
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

// ============================================================================
// Componente: Hero Section
// ============================================================================
function Hero() {
  const stats = [
    { value: "5.000+", label: "Imóveis Disponíveis" },
    { value: "2.500+", label: "Imóveis Vendidos" },
    { value: "10.000+", label: "Clientes Satisfeitos" },
    { value: "15", label: "Anos de Experiência" },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encontre o imóvel dos seus sonhos
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Milhares de opções de casas, apartamentos e terrenos para você
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Componente: Filtro de Busca Dinâmico
// ============================================================================
function SearchFilters({ onSearchChange, purpose, setPurpose, sortBy, setSortBy, hideSort = false }) {
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
        {/* Tabs de Finalidade */}
        <div className="flex gap-2 mb-6">
          {purposes.map((p) => (
            <button
              key={p.id}
              onClick={() => setPurpose(p.id)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                purpose === p.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Formulário de Filtros */}
        <form
          onSubmit={handleSubmit}
          className={`grid grid-cols-1 md:grid-cols-2 ${
            hideSort ? "lg:grid-cols-5" : "lg:grid-cols-6"
          } gap-4`}
        >
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
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Qualquer preço</option>
              <option value="500000">R$ 500.000</option>
              <option value="1000000">R$ 1.000.000</option>
              <option value="1500000">R$ 1.500.000</option>
              <option value="2000000">R$ 2.000.000</option>
              <option value="3000000">R$ 3.000.000+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quartos
            </label>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {!hideSort && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ordenar por
              </label>
              <select
                name="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Mais recentes</option>
                <option value="price_asc">Menor preço</option>
                <option value="price_desc">Maior preço</option>
                <option value="area_desc">Maior área</option>
              </select>
            </div>
          )}

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <SearchIcon className="w-5 h-5" />
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// Componente: Card de Imóvel
// ============================================================================
function PropertyCard({ property, onToggleFavorite, onViewDetails }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      {/* Imagem */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {property.featured && (
            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Destaque
            </span>
          )}
          <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
            {property.property_type}
          </span>
        </div>
        <button
          onClick={() => onToggleFavorite(property)}
          className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              property.is_favorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          {property.location}
        </div>

        {/* Atributos */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            {property.bedrooms} quartos
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {property.bathrooms} banheiros
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="w-4 h-4" />
            {property.area_sqm} m²
          </span>
        </div>

        {/* Preço e Botão */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">
              {property.purpose === "alugar" ? "Aluguel" : "Venda"}
            </div>
            <div className="text-xl font-bold text-blue-600">
              {formatPrice(property.price)}
            </div>
          </div>
          <button
            onClick={() => onViewDetails && onViewDetails(property)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Componente: Modal de Detalhes do Imóvel
// ============================================================================
function PropertyDetailsModal({ property, onClose, onToggleFavorite }) {
  if (!property) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho com imagem */}
        <div className="relative h-64 sm:h-80">
          <img
            src={property.image_url}
            alt={property.title}
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => onToggleFavorite(property)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
            aria-label="Favoritar"
          >
            <Heart
              className={`w-5 h-5 ${
                property.is_favorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {property.featured && (
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Destaque
              </span>
            )}
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
              {property.property_type}
            </span>
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
              {property.purpose === "alugar" ? "Aluguel" : "Venda"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {property.title}
          </h2>
          <div className="flex items-center gap-1 text-gray-500 mb-6">
            <MapPin className="w-4 h-4" />
            {property.location}
          </div>

          {/* Preço */}
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-xs text-gray-500">
                {property.purpose === "alugar" ? "Aluguel" : "Preço de venda"}
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {formatPrice(property.price)}
              </div>
            </div>
          </div>

          {/* Atributos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3">
              <BedDouble className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-sm text-gray-500">Quartos</span>
              <span className="font-semibold text-gray-900">{property.bedrooms}</span>
            </div>
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3">
              <Bath className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-sm text-gray-500">Banheiros</span>
              <span className="font-semibold text-gray-900">{property.bathrooms}</span>
            </div>
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3">
              <Ruler className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-sm text-gray-500">Área</span>
              <span className="font-semibold text-gray-900">{property.area_sqm} m²</span>
            </div>
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3">
              <Calendar className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-sm text-gray-500">Publicado</span>
              <span className="font-semibold text-gray-900">Hoje</span>
            </div>
          </div>

          {/* Descrição */}
          {property.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Descrição
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>
          )}

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Entrar em contato
            </button>
            <button className="px-6 py-3 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors">
              Agendar visita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Componente: CTA Secundário
// ============================================================================
function CtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Quer anunciar seu imóvel?
        </h2>
        <p className="text-blue-100 mb-6">
          Anuncie gratuitamente e alcance milhares de compradores e inquilinos
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          Anunciar gratuitamente
        </button>
      </div>
    </section>
  );
}

// ============================================================================
// Componente: Footer
// ============================================================================
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coluna 1: Logo e descrição */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Imóvel<span className="text-blue-400">Fácil</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              O portal imobiliário mais completo do Brasil. Encontre o imóvel
              perfeito para você e sua família.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Institucional */}
          <div>
            <h3 className="text-white font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nossos corretores</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabalhe conosco</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Imprensa</a></li>
            </ul>
          </div>

          {/* Coluna 3: Navegação */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Comprar imóveis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Alugar imóveis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lançamentos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Anunciar imóvel</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (11) 4000-0000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contato@imovefacil.com.br
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Av. Paulista, 1000 - São Paulo/SP
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ImóvelFácil. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// Componente Principal: App
// ============================================================================
function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purpose, setPurpose] = useState("comprar");
  const [filters, setFilters] = useState({});
  const [view, setView] = useState("home");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [sortBy, setSortBy] = useState("recent");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("imovefacil_user") || "null");
    } catch {
      return null;
    }
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Função para buscar imóveis da API
  const fetchProperties = useCallback(async (searchFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};

      if (searchFilters.property_type && searchFilters.property_type !== "todos") {
        params.property_type = searchFilters.property_type;
      }
      if (searchFilters.purpose) {
        params.purpose = searchFilters.purpose;
      }
      if (searchFilters.max_price) {
        params.max_price = searchFilters.max_price;
      }
      if (searchFilters.location) {
        params.location = searchFilters.location;
      }
      if (searchFilters.bedrooms) {
        params.bedrooms = searchFilters.bedrooms;
      }
      if (searchFilters.query) {
        params.query = searchFilters.query;
      }

      const response = await axios.get(`${API_URL}/properties`, { params });
      setProperties(response.data);
    } catch (err) {
      console.error("Erro ao buscar imóveis:", err);
      setError("Não foi possível carregar os imóveis. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega os imóveis ao montar o componente
  useEffect(() => {
    fetchProperties({ purpose });
  }, [fetchProperties, purpose]);

  // Função para alternar favorito
  const handleToggleFavorite = async (property) => {
    const newFavoriteStatus = !property.is_favorite;
    try {
      await axios.post(`${API_URL}/favorites`, {
        property_id: property.id,
        is_favorite: newFavoriteStatus,
      });
      // Atualiza o estado local
      setProperties((prev) =>
        prev.map((p) =>
          p.id === property.id ? { ...p, is_favorite: newFavoriteStatus } : p
        )
      );
    } catch (err) {
      console.error("Erro ao alternar favorito:", err);
    }
  };

  // Função chamada quando o filtro é submetido
  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    fetchProperties(newFilters);
  };

  // Fecha o modal de detalhes
  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  // Alterna favorito mantendo o modal sincronizado
  const handleToggleFavoriteWithModal = async (property) => {
    await handleToggleFavorite(property);
    setSelectedProperty((prev) => {
      if (!prev || prev.id !== property.id) return prev;
      return { ...prev, is_favorite: !property.is_favorite };
    });
  };

  // Navega para a tela de favoritos
  const handleShowFavorites = () => {
    setView("favorites");
  };

  // Aplica a ordenação atual sobre a lista de imóveis
  const sortProperties = useCallback((list) => {
    const arr = [...list];
    switch (sortBy) {
      case "price_asc":
        return arr.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price_desc":
        return arr.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "area_desc":
        return arr.sort((a, b) => (b.area_sqm || 0) - (a.area_sqm || 0));
      case "recent":
      default:
        return arr.sort((a, b) => {
          const da = new Date(a.created_at || 0).getTime();
          const db = new Date(b.created_at || 0).getTime();
          return db - da;
        });
    }
  }, [sortBy]);

  // Lista derivada conforme a view atual
  const baseList = view === "favorites"
    ? properties.filter((p) => p.is_favorite)
    : properties;
  const displayedProperties = sortProperties(baseList);
  const favoritesCount = properties.filter((p) => p.is_favorite).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {view === "anunciar" ? (
        <Anunciar
          onBack={() => setView("home")}
          onCreated={() => fetchProperties({ purpose })}
        />
      ) : view === "auth" ? (
        <Auth
          onBack={() => setView("home")}
          onAuth={(userData) => {
            setUser(userData);
            localStorage.setItem("imovefacil_user", JSON.stringify(userData));
          }}
        />
      ) : (
        <>
          <Header
            onAnunciar={() => setView("anunciar")}
            onAuth={() => setView("auth")}
            user={user}
            onLogout={() => {
              setUser(null);
              localStorage.removeItem("imovefacil_user");
            }}
            onShowFavorites={handleShowFavorites}
            favoritesCount={favoritesCount}
            view={view}
          />
          {view === "home" && <Hero />}
          {view === "home" && (
            <SearchFilters
              onSearchChange={handleSearch}
              purpose={purpose}
              setPurpose={setPurpose}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          )}
          {view === "favorites" && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
              <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                    Meus Favoritos
                  </h1>
                  <p className="text-gray-500 mt-1">
                    {favoritesCount}{" "}
                    {favoritesCount === 1 ? "imóvel favoritado" : "imóveis favoritados"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="recent">Mais recentes</option>
                    <option value="price_asc">Menor preço</option>
                    <option value="price_desc">Maior preço</option>
                    <option value="area_desc">Maior área</option>
                  </select>
                  <button
                    onClick={() => setView("home")}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Listagem de Imóveis */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {loading
                  ? "Carregando..."
                  : view === "favorites"
                    ? `${displayedProperties.length} ${
                        displayedProperties.length === 1
                          ? "favorito"
                          : "favoritos"
                      }`
                    : `${displayedProperties.length} imóveis encontrados`}
              </h2>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
                    <div className="bg-gray-200 h-56 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2 w-3/4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2 w-1/2"></div>
                    <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onToggleFavorite={handleToggleFavorite}
                    onViewDetails={setSelectedProperty}
                  />
                ))}
              </div>
            )}

            {!loading && !error && displayedProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {view === "favorites"
                    ? "Você ainda não favoritou nenhum imóvel. Volte à home e clique no coração para adicionar."
                    : "Nenhum imóvel encontrado com os filtros selecionados."}
                </p>
              </div>
            )}
          </section>

          {view === "home" && <CtaBanner />}
          <Footer />

          {showScrollTop && (
            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              aria-label="Voltar ao topo"
              title="Voltar ao topo"
              className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}

          <PropertyDetailsModal
            property={selectedProperty}
            onClose={handleCloseModal}
            onToggleFavorite={handleToggleFavoriteWithModal}
          />
        </>
      )}
    </div>
  );
}

export default App;