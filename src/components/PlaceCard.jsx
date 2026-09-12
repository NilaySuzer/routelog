import React from 'react';
import { MapPin, Star, Edit3, Trash2, CheckCircle2, Clock } from 'lucide-react';

export default function PlaceCard({ place, onEdit, onDelete, onToggleStatus }) {
  const isVisited = place.status === 'visited';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col group">
      {/* Görsel Alanı */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img 
          src={place.imageUrl} 
          alt={place.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
        />
        
       {/* Üst Rozetler */}
<div className="absolute top-3 left-3">
  <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-md bg-white/95 text-slate-800 backdrop-blur-md shadow-xs">
    {place.category}
  </span>
</div>

        {/* Durum Değiştirme Butonu */}
        <button
          onClick={() => onToggleStatus(place.id)}
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all ${
            isVisited 
              ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
              : 'bg-amber-500 text-white hover:bg-amber-600'
          }`}
        >
          {isVisited ? <CheckCircle2 size={13} /> : <Clock size={13} />}
          <span>{isVisited ? 'Gezildi' : 'Gidilecek'}</span>
        </button>
      </div>

      {/* Kart İçeriği */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-teal-700 transition-colors">
              {place.name}
            </h4>
            <div className="flex items-center gap-1 text-amber-500 shrink-0 font-semibold text-xs">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{place.rating}</span>
            </div>
          </div>
    {/* Şehir ve Bütçe Rozeti */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3 font-medium">
            <div className="flex items-center gap-1 truncate">
              <MapPin size={13} className="text-teal-600 shrink-0" />
              <span className="truncate">{place.city}</span>
            </div>

            {/* Modaldaki Tanımlı Bütçe Metni */}
            <span className="shrink-0 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200/60">
              {place.budget || 'Bütçe Belirtilmedi'}
            </span>
          </div>

          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
            {place.note || 'Henüz bir keşif notu düşülmedi.'}
          </p>
        </div>


        {/* CRUD Aksiyon Butonları */}
        <div className="flex items-center justify-end gap-1.5 pt-4 mt-4 border-t border-slate-100">
          <button 
            onClick={() => onEdit(place)}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition"
          >
            <Edit3 size={13} />
            <span>Düzenle</span>
          </button>
          <button 
            onClick={() => onDelete(place.id)}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
          >
            <Trash2 size={13} />
            <span>Sil</span>
          </button>
        </div>
      </div>
    </div>
  );
}