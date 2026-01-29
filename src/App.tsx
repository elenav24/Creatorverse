// import { useState } from 'react'
import supabase from './utils/supabase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import { useState, useEffect } from 'react';
import type { Creator } from './types/creator';

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
      <Routes>
        <Route path="/" element={<Homepage creators={creators} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
