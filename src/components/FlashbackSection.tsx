// src/components/FlashbackSection.tsx
import React, { useState } from 'react';
import {
  Camera,
  Heart,
  Share2,
  Sparkles,
  Filter,
  Layers,
  Tag,
  Download,
} from 'lucide-react';
import { MOCK_FLASHBACK_PHOTOS, type FlashbackPhoto } from '../data/mock';
import { useFaparState } from '../lib/useFaparState';
import { faparStore } from '../lib/store';
import { StoryCardGenerator } from './StoryCardGenerator';

export const FlashbackSection: React.FC = () => {
  const { likedPhotos, photoLikesCount } = useFaparState();
  const [selectedEdition, setSelectedEdition] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeStoryPhoto, setActiveStoryPhoto] = useState<FlashbackPhoto | null>(null);

  const editions = [
    { id: 'all', label: 'Todas as Edições' },
    { id: 'FAPAR 2026 - Etapa Final', label: 'FAPAR 2026 - Etapa Final' },
    { id: 'FAPAR 2026 - Etapa 1', label: 'FAPAR 2026 - Etapa 1' },
    { id: 'FAPAR 2025', label: 'FAPAR 2025' },
  ];

  const categories = [
    { id: 'all', label: 'Todas as Categorias' },
    { id: 'Cosplay', label: 'Cosplay' },
    { id: 'Palco K-pop', label: 'Palco K-pop' },
    { id: 'Arena Games', label: 'Arena Games' },
    { id: 'Público', label: 'Público & Galera' },
  ];

  const filteredPhotos = MOCK_FLASHBACK_PHOTOS.filter((photo) => {
    const matchesEdition =
      selectedEdition === 'all' || photo.edition === selectedEdition;
    const matchesCategory =
      selectedCategory === 'all' || photo.category === selectedCategory;
    return matchesEdition && matchesCategory;
  });

  const handleLike = (photoId: string) => {
    faparStore.toggleLikePhoto(photoId);
  };

  const handleStoryDownloadReward = (photoId: string) => {
    faparStore.rewardStoryDownload(photoId);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header da Galeria */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
              <Camera className="h-3.5 w-3.5" />
              Memórias dos Palcos & Encontros
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Galeria Flashback & Stories
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              Reviva os melhores registros fotográficos das edições passadas do FAPAR. Clique em <strong>Gerar Card para Stories</strong> para aplicar a moldura oficial e compartilhar marcando seus amigos!
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-violet-950/40 border border-violet-500/30 px-4 py-2.5 text-xs text-violet-200">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Baixe qualquer card oficial e ganhe <strong>+25 XP</strong></span>
          </div>
        </div>

        {/* Filtros por Edição e Categoria */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Edição */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                <Layers className="h-3.5 w-3.5" /> Edição:
              </span>
              {editions.map((ed) => (
                <button
                  key={ed.id}
                  onClick={() => setSelectedEdition(ed.id)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                    selectedEdition === ed.id
                      ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {ed.label}
                </button>
              ))}
            </div>

            {/* Categoria */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                <Tag className="h-3.5 w-3.5" /> Categoria:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Fotos */}
        {filteredPhotos.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-12 text-center space-y-3">
            <Filter className="h-8 w-8 text-zinc-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">Nenhuma foto encontrada</h3>
            <p className="text-xs text-zinc-400">Tente selecionar outra combinação de filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => {
              const isLiked = !!likedPhotos[photo.id];
              const likes = photoLikesCount[photo.id] ?? photo.likes_count;

              return (
                <div
                  key={photo.id}
                  className="group relative rounded-2xl border border-white/10 bg-zinc-950/80 overflow-hidden backdrop-blur-md hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Foto com tags */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                    <img
                      src={photo.image_url}
                      alt={`Foto por ${photo.photographer_handle}`}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Gradiente superior com categoria */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-white/10">
                        {photo.category}
                      </span>
                      <span className="rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono text-zinc-300 border border-white/10">
                        {photo.edition.split(' - ')[1] || 'Final'}
                      </span>
                    </div>

                    {/* Gradiente inferior com @ marcados */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent p-3 pt-8">
                      <div className="flex flex-wrap gap-1">
                        {photo.tagged_handles.map((handle) => (
                          <span
                            key={handle}
                            className="text-[11px] font-semibold text-zinc-200 bg-white/10 px-1.5 py-0.5 rounded backdrop-blur-sm"
                          >
                            {handle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rodapé do Card */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="truncate">Foto: <strong className="text-zinc-200">{photo.photographer_handle}</strong></span>
                      <button
                        onClick={() => handleLike(photo.id)}
                        className={`flex items-center gap-1.5 transition cursor-pointer ${
                          isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-400'
                        }`}
                        title="Curtir foto"
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                        <span>{likes}</span>
                      </button>
                    </div>

                    {/* Botão Gerar Card para Stories (HTML5 Canvas) */}
                    <button
                      type="button"
                      onClick={() => setActiveStoryPhoto(photo)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-600/20 hover:opacity-95 transition cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Gerar Card para Stories</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Gerador de Card de Stories Modal (Canvas) */}
      <StoryCardGenerator
        photo={activeStoryPhoto}
        onClose={() => setActiveStoryPhoto(null)}
        onDownloadSuccess={() => {
          if (activeStoryPhoto) {
            handleStoryDownloadReward(activeStoryPhoto.id);
          }
        }}
      />
    </div>
  );
};
