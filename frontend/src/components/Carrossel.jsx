import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Buscando from "./Buscando";

const Carrossel = ({ itens }) => {
    if (!Array.isArray(itens) || itens.length === 0) {
        return (
            <Buscando />
        );
    }

    const [[index, direction], setIndex] = useState([0, 0]);
    const [paused, setPaused] = useState(false);

    const paginate = (newDirection) => {
        setIndex(([prev]) => {
            const next = (prev + newDirection + itens.length) % itens.length;
            return [next, newDirection];
        });
    };

    useEffect(() => {
        if (paused) return;

        const timer = setInterval(() => {
            paginate(1);
        }, 6000);

        return () => clearInterval(timer);
    }, [itens.length, paused]);


    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const [titulo, sinopse, imagem] = itens[index];

    return (
        <div
            className="relative w-full h-[400px] overflow-hidden group"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={imagem}
                    src={imagem}
                    alt={titulo}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate={{
                        ...variants.center,
                        scale: 1.08,
                        y: -10,
                        transition: {
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 6, ease: "easeOut" },
                            y: { duration: 6, ease: "easeOut" }
                        }
                    }}
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="absolute w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Degradê inferior */}
            <div className="absolute bottom-0 w-full h-80 bg-gradient-to-t from-primary dark:from-primary-dark to-transparent z-10 transition-all duration-500" />

            {/* Conteúdo sobreposto */}
            <div className="absolute bottom-10 left-10 z-20 text-white max-w-xl">
                <h2 className="text-3xl pb-2 font-bold text-gray-900 dark:text-white">{titulo}</h2>
                <p className="mt-2 text-sm text-gray-800 dark:text-gray-400">{sinopse}</p>
            </div>

            {/* Setas de navegação */}
            <button
                onClick={() => paginate(-1)}
                className="hidden group-hover:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 p-2 rounded-full text-white"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={() => paginate(1)}
                className="hidden group-hover:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 p-2 rounded-full text-white"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {itens.map((_, i) => (
                <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                    i === index ? "bg-white" : "bg-white/40"
                    }`}
                />
                ))}
            </div>
        </div>
    );
};

export default Carrossel;
