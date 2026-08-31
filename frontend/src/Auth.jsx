/**
 * Módulo de Autenticação e Gestão de Usuários (Login / Cadastro)
 * @author Mara Rakel <mara.rakel2016@outlook.com>
 */
import React, { useState } from "react";
import axios from "axios";
import {
  Building2,
  ArrowLeft,
  Loader2,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

const API_URL = "/api";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500";

function AuthField({ icon: Icon, type = "text", name, value, onChange, placeholder, required = true }) {
  return (
    <div className="relative">
      <Icon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

function Auth({ onBack, onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (mode === "register" && form.password !== form.confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "register") {
        const response = await axios.post(`${API_URL}/auth/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setSuccess("Conta criada com sucesso!");
        onAuth(response.data);
        setTimeout(onBack, 1200);
      } else {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email: form.email,
          password: form.password,
        });
        setSuccess("Login realizado com sucesso!");
        onAuth(response.data);
        setTimeout(onBack, 1200);
      }
    } catch (err) {
      console.error("Erro na autenticação:", err);
      setError(
        err.response?.data?.detail ||
          "Não foi possível concluir a operação. Verifique se o backend está rodando."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Banner de topo */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-10">
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
            <h1 className="text-3xl font-bold">
              {mode === "login" ? "Entrar na sua conta" : "Criar conta"}
            </h1>
          </div>
          <p className="text-blue-100">
            {mode === "login"
              ? "Acesse o ImóvelFácil para gerenciar seus favoritos."
              : "Cadastre-se gratuitamente e comece a usar o portal."}
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setMode("login");
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 px-6 py-2.5 rounded-lg font-medium transition-colors ${
                mode === "login"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setMode("register");
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 px-6 py-2.5 rounded-lg font-medium transition-colors ${
                mode === "register"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cadastrar
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
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

            <div className="space-y-4">
              {mode === "register" && (
                <AuthField
                  icon={User}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nome completo"
                />
              )}

              <AuthField
                icon={Mail}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail"
              />

              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Senha"
                  required
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {mode === "register" && (
                <AuthField
                  icon={Lock}
                  type="password"
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Confirmar senha"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Aguarde...
                </>
              ) : mode === "login" ? (
                "Entrar"
              ) : (
                "Criar conta"
              )}
            </button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              {mode === "login" ? (
                <>
                  Ainda não tem conta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Cadastre-se
                  </button>
                </>
              ) : (
                <>
                  Já tem conta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Entrar
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
