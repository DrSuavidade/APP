import React from 'react';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <img className="warelogo navbar-brand" src="/images/Logos/logo.png" alt="Ware Logo" />
                <a href="/login" className="btn btn-primary">Iniciar Sessão</a>
            </div>
        </nav>
    );
}
