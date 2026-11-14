// src/components/StoryCardGenerator.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Download, Loader2, Sparkles, X, Check, Share2 } from 'lucide-react';
import type { FlashbackPhoto } from '../data/mock';

interface StoryCardGeneratorProps {
  photo: FlashbackPhoto | null;
  onClose: () => void;
  onDownloadSuccess?: () => void; // Opcional: pode disparar +25 XP no FaparContext
}

export const StoryCardGenerator: React.FC<StoryCardGeneratorProps> = ({
  photo,
  onClose,
  onDownloadSuccess,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRendering, setIsRendering] = useState(true);
  const [downloaded, setDownloaded] = useState(false);
  const [customTag, setCustomTag] = useState('');
  const [accentTheme, setAccentTheme] = useState<'neon' | 'cyber' | 'gold'>('neon');

  useEffect(() => {
    if (!photo) return;
    setCustomTag(photo.tagged_handles[0] || '@fapar.online');
  }, [photo]);

  useEffect(() => {
    if (!photo || !canvasRef.current) return;

    let isCancelled = false;
    setIsRendering(true);

    const renderStoryCanvas = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dimensão oficial Instagram Stories (9:16)
      const W = 1080;
      const H = 1920;
      canvas.width = W;
      canvas.height = H;

      // Paletas de tema selecionáveis pelo usuário
      const palettes = {
        neon: { primary: '#8B5CF6', secondary: '#06B6D4', badge: '#EC4899' },
        cyber: { primary: '#06B6D4', secondary: '#10B981', badge: '#3B82F6' },
        gold: { primary: '#F59E0B', secondary: '#EC4899', badge: '#8B5CF6' },
      };
      const colors = palettes[accentTheme];

      // Carrega imagem com proteção contra CORS (via fetch -> ObjectURL)
      const loadSafeImage = async (url: string): Promise<HTMLImageElement> => {
        try {
          const response = await fetch(url, { mode: 'cors' });
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);

          return await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              URL.revokeObjectURL(objectUrl);
              resolve(img);
            };
            img.onerror = reject;
            img.src = objectUrl;
          });
        } catch {
          // Fallback procedural caso a URL externa bloqueie fetch totalmente
          const fallbackCanvas = document.createElement('canvas');
          fallbackCanvas.width = 900;
          fallbackCanvas.height = 1200;
          const fCtx = fallbackCanvas.getContext('2d')!;
          const grad = fCtx.createLinearGradient(0, 0, 900, 1200);
          grad.addColorStop(0, '#1e1b4b');
          grad.addColorStop(1, '#311042');
          fCtx.fillStyle = grad;
          fCtx.fillRect(0, 0, 900, 1200);
          fCtx.fillStyle = '#ffffff';
          fCtx.font = 'bold 48px sans-serif';
          fCtx.textAlign = 'center';
          fCtx.fillText('REGISTRO OFICIAL FAPAR', 450, 580);

          const fallbackImg = new Image();
          fallbackImg.src = fallbackCanvas.toDataURL('image/png');
          await new Promise((r) => (fallbackImg.onload = r));
          return fallbackImg;
        }
      };

      const img = await loadSafeImage(photo.image_url);
      if (isCancelled) return;

      // 1. Fundo base escuro
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, W, H);

      // 2. Fundo preenchido com zoom + blur da própria foto (evita bordas vazias)
      ctx.save();
      ctx.filter = 'blur(45px) brightness(0.45)';
      const bgScale = Math.max(W / img.width, H / img.height) * 1.1;
      const bgW = img.width * bgScale;
      const bgH = img.height * bgScale;
      ctx.drawImage(img, (W - bgW) / 2, (H - bgH) / 2, bgW, bgH);
      ctx.restore();

      // 3. Gradiente de vinheta superior e inferior para leitura nítida
      const topGrad = ctx.createLinearGradient(0, 0, 0, 420);
      topGrad.addColorStop(0, 'rgba(9, 9, 11, 0.92)');
      topGrad.addColorStop(1, 'rgba(9, 9, 11, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, W, 420);

      const botGrad = ctx.createLinearGradient(0, H - 520, 0, H);
      botGrad.addColorStop(0, 'rgba(9, 9, 11, 0)');
      botGrad.addColorStop(1, 'rgba(9, 9, 11, 0.96)');
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, H - 520, W, 520);

      // 4. Moldura central da foto principal (Card arredondado com borda neon)
      const frameX = 72;
      const frameY = 300;
      const frameW = W - 144;
      const frameH = 1160;
      const radius = 36;

      // Glow externo da moldura
      ctx.save();
      ctx.shadowColor = colors.primary;
      ctx.shadowBlur = 45;
      ctx.strokeStyle = colors.secondary;
      ctx.lineWidth = 6;
      drawRoundedRect(ctx, frameX, frameY, frameW, frameH, radius);
      ctx.stroke();
      ctx.restore();

      // Recorte arredondado e encaixe proporcional (object-cover) da foto
      ctx.save();
      drawRoundedRect(ctx, frameX, frameY, frameW, frameH, radius);
      ctx.clip();

      const imgRatio = img.width / img.height;
      const frameRatio = frameW / frameH;
      let drawW = frameW;
      let drawH = frameH;
      let drawX = frameX;
      let drawY = frameY;

      if (imgRatio > frameRatio) {
        drawH = frameH;
        drawW = frameH * imgRatio;
        drawX = frameX - (drawW - frameW) / 2;
      } else {
        drawW = frameW;
        drawH = frameW / imgRatio;
        drawY = frameY - (drawH - frameH) / 2;
      }
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      // 5. Cabeçalho Oficial FAPAR (Topo)
      ctx.fillStyle = colors.badge;
      drawRoundedRect(ctx, 72, 110, 310, 52, 26);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FLASHBACK OFICIAL', 227, 144);

      ctx.textAlign = 'left';
      ctx.font = '900 68px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('FAPAR', 72, 242);

      // Destaque "ONLINE" em ciano/neon
      ctx.fillStyle = colors.secondary;
      ctx.fillText('2027', 318, 242);

      // Edição alinhada à direita no topo
      ctx.textAlign = 'right';
      ctx.font = '600 28px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#E4E4E7';
      ctx.fillText(photo.edition.toUpperCase(), W - 72, 195);

      ctx.font = '500 24px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = colors.secondary;
      ctx.fillText(`# ${photo.category.toUpperCase()}`, W - 72, 236);

      // 6. Rodapé com @ marcado, créditos do fotógrafo e URL do portal
      const footerTop = frameY + frameH + 65;

      // Pill com o @ do participante
      if (customTag.trim()) {
        ctx.textAlign = 'left';
        ctx.font = 'bold 42px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(customTag.startsWith('@') ? customTag : `@${customTag}`, 72, footerTop + 20);
      }

      // Crédito do fotógrafo
      ctx.textAlign = 'left';
      ctx.font = '500 28px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#A1A1AA';
      ctx.fillText(`Foto por ${photo.photographer_handle}`, 72, footerTop + 75);

      // Linha divisória sutil
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(72, footerTop + 115);
      ctx.lineTo(W - 72, footerTop + 115);
      ctx.stroke();

      // Call-to-action inferior
      ctx.textAlign = 'left';
      ctx.font = 'bold 30px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = colors.secondary;
      ctx.fillText('fapar.online', 72, footerTop + 175);

      ctx.textAlign = 'right';
      ctx.font = '500 26px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#D4D4D8';
      ctx.fillText('Araras • SP • Circuito Geek & Otaku', W - 72, footerTop + 175);

      setIsRendering(false);
    };

    renderStoryCanvas();

    return () => {
      isCancelled = true;
    };
  }, [photo, customTag, accentTheme]);

  if (!photo) return null;

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `fapar-story-${photo.id}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    if (onDownloadSuccess) onDownloadSuccess();
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/15 bg-zinc-950 p-5 md:p-6 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[92vh] overflow-y-auto">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-zinc-300 hover:bg-white/20 hover:text-white transition"
          aria-label="Fechar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Coluna Esquerda: Preview do Canvas (Proporção 9:16) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center bg-zinc-900/80 rounded-xl p-4 border border-white/10">
          <div className="relative w-full max-w-[260px] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {isRendering && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 text-cyan-400 gap-2 z-10">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-xs font-medium">Renderizando moldura...</span>
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain block"
            />
          </div>
          <span className="mt-2 text-[11px] text-zinc-400">
            Resolução nativa: 1080 × 1920px (Instagram / TikTok)
          </span>
        </div>

        {/* Coluna Direita: Controles de Personalização e Download */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-5 pt-2">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 px-3 py-1 text-xs font-semibold text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              Gerador Oficial de Stories
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              Pronto para postar e marcar a galera
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Personalize seu <code className="text-cyan-400">@</code> e escolha a borda do Circuito FAPAR. A moldura aplica os créditos do fotógrafo automaticamente.
            </p>

            {/* Input para editar o @ exibido no card */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Seu @ do Instagram no card
              </label>
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="@seu.instagram"
                className="w-full rounded-lg border border-white/15 bg-zinc-900 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Seletor de Tema da Moldura */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">
                Estilo da Borda Neon
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAccentTheme('neon')}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    accentTheme === 'neon'
                      ? 'border-violet-500 bg-violet-500/20 text-white'
                      : 'border-white/10 bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  Roxo Otaku
                </button>
                <button
                  type="button"
                  onClick={() => setAccentTheme('cyber')}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    accentTheme === 'cyber'
                      ? 'border-cyan-400 bg-cyan-500/20 text-white'
                      : 'border-white/10 bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  Ciano Cyber
                </button>
                <button
                  type="button"
                  onClick={() => setAccentTheme('gold')}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    accentTheme === 'gold'
                      ? 'border-amber-400 bg-amber-500/20 text-white'
                      : 'border-white/10 bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  Final Gold
                </button>
              </div>
            </div>
          </div>

          {/* Botão de Download */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isRendering}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 hover:opacity-95 disabled:opacity-50 transition cursor-pointer"
            >
              {downloaded ? (
                <>
                  <Check className="h-5 w-5" />
                  Card Baixado! (+25 XP)
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  Baixar PNG para Stories
                </>
              )}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-zinc-500">
              <Share2 className="h-3.5 w-3.5 text-cyan-400" />
              Poste marcando <strong className="text-zinc-300">@fapar.online</strong> para aparecer nos destaques!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper para desenhar retângulos arredondados compatível com qualquer navegador
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}