import React from 'react';
import Navbar from '../components/Navbar';

export default function Login() {
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1 className="text-center">Login</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Digite seu email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="password" placeholder="Digite sua senha" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>
            </div>
        </div>
    );
}
