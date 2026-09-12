import React, { useState, useEffect } from 'react';
import PlaceCard from '../components/PlaceCard';
import PlaceModal from '../components/PlaceModal';
import { INITIAL_PLACES } from '../interfaces/mockPlaces';
import { Compass, Search, Plus, CheckCircle2, Clock, Map } from 'lucide-react';

export default function Home() {
  const [places, setPlaces] = useState(() => {
    const saved = localStorage.getItem('routelog_places');
    return saved ? JSON.parse(saved) : INITIAL_PLACES;
  });

  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'visited' | 'planned'
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);

  useEffect(() => {
    localStorage.setItem('routelog_places', JSON.stringify(places));
  }, [places]);

  const handleSavePlace = (placeData) => {
    if (editingPlace) {
      setPlaces(places.map(p => p.id === editingPlace.id ? { ...placeData, id: p.id } : p));
    } else {
      setPlaces([{ ...placeData, id: Date.now().toString() }, ...places]);
    }
  };

  const handleDeletePlace = (id) => {
    if (window.confirm('Bu keşif rotasını listenizden silmek istediğinize emin misiniz?')) {
      setPlaces(places.filter(p => p.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setPlaces(places.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'visited' ? 'planned' : 'visited' };
      }
      return p;
    }));
  };

  const handleOpenEdit = (place) => {
    setEditingPlace(place);
    setIsModalOpen(true);
  };

  const categories = ['Tümü', 'Kafe', 'Doğa', 'Tarih', 'Restoran', 'Manzara', 'Müze'];

  const filteredPlaces = places.filter(place => {
    const matchesStatus = statusFilter === 'all' || place.status === statusFilter;
    const matchesCategory = selectedCategory === 'Tümü' || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Üst Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <Compass size={20} />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 block leading-tight">
                RouteLog
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
                Kişisel Seyahat Atölyesi
              </span>
            </div>
          </div>

          <button 
            onClick={() => { setEditingPlace(null); setIsModalOpen(true); }}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition duration-200 shadow-sm"
          >
            <Plus size={15} />
            <span>Yeni Rota Ekle</span>
          </button>
        </div>
      </header>

      {/* Ana Gövde */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* İstatistik Sayaçları */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Kayıtlı Rota</p>
              <p className="text-xl font-extrabold text-slate-900 mt-0.5">{places.length}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
              <Map size={18} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Gezilenler</p>
              <p className="text-xl font-extrabold text-emerald-600 mt-0.5">
                {places.filter(p => p.status === 'visited').length}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={18} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Gidilecekler</p>
              <p className="text-xl font-extrabold text-amber-500 mt-0.5">
                {places.filter(p => p.status === 'planned').length}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Clock size={18} />
            </div>
          </div>
        </div>

        {/* Filtre ve Arama Alanı */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            {/* Arama Input */}
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Mekan veya şehir ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
              />
            </div>

            {/* Durum Sekmeleri (Visited / Planned Toggle) */}
            <div className="bg-slate-200/70 p-1 rounded-xl flex gap-1 self-stretch sm:self-auto">
              <button
                onClick={() => setStatusFilter('all')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tümü
              </button>
              <button
                onClick={() => setStatusFilter('visited')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === 'visited' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Gezilenler
              </button>
              <button
                onClick={() => setStatusFilter('planned')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === 'planned' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Gidilecekler
              </button>
            </div>
          </div>

          {/* Kategori Etiketleri */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Kartlar Grid'i */}
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <Compass size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-slate-500 text-xs font-medium">Bu kriterlere uygun keşif rotası bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map(place => (
              <PlaceCard 
                key={place.id}
                place={place}
                onEdit={handleOpenEdit}
                onDelete={handleDeletePlace}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <PlaceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePlace}
        editingPlace={editingPlace}
      />
    </div>
  );
}