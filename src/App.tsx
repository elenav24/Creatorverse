// import { useState } from 'react'
import supabase from './utils/supabase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import Navbar from './components/Navbar';
import { useState, useEffect, Suspense, lazy } from 'react';
import type { Creator } from './utils/types';

const ViewCreator = lazy(() => import('./pages/ViewCreator'));
const EditCreator = lazy(() => import('./pages/EditCreator'));

function App() {
  const [creators, setCreators] = useState<Creator[]>([]);
  useEffect(() => {
    getCreators();
  }, []);

  async function getCreators() {
    const { error, data } = await supabase
      .from("creators")
      .select();

    if (error) {
      console.error("Error fetching creators:", error);
      setCreators([]);
      return;
    }
    setCreators(data ?? []);
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage creators={creators} />} />
        <Route path="/creators" element={<ShowCreators creators={creators} />} />
        <Route path="/add-creator" element={<AddCreator />} />
        <Route
          path="/creator/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ViewCreator />
            </Suspense>
          }
        />
        <Route
          path="/edit-creator/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EditCreator />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
