import React from 'react'
import { NavLink } from 'react-router-dom'

export const PageNotFound = () => {
    return (
        <>
            <nav className="absolute top-8 left-8 z-20">
                <NavLink
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Return to Command Center
                </NavLink>
            </nav>
            <div className='grid place-content-center h-screen items-center'>404 Page Not Found</div>
        </>
    )
}
