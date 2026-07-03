import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header />
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
