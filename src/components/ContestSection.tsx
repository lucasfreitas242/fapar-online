// src/components/ContestSection.tsx
import React, { useState } from 'react';
import {
  Trophy,
  Star,
  Flame,
  CheckCircle,
  Radio,
  Lock,
  PlusCircle,
  Music,
  Upload,
  Info,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  MOCK_CONTEST_ENTRIES,
  type ContestCategory,
  type ContestEntry,
} from '../data/mock';
import { useFaparState } from '../lib/useFaparState';
import { faparStore, triggerToast } from '../lib/store';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

export const ContestSection: React.FC = () => {
  const { isEventLive, contestVotes, votedCategoryMap } = useFaparState();
  const [selectedCategory, setSelectedCategory] = useState<ContestCategory>('cosplay_desfile');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Formulário simulado de inscrição
  const [regName, setRegName] = useState('');
  const [regCharacter, setRegCharacter] = useState('');
  const [regFandom, setRegFandom] = useState('');
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories: { id: ContestCategory; label: string; badge: string }[] = [
    { id: 'cosplay_desfile', label: 'Cosplay Desfile', badge: 'Palco Oficial' },
    { id: 'kpop', label: 'K-pop Solo / Grupo', badge: 'Dança & Cover' },
    { id: 'closet_cosplay', label: 'Desafio Online (Closet Cosplay)', badge: 'Entressafra 2027' },
  ];

  const filteredEntries = MOCK_CONTEST_ENTRIES.filter(
    (e) => e.category === selectedCategory
  ).sort((a, b) => {
    // Ordena por nota do júri descendente
    return b.judges_final_score - a.judges_final_score;
  });

  // Cálculo de votos totais na categoria para exibir porcentagens reais
  const totalCategoryVotes = filteredEntries.reduce((acc, curr) => {
    return acc + (contestVotes[curr.id] ?? curr.popular_votes);
  }, 0);

  const handleVote = (entry: ContestEntry) => {
    faparStore.voteContestEntry(entry);
  };

  const handleAudioSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFileName(e.target.files[0].name);
    } else {
      setAudioFileName('musica_apresentacao_editada_90s.mp3');
    }
  };

  const handleImageSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImagePreview(url);
    } else {
      setImagePreview('https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&auto=format&fit=crop&q=80');
    }
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regCharacter.trim()) {
      alert('Por favor preencha seu nome e o personagem/música.');
      return;
    }

    faparStore.addXp(150, 'contest_entry', `Inscrição Concurso — ${regCharacter} (${selectedCategory})`);
    triggerToast({
      title: '🎉 Inscrição Simulada com Sucesso!',
      description: `Sua vaga para "${regCharacter}" foi registrada na prévia do Circuito 2027! Você ganhou +150 XP de incentivo!`,
      type: 'xp',
      xpAmount: 150,
    });

    setIsRegisterModalOpen(false);
    setRegName('');
    setRegCharacter('');
    setRegFandom('');
    setAudioFileName(null);
    setImagePreview(null);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header da Página */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 px-3 py-1 text-xs font-semibold text-yellow-300">
              <Trophy className="h-3.5 w-3.5" />
              Circuito Oficial FAPAR • Etapas & Premiações
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Concursos, Ranking & Votação
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              Consulte as pontuações detalhadas atribuídas pelo corpo de jurados técnicos e participe da escolha do <strong>Favorito do Público</strong> durante as transmissões ao vivo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setIsRegisterModalOpen(true)}
              variant="cyan"
              size="md"
              className="shadow-cyan-500/25"
            >
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Prévia de Inscrição 2027
            </Button>
          </div>
        </div>

        {/* Banner do Estado da Votação (Ao Vivo vs Entressafra) */}
        <div
          className={`rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${
            isEventLive
              ? 'border-rose-500/40 bg-rose-950/20 shadow-[0_0_30px_-5px_rgba(244,63,94,0.25)]'
              : 'border-violet-500/30 bg-violet-950/20'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                isEventLive
                  ? 'border-rose-500/50 bg-rose-500/20 text-rose-300'
                  : 'border-violet-500/40 bg-violet-500/20 text-violet-300'
              }`}
            >
              {isEventLive ? <Radio className="h-5 w-5 animate-pulse" /> : <Lock className="h-5 w-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {isEventLive
                    ? 'Votação Popular do Palco Aberta!'
                    : 'Votação Popular Fechada no Momento'}
                </span>
                {isEventLive ? (
                  <span className="rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-black text-white uppercase tracking-wider animate-pulse">
                    Ao Vivo
                  </span>
                ) : (
                  <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-zinc-400">
                    Entressafra
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-300 mt-0.5">
                {isEventLive
                  ? 'Você pode registrar 1 voto por modalidade. Cada voto computado soma +50 XP ao seu perfil!'
                  : 'A votação é liberada no dia do evento presencial. Para testar o voto agora, use a barra de controle demo no rodapé.'}
              </p>
            </div>
          </div>

          {!isEventLive && (
            <button
              onClick={() => faparStore.toggleEventMode()}
              className="shrink-0 rounded-xl border border-violet-500/40 bg-violet-600/20 px-3.5 py-2 text-xs font-bold text-violet-200 hover:bg-violet-600/30 transition cursor-pointer"
            >
              ⚡ Ativar Modo Ao Vivo no Demo
            </button>
          )}
        </div>

        {/* Abas por Categoria */}
        <div className="flex flex-wrap gap-2.5 border-b border-white/10 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-600/20 border border-cyan-400/30'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-75 font-normal">({cat.badge})</span>
            </button>
          ))}
        </div>

        {/* Grid de Participantes e Rankings Detalhados */}
        <div className="space-y-6">
          {filteredEntries.map((entry, index) => {
            const votes = contestVotes[entry.id] ?? entry.popular_votes;
            const votePercent =
              totalCategoryVotes > 0
                ? Math.round((votes / totalCategoryVotes) * 100)
                : 0;
            const hasVotedThisCategory = votedCategoryMap[entry.category] === entry.id;

            return (
              <div
                key={entry.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 p-5 sm:p-6 backdrop-blur-md hover:border-white/20 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                {/* Coluna 1: Posição, Avatar e Info do Participante (5 colunas) */}
                <div className="lg:col-span-5 flex items-start gap-4">
                  {/* Posição no Ranking */}
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black shadow-md ${
                        index === 0
                          ? 'bg-yellow-500 text-yellow-950'
                          : index === 1
                          ? 'bg-zinc-300 text-zinc-950'
                          : index === 2
                          ? 'bg-amber-700 text-amber-100'
                          : 'bg-zinc-800 text-zinc-300 border border-white/10'
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1 uppercase font-bold">
                      {index === 0 ? '1º Lugar' : index === 1 ? '2º Lugar' : `${index + 1}º`}
                    </span>
                  </div>

                  {/* Foto de Referência / Apresentação */}
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <img
                      src={entry.reference_image_url}
                      alt={entry.character_or_song}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Dados Artísticos */}
                  <div className="space-y-1 min-w-0">
                    <div className="inline-block rounded bg-cyan-500/15 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                      {entry.fandom_or_group}
                    </div>
                    <h3 className="text-lg font-black text-white truncate tracking-tight">
                      {entry.character_or_song}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Participante: <strong className="text-zinc-200">{entry.participant_name}</strong>
                    </p>
                    <div className="text-[11px] text-zinc-500 font-mono">
                      ID: {entry.id}
                    </div>
                  </div>
                </div>

                {/* Coluna 2: Critérios do Júri Técnico (4 colunas) */}
                <div className="lg:col-span-4 rounded-xl bg-zinc-900/60 p-3.5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-300 border-b border-white/5 pb-1.5">
                    <span>Avaliação do Júri Técnico</span>
                    <span className="text-yellow-400 flex items-center gap-1 font-mono">
                      <Star className="h-3 w-3 fill-yellow-400" />
                      Média: {entry.judges_final_score.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {entry.criteria_scores.map((crit) => (
                      <div key={crit.label} className="space-y-0.5">
                        <div className="flex justify-between text-[11px] text-zinc-400">
                          <span>{crit.label}</span>
                          <span className="font-mono text-zinc-200 font-bold">{crit.score.toFixed(1)}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className="h-full bg-violet-500"
                            style={{ width: `${(crit.score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coluna 3: Votação Popular & Interação (3 colunas) */}
                <div className="lg:col-span-3 flex flex-col justify-between space-y-3 lg:border-l lg:border-white/10 lg:pl-6">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 font-medium">Votos do Público:</span>
                      <span className="font-mono font-bold text-cyan-400">{votes} votos ({votePercent}%)</span>
                    </div>
                    {/* Barra de porcentagem de votos */}
                    <div className="mt-1.5 h-2 w-full rounded-full bg-zinc-800 overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500"
                        style={{ width: `${votePercent}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    {isEventLive ? (
                      hasVotedThisCategory ? (
                        <div className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-2.5 text-xs font-bold text-emerald-400">
                          <CheckCircle className="h-4 w-4" />
                          <span>Seu Voto Foi Registrado</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleVote(entry)}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 p-2.5 text-xs font-bold text-white shadow-lg shadow-violet-600/20 hover:opacity-95 transition cursor-pointer"
                        >
                          <Flame className="h-4 w-4 text-yellow-300" />
                          <span>Votar Neste Competidor (+50 XP)</span>
                        </button>
                      )
                    ) : (
                      <div className="rounded-xl bg-zinc-900/80 border border-white/5 p-2 text-center text-xs text-zinc-500">
                        <Lock className="h-3.5 w-3.5 mx-auto mb-1 text-zinc-600" />
                        Votação fechada na Entressafra
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Modal de Prévia de Inscrição */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <span>Formulário de Inscrição Oficial • Circuito 2027</span>
          </div>
        }
        maxWidth="xl"
      >
        <form onSubmit={handleSubmitRegistration} className="space-y-4 text-left">
          <div className="rounded-xl bg-violet-950/30 border border-violet-500/30 p-3 text-xs text-violet-200 flex items-start gap-2.5">
            <Info className="h-4 w-4 shrink-0 text-violet-400 mt-0.5" />
            <span>
              Este é o protótipo do formulário que será utilizado para as inscrições dos palcos Cosplay e K-pop de 2027. Ao enviar agora, você simula o envio e ganha <strong>+150 XP</strong> de incentivo no portal!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Modalidade do Concurso
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ContestCategory)}
                className="w-full rounded-xl border border-white/15 bg-zinc-900 p-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="cosplay_desfile">Cosplay Desfile (Individual)</option>
                <option value="kpop">K-pop Solo / Grupo</option>
                <option value="closet_cosplay">Desafio Online (Closet Cosplay)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Nome do Participante ou Grupo
              </label>
              <input
                type="text"
                placeholder="Ex: Mariana Alves / Grupo Eclipse"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-zinc-900 p-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
              </input>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Personagem ou Música
              </label>
              <input
                type="text"
                placeholder="Ex: Malenia (Elden Ring) ou Supernova (aespa)"
                value={regCharacter}
                onChange={(e) => setRegCharacter(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-zinc-900 p-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Origem / Fandom / Franquia
              </label>
              <input
                type="text"
                placeholder="Ex: FromSoftware / SM Entertainment"
                value={regFandom}
                onChange={(e) => setRegFandom(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-zinc-900 p-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Upload de Faixa de Áudio MP3 */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Faixa de Áudio da Apresentação (MP3 - Máx. 3 minutos)</span>
              <span className="text-[10px] text-zinc-400">Tempo limite: 90 a 180s</span>
            </label>
            <div className="relative rounded-xl border border-dashed border-white/20 bg-zinc-900/80 p-4 text-center hover:border-cyan-400 transition">
              <Music className="h-6 w-6 mx-auto mb-1 text-cyan-400" />
              <p className="text-xs text-zinc-300">
                {audioFileName ? (
                  <strong className="text-cyan-300 font-mono">{audioFileName}</strong>
                ) : (
                  'Clique para selecionar ou solte seu arquivo .mp3 aqui'
                )}
              </p>
              <input
                type="file"
                accept="audio/mp3,audio/*"
                onChange={handleAudioSim}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Upload de Imagem de Referência */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Imagem Oficial de Referência (para comparação dos jurados)
            </label>
            <div className="relative rounded-xl border border-dashed border-white/20 bg-zinc-900/80 p-4 text-center hover:border-violet-400 transition">
              {imagePreview ? (
                <div className="flex items-center justify-center gap-3">
                  <img src={imagePreview} alt="Preview" className="h-12 w-12 rounded object-cover border border-white/15" />
                  <span className="text-xs text-emerald-400 font-semibold">Imagem anexada com sucesso!</span>
                </div>
              ) : (
                <>
                  <Upload className="h-6 w-6 mx-auto mb-1 text-violet-400" />
                  <p className="text-xs text-zinc-300">Clique para anexar foto do personagem oficial (PNG/JPG)</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSim}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setIsRegisterModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="cyan"
              size="md"
            >
              Confirmar Inscrição Prévia (+150 XP)
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
