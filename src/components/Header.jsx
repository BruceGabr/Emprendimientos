// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Importamos el hook de autenticación
import './Header.css';

function Header() {
  const { isAuthenticated, logout } = useAuth(); // Usamos el estado y la función de logout del contexto
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia el estado del menú al hacer clic en el ícono
  };

  return (
    <header className="header">
      <div className="container header__container">
        <a className="header__logo">ComerciaYa</a>

        {/* Ícono de menú hamburguesa (solo en móvil) */}
        <button
          className={`header__hamburger ${
            isMenuOpen ? "header__hamburger--open" : ""
          }`}
          onClick={toggleMenu}
        >
          <span className="header__hamburger-line"></span>
          <span className="header__hamburger-line"></span>
          <span className="header__hamburger-line"></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
          <ul className="header__menu">
            <li className="header__item">
              <Link
                to="/"
                className="header__link"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                {/* NUEVA PESTAÑA: Mi Emprendimiento */}
                <li className="header__item">
                  <Link
                    to="/miemprendimiento" // <--- La ruta a la página de tu emprendimiento
                    className="header__link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mi Emprendimiento
                  </Link>
                </li>
                {/* FIN DE LA NUEVA PESTAÑA */}

                <li className="header__item">
                  <Link
                    to="/dashboard"
                    className="header__link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mis productos
                  </Link>
                </li>
                <li className="header__item">
                  <Link
                    to="/nuevo-producto"
                    className="header__link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Añadir producto
                  </Link>
                </li>
                <li className="header__item">
                  <Link
                    to="/reseñas"
                    className="header__link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Reseñas recibidas
                  </Link>
                </li>
                <li className="header__item">
                  <Link
                    to="/perfil"
                    className="header__link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mi perfil
                  </Link>
                </li>
                <li className="header__item">
                  <button
                    className="header__link header__logout-btn"
                    onClick={() => {
                      logout(); // Llama directamente a la función logout del contexto
                      setIsMenuOpen(false); // Cierra el menú
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="header__item">
                  <Link
                    to="/explorar"
                    className="header__link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Explorar
                  </Link>
                </li>
                <li className="header__item">
                  <Link
                    to="/registro"
                    className="header__link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </li>
                <li className="header__item">
                  <Link
                    to="/login"
                    className="header__link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;