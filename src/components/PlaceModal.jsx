import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const CATEGORIES = ['Kafe', 'Doğa', 'Tarih', 'Restoran', 'Manzara', 'Müze'];
const BUDGET_OPTIONS = [
  'Ücretsiz',
  'Ekonomik (~150-300 ₺)',
  'Orta Seviye (~400-800 ₺)',
  'Lüks / Deneyim (1000 ₺+)'
];

export default function PlaceModal({ isOpen, onClose, onSave, editingPlace }) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    category: 'Kafe',
    status: 'planned',
    budget: 'Ekonomik (~150-300 ₺)',
    rating: 5,
    note: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (editingPlace) {
      setFormData(editingPlace);
    } else {
      setFormData({
        name: '',
        city: '',
        category: 'Kafe',
        status: 'planned',
        budget: 'Ekonomik (~150-300 ₺)',
        rating: 5,
        note: '',
        imageUrl: ''
      });
    }
  }, [editingPlace, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.city.trim()) return;

    const finalData = {
      ...formData,
      imageUrl: formData.imageUrl.trim() || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
    };

    onSave(finalData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100">
        <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles size={18} className="text-teal-600" />
            {editingPlace ? 'Rotayı Düzenle' : 'Yeni Keşif Rotası'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Mekan / Rota Adı</label>
            <input 
              required
              type="text" 
              placeholder="Örn: Tarihi Çınaraltı Çay Bahçesi"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Şehir, İlçe</label>
              <input 
                required
                type="text" 
                placeholder="Örn: İstanbul, Çengelköy"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Kategori</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition bg-white"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Durum</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition bg-white"
              >
                <option value="planned">Gidilecek</option>
                <option value="visited">Gezildi</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Tahmini Bütçe</label>
              <select 
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
              >
                {BUDGET_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Puan (1-5)</label>
              <input 
                type="number" 
                min="1" 
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Görsel URL</label>
              <input 
                type="url" 
                placeholder="https://..."
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Keşif Notları</label>
            <textarea 
              rows="3"
              placeholder="Ne denenmeli, araç park yeri var mı, manzarası nerede güzel..."
              value={formData.note}
              onChange={(e) => setFormData({...formData, note: e.target.value})}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition resize-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Vazgeç
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-xl transition shadow-sm"
            >
              {editingPlace ? 'Güncellemeleri Kaydet' : 'Rotayı Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}