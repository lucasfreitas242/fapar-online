// src/components/ArtistSection.tsx
import React, { useState } from 'react';
import {
  Palette,
  MapPin,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  DollarSign,
  Filter,
} from 'lucide-react';
import {
  MOCK_ARTISTS,
  type Artist,
  type ArtistCategory,
  type ArtistPortfolioItem,
} from '../data/mock';
import { Modal } from './ui/Modal';
import { InstagramIcon, WhatsAppIcon, ShopeeIcon } from './ui/SocialIcons';

export const ArtistSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyCommissionsOpen, setOnlyCommissionsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Estado para Modal de visualização de trabalho / orçamento
  const [selectedWork, setSelectedWork] = useState<{
    work: ArtistPortfolioItem;
    artist: Artist;
  } | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Expositores' },
    { id: 'illustrator', label: 'Ilustradores' },
    { id: 'cosmaker', label: 'Cosmakers & Props 3D' },
    { id: 'accessories', label: 'Acessórios Geek' },
    { id: 'photographer', label: 'Fotógrafos de Cosplay' },
  ];

  const filteredArtists = MOCK_ARTISTS.filter((artist) => {
    const matchesCategory =
      selectedCategory === 'all' || artist.category === selectedCategory;
    const matchesCommission = !onlyCommissionsOpen || artist.commissions_open;
    const matchesSearch =
      artist.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesCommission && matchesSearch;
  });

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header da Vitrine */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 px-3 py-1 text-xs font-semibold text-pink-300">
              <Palette className="h-3.5 w-3.5" />
              Vitrine Contínua de Criadores Regionais
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Artist's Alley & Cosmakers
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              O festival acaba, mas o trabalho dos artistas de Araras e região continua. Encomende props, ilustrações autorais, amigurumis e ensaios fotográficos direto com quem faz.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-zinc-300">
            <Sparkles className="h-4 w-4 text-pink-400" />
            <span><strong>{MOCK_ARTISTS.length}</strong> Estúdios Independentes Cadastrados</span>
          </div>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Input de Busca */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar por artista, técnica ou cidade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Toggle de Encomendas Abertas */}
            <div className="md:col-span-6 flex md:justify-end items-center">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <span className="text-xs sm:text-sm font-semibold text-zinc-300">
                  Apenas com encomendas abertas
                </span>
                <div
                  onClick={() => setOnlyCommissionsOpen(!onlyCommissionsOpen)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    onlyCommissionsOpen ? 'bg-emerald-500' : 'bg-zinc-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      onlyCommissionsOpen ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Categorias em Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Artistas */}
        {filteredArtists.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-12 text-center space-y-3">
            <Filter className="h-8 w-8 text-zinc-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">Nenhum artista encontrado</h3>
            <p className="text-xs text-zinc-400">Tente ajustar a busca ou desativar o filtro de encomendas abertas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-md hover:border-pink-500/30 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                {/* Topo do Card: Avatar, Marca, Local e Status */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={artist.avatar_url}
                        alt={artist.brand_name}
                        className="h-14 w-14 rounded-2xl object-cover ring-2 ring-pink-500/30 shadow-md"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            {artist.brand_name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                          <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                          <span>{artist.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge de Commissions */}
                    <div>
                      {artist.commissions_open ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Encomendas Abertas
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800 border border-white/10 px-3 py-1 text-xs font-medium text-zinc-400">
                          <Clock className="h-3 w-3" />
                          Agenda Fechada
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {artist.bio}
                  </p>
                </div>

                {/* Mini-Galeria de Trabalhos (3 imagens) */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Portfólio em Destaque (clique para detalhes)
                  </span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {artist.portfolio.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedWork({ work: item, artist })}
                        className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-zinc-900 text-left transition hover:scale-[1.02] cursor-pointer"
                      >
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                          <span className="text-[11px] font-bold text-white line-clamp-1">
                            {item.title}
                          </span>
                          {item.price_range && (
                            <span className="text-[10px] text-cyan-300 font-mono">
                              {item.price_range}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação Social / Contato */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {artist.social_links.instagram && (
                      <a
                        href={artist.social_links.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 text-pink-400 hover:bg-pink-500/20 hover:border-pink-500/40 transition"
                        title="Instagram"
                      >
                        <InstagramIcon className="h-4 w-4" />
                      </a>
                    )}
                    {artist.social_links.whatsapp && (
                      <a
                        href={artist.social_links.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition"
                        title="WhatsApp"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                      </a>
                    )}
                    {artist.social_links.shopee && (
                      <a
                        href={artist.social_links.shopee}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/40 transition"
                        title="Loja Shopee"
                      >
                        <ShopeeIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {artist.commissions_open ? (
                    <a
                      href={artist.social_links.whatsapp || artist.social_links.instagram || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-pink-600/20 hover:opacity-95 transition"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Solicitar Orçamento</span>
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-500 font-medium">
                      Novas vagas em breve
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal de Detalhe do Portfólio */}
      <Modal
        isOpen={!!selectedWork}
        onClose={() => setSelectedWork(null)}
        title={
          selectedWork ? (
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-pink-400" />
              <span>{selectedWork.work.title}</span>
            </div>
          ) : null
        }
        maxWidth="md"
      >
        {selectedWork && (
          <div className="space-y-5 text-left">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
              <img
                src={selectedWork.work.image_url}
                alt={selectedWork.work.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Criador</span>
                <span className="text-sm font-bold text-white">{selectedWork.artist.brand_name}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Faixa de Preço Estimada</span>
                <span className="text-sm font-black text-cyan-400 font-mono">
                  {selectedWork.work.price_range || 'Sob consulta'}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Trabalho autoral catalogado na vitrine oficial do FAPAR Online. Entre em contato direto com o artista para prazos de entrega e especificações de acabamento.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedWork(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
              >
                Fechar
              </button>
              {selectedWork.artist.social_links.whatsapp ? (
                <a
                  href={selectedWork.artist.social_links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500 transition"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>Conversar no WhatsApp</span>
                </a>
              ) : (
                <a
                  href={selectedWork.artist.social_links.instagram || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-pink-600/25 hover:bg-pink-500 transition"
                >
                  <InstagramIcon className="h-4 w-4" />
                  <span>Chamar no Instagram</span>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
