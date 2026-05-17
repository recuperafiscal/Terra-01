/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  GalleryVertical, 
  Globe, 
  Settings, 
  CheckCircle2, 
  MapPin, 
  UserPlus, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface LinkCardProps {
  title: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
  href: string;
  btnText?: string;
  delay?: number;
  highlight?: boolean;
  key?: React.Key;
}

// --- Components ---

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      {/* Concrete Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://www.transparenttextures.com/patterns/concrete-wall.png')`,
        }}
      />
      {/* Animated Particles (Dust/Cinders) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-500/20 rounded-full blur-[1px]"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
      {/* Subtle Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#b87333]/5 blur-[120px] rounded-full" />
    </div>
  );
};

const BlueprintEffect = () => (
  <div className="absolute inset-0 z-0 opacity-40 overflow-hidden pointer-events-none">
    {/* Technical Grid */}
    <div 
      className="absolute inset-0 opacity-[0.05]"
      style={{ 
        backgroundImage: `radial-gradient(#b87333 0.5px, transparent 0.5px)`,
        backgroundSize: '10px 10px'
      }}
    />
    
    <svg className="w-full h-full p-4" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {/* Dimension Lines */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        {/* Horizontal Dimension */}
        <motion.path
          d="M 20 85 L 80 85"
          fill="none" stroke="#b87333" strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <circle cx="20" cy="85" r="0.5" fill="#b87333" />
        <circle cx="80" cy="85" r="0.5" fill="#b87333" />
        <text x="50" y="83" fontSize="2.5" fill="#b87333" textAnchor="middle" className="font-mono">MODULAR SYSTEM</text>

        {/* Vertical Dimension */}
        <motion.path
          d="M 15 30 L 15 70"
          fill="none" stroke="#b87333" strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
        />
        <text x="13" y="50" fontSize="2.5" fill="#b87333" textAnchor="middle" transform="rotate(-90 13 50)" className="font-mono">PRECISION</text>
      </motion.g>

      {/* Layered Bricks Simulation */}
      {[0, 1, 2].map((i) => (
        <motion.g key={i} transform={`translate(${25 + i * 5}, ${60 - i * 8})`}>
          {/* Brick Body */}
          <motion.rect
            width="30" height="12"
            rx="1"
            fill="none" stroke="#b87333" strokeWidth="0.3"
            strokeDasharray="1 1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 1, 
              delay: i * 0.4,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
          {/* Internal Furos (Holes) */}
          <motion.circle
            cx="8" cy="6" r="2"
            fill="none" stroke="#b87333" strokeWidth="0.2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.4 + 0.5, duration: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
          />
          <motion.circle
            cx="22" cy="6" r="2"
            fill="none" stroke="#b87333" strokeWidth="0.2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.4 + 0.6, duration: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
          />
          {/* Technical markers at corners */}
          <motion.path 
            d="M 2 2 L 5 2 M 2 2 L 2 5" 
            stroke="#cc5500" strokeWidth="0.1" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.4 }}
          />
        </motion.g>
      ))}

      {/* Connection Indicator */}
      <motion.circle
        cx="75" cy="30" r="3"
        fill="none" stroke="#cc5500" strokeWidth="0.2"
        strokeDasharray="1 1"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M 75 25 L 75 35 M 70 30 L 80 30"
        stroke="#cc5500" strokeWidth="0.1"
      />
    </svg>
  </div>
);

const LinkCard = ({ 
  title, 
  subtitle, 
  image, 
  icon, 
  href,
  btnText, 
  delay = 0, 
  highlight = false,
  customEffect
}: LinkCardProps & { customEffect?: React.ReactNode }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.21, 1.02, 0.73, 1] // Custom ease for smoother "pop"
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative block w-full overflow-hidden rounded-2xl border ${
        highlight ? 'border-[#b87333]/50' : 'border-white/10'
      } bg-[#1a1a1a]/40 backdrop-blur-xl transition-all duration-300 hover:border-[#cc5500]/40 shadow-2xl`}
    >
      {/* Image Background with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {customEffect && customEffect}

      {/* Content */}
      <div className="relative z-10 flex min-h-[140px] flex-row items-center p-6">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${highlight ? 'bg-[#cc5500] text-white' : 'bg-white/10 text-gray-400'}`}>
              {icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b87333]">Terrabricks</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight uppercase font-sans">{title}</h3>
          <p className="mt-1 text-sm font-medium text-gray-400 line-clamp-2 max-w-[90%]">{subtitle}</p>
          
          {btnText && (
            <div className="mt-4 flex items-center gap-2">
               <span className="inline-flex items-center gap-2 rounded-full bg-[#cc5500] px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(204,85,0,0.3)] transition-all group-hover:bg-[#e66000] group-active:scale-95">
                {btnText}
                <ArrowRight size={14} />
              </span>
            </div>
          )}
        </div>
        
        <div className="ml-4 opacity-20 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          <ChevronRight className="text-[#b87333]" size={28} strokeWidth={3} />
        </div>
      </div>
    </motion.a>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingBtn(true);
      } else {
        setShowFloatingBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const WHATSAPP_URL = "https://wa.me/553192020603";

  const CARDS_DATA = [
    {
      title: "Solicitar orçamento",
      subtitle: "Descubra quanto sua obra pode economizar com o sistema modular.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
      icon: <MessageCircle size={14} />,
      href: WHATSAPP_URL,
      btnText: "Chamar no WhatsApp",
      highlight: true
    },
    {
      title: "Galeria de projetos",
      subtitle: "Veja modelos, obras finalizadas e inspirações reais.",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800",
      icon: <GalleryVertical size={14} />,
      href: WHATSAPP_URL,
      customEffect: (
        <div className="absolute top-2 right-2 flex gap-1 opacity-40">
          <div className="h-1 w-4 bg-white/20 rounded-full" />
          <div className="h-1 w-2 bg-white/20 rounded-full" />
        </div>
      )
    },
    {
      title: "Visitar o site",
      subtitle: "Conheça todos os detalhes técnicos da construção ecológica.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
      icon: <Globe size={14} />,
      href: WHATSAPP_URL,
      btnText: "Acessar agora",
      customEffect: <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#cc5500]/10 blur-3xl rounded-full" />
    },
    {
      title: "Como funciona",
      subtitle: "Encaixe inteligente, menos desperdício e obra 3x mais rápida.",
      image: "https://images.unsplash.com/photo-1590069230002-1b1259740bb3?q=80&w=800",
      icon: <Settings size={14} />,
      href: WHATSAPP_URL,
      customEffect: <BlueprintEffect />
    },
    {
      title: "Benefícios",
      subtitle: "Resistência superior, conforto térmico e 100% sustentável.",
      image: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=800",
      icon: <CheckCircle2 size={14} />,
      href: WHATSAPP_URL,
      customEffect: (
         <div className="absolute top-4 right-4 animate-bounce">
          <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-white/40 font-bold">100%</div>
         </div>
      )
    },
    {
      title: "Localização",
      subtitle: "Encontre nossa fábrica e fale com nossa equipe comercial.",
      image: "https://images.unsplash.com/photo-1581094288338-2314dddb7903?q=80&w=800",
      icon: <MapPin size={14} />,
      href: "https://www.google.com/maps/search/?api=1&query=Rua+Serra+Verde+39205-000+Três+Marias+MG",
      customEffect: (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div 
            animate={{ scale: [1, 2, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-20 w-20 rounded-full bg-[#cc5500]/20"
          />
        </div>
      )
    },
    {
      title: "Falar com especialista",
      subtitle: "Tire suas dúvidas técnicas antes de começar sua obra.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800",
      icon: <UserPlus size={14} />,
      href: WHATSAPP_URL,
      btnText: "Atendimento rápido"
    }
  ];

  return (
    <div className="relative min-h-screen selection:bg-[#cc5500] selection:text-white" ref={containerRef}>
      <ParticleBackground />

      <main className="relative z-10 mx-auto max-w-md px-6 py-12 md:px-4">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-[#cc5500]/20 rounded-full" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#b87333]/30 bg-black/50 backdrop-blur-md shadow-2xl">
                <span className="text-2xl font-black text-white tracking-tighter">TB</span>
                {/* 3D-ish brick decorative elements */}
                <div className="absolute -bottom-1 -right-1 h-4 w-6 bg-[#b87333] opacity-50 blur-[2px]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Construa com <span className="text-[#cc5500]">inteligência.</span>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed px-4">
              Tijolos ecológicos para obras mais econômicas, rápidas e sustentáveis.
            </p>
          </motion.div>
        </header>

        {/* Links Grid */}
        <div className="flex flex-col gap-4">
          {CARDS_DATA.map((card, index) => (
            <LinkCard
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              image={card.image}
              icon={card.icon}
              href={card.href}
              btnText={card.btnText}
              highlight={card.highlight}
              customEffect={card.customEffect}
              delay={0.3 + index * 0.08}
            />
          ))}
        </div>


        {/* Footer */}
        <footer className="mt-20 py-8 text-center border-t border-white/5">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">
            Terrabricks — Fábrica de Tijolos
          </p>
          <p className="mt-2 text-[11px] text-gray-600">
            Construção ecológica, econômica e inteligente.
          </p>
          <p className="mt-6 text-[9px] text-gray-700">
            © {new Date().getFullYear()} TERRABRICKS. Todos os direitos reservados.
          </p>
        </footer>
      </main>

      {/* Floating Call to Action */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6"
          >
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-md items-center justify-between rounded-full bg-[#cc5500] px-6 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(204,85,0,0.4)] transition-transform active:scale-95"
            >
              <span>SOLICITAR ORÇAMENTO</span>
              <MessageCircle size={20} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
