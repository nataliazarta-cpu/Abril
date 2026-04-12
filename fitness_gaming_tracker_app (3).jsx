import React, { useEffect, useMemo, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Flame,
  Trophy,
  Dumbbell,
  TimerReset,
  HeartPulse,
  Footprints,
  Soup,
  ShieldCheck,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

const phases = [
  {
    name: "Fase 1 · Base",
    weeks: "Semanas 1–4",
    focus: "Técnica, hábito y capacidad aeróbica",
    rule: "Sube peso de mochila o añade 1 ronda cuando se vuelva fácil.",
    sets: 3,
    timeBonus: 0,
    repBonus: 0,
    rest: 20,
  },
  {
    name: "Fase 2 · Intensidad",
    weeks: "Semanas 5–8",
    focus: "Más densidad de trabajo y más tensión muscular",
    rule: "Reduce descansos y usa versiones más difíciles.",
    sets: 4,
    timeBonus: 5,
    repBonus: 2,
    rest: 15,
  },
  {
    name: "Fase 3 · Rendimiento",
    weeks: "Semanas 9–12",
    focus: "Más calidad, más potencia, más control",
    rule: "Mantén técnica limpia y empuja el ritmo sin impacto.",
    sets: 4,
    timeBonus: 10,
    repBonus: 3,
    rest: 10,
  },
];

const exerciseArt = {
  squats: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="60" cy="22" r="10" fill="currentColor" opacity="0.95" />
      <path d="M60 32 L60 64" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 44 L38 54" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 44 L82 54" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 64 L42 88" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 64 L78 88" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M28 92 H92" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  pushups: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="30" cy="60" r="9" fill="currentColor" />
      <path d="M38 62 H82" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M48 62 L36 82" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M64 62 L56 86" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M82 62 L98 78" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M24 90 H100" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  row: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="32" cy="34" r="9" fill="currentColor" />
      <path d="M40 38 H78" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M78 38 L96 28" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M66 40 L60 68" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 68 L42 92" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M70 68 L82 92" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M24 96 H96" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  bridge: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="28" cy="66" r="8" fill="currentColor" />
      <path d="M36 66 C52 48, 68 48, 84 66" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M42 66 L36 90" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M78 66 L84 90" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M24 94 H96" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  lunge: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="60" cy="18" r="9" fill="currentColor" />
      <path d="M60 28 L60 56" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 42 L44 56" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 42 L76 56" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 56 L44 86" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 56 L86 78" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M20 92 H100" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  climbers: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="34" cy="44" r="8" fill="currentColor" />
      <path d="M42 48 H80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M52 48 L34 76" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M68 48 L84 68" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M76 48 L100 58" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M22 92 H100" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  plank: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="34" cy="58" r="8" fill="currentColor" />
      <path d="M42 60 H84" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M52 60 L38 82" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M70 60 L66 84" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M84 60 L100 72" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M18 92 H102" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  crunch: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="34" cy="64" r="8" fill="currentColor" />
      <path d="M42 66 C54 56, 66 56, 78 66" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M56 66 L66 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M40 84 H88" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  deadlift: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="58" cy="24" r="9" fill="currentColor" />
      <path d="M58 33 L58 60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 42 L40 52" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 42 L78 52" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 60 L42 88" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 60 L76 88" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M28 90 H92" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M24 50 H36" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M84 50 H96" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  burpee: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="60" cy="20" r="8" fill="currentColor" />
      <path d="M60 28 L60 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 36 L40 48" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 36 L80 48" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M48 50 L34 74" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M72 50 L88 74" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M24 94 H96" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  mobility: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <circle cx="60" cy="18" r="8" fill="currentColor" />
      <path d="M60 26 L60 52" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 36 L40 46" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 36 L80 46" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 52 L42 82" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 52 L78 82" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M22 92 H98" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  footsteps: (
    <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 text-white">
      <path d="M46 24 C40 24, 36 30, 36 38 C36 50, 44 60, 52 60 C58 60, 62 56, 62 48 C62 34, 54 24, 46 24 Z" fill="currentColor" />
      <path d="M72 44 C66 44, 62 50, 62 58 C62 70, 70 80, 78 80 C84 80, 88 76, 88 68 C88 54, 80 44, 72 44 Z" fill="currentColor" opacity="0.95" />
    </svg>
  ),
};

const programs = {
  1: {
    title: "Día 1 · Base pierna + core",
    warmup: [
      { name: "Marcha rápida", type: "timer", value: 45, art: "footsteps" },
      { name: "Sentadilla lenta", type: "reps", value: 10, art: "squats" },
      { name: "Movilidad de cadera", type: "timer", value: 30, art: "mobility" },
    ],
    main: [
      { name: "Sentadilla con mochila", type: "reps", value: 12, art: "squats", scale: "Añade libros a la mochila o baja más lento 3 segundos." },
      { name: "Body crunch", type: "reps", value: 15, art: "crunch", scale: "Pausa 1 segundo arriba o suma 3 repeticiones." },
      { name: "Puente de glúteo", type: "reps", value: 15, art: "bridge", scale: "Eleva una pierna o pon peso sobre la cadera." },
      { name: "Zancada atrás silenciosa", type: "reps", value: 10, art: "lunge", scale: "Sostén mochila o haz pausa abajo." },
    ],
    finisher: { name: "Plancha", type: "timer", value: 25, art: "plank", scale: "Sube a 35–45 s o cambia a plancha con toques de hombro." },
  },
  2: {
    title: "Día 2 · Tren superior + ritmo",
    warmup: [
      { name: "Círculos de brazos", type: "timer", value: 30, art: "mobility" },
      { name: "Apoyos escapulares", type: "reps", value: 10, art: "pushups" },
      { name: "Bisagra de cadera", type: "reps", value: 10, art: "deadlift" },
    ],
    main: [
      { name: "Flexiones inclinadas", type: "reps", value: 10, art: "pushups", scale: "Baja la inclinación o pasa a flexión completa." },
      { name: "Remo con mochila", type: "reps", value: 12, art: "row", scale: "Aumenta peso o haz 1 s de pausa arriba." },
      { name: "Fondos en silla", type: "reps", value: 8, art: "pushups", scale: "Extiende piernas más lejos o añade repeticiones." },
      { name: "Mountain climbers", type: "timer", value: 30, art: "climbers", scale: "Aumenta a 40 s o acelera sin perder control." },
    ],
    finisher: { name: "Plancha", type: "timer", value: 20, art: "plank", scale: "Cambia a plancha alta o alarga el tiempo." },
  },
  3: {
    title: "Día 3 · Glúteo + abdomen",
    warmup: [
      { name: "Marcha con rodillas arriba", type: "timer", value: 45, art: "footsteps" },
      { name: "Sentadilla con pausa", type: "reps", value: 8, art: "squats" },
      { name: "Rotación de tronco", type: "timer", value: 30, art: "mobility" },
    ],
    main: [
      { name: "Peso muerto con mochila", type: "reps", value: 12, art: "deadlift", scale: "Carga la mochila más o baja más lento." },
      { name: "Puente de glúteo", type: "reps", value: 20, art: "bridge", scale: "Hazlo a una pierna o con pausa de 2 s." },
      { name: "Body crunch", type: "reps", value: 12, art: "crunch", scale: "Añade pausa arriba o sube a 20 repeticiones." },
      { name: "Sentadilla sumo", type: "reps", value: 12, art: "squats", scale: "Sostén mochila al pecho o alarga la bajada." },
    ],
    finisher: { name: "Hollow hold", type: "timer", value: 20, art: "plank", scale: "Aumenta a 30–40 s o alterna con plancha." },
  },
  4: {
    title: "Día 4 · Full body silencioso",
    warmup: [
      { name: "Step jacks sin salto", type: "timer", value: 45, art: "footsteps" },
      { name: "Movilidad de tobillos", type: "timer", value: 30, art: "mobility" },
      { name: "Bisagra + alcance", type: "reps", value: 10, art: "deadlift" },
    ],
    main: [
      { name: "Sentadilla con mochila", type: "reps", value: 10, art: "squats", scale: "Aumenta peso o pausa 2 s abajo." },
      { name: "Flexiones", type: "reps", value: 8, art: "pushups", scale: "Hazlas menos inclinadas o suma repeticiones." },
      { name: "Remo con mochila", type: "reps", value: 12, art: "row", scale: "Carga más o controla la bajada." },
      { name: "Burpee sin salto", type: "reps", value: 8, art: "burpee", scale: "Añade 2 repeticiones o acelera el ritmo." },
    ],
    finisher: { name: "Plancha", type: "timer", value: 30, art: "plank", scale: "Plancha con toque de hombros o 45 s." },
  },
};

function getPhase(week) {
  const normalized = Math.max(1, Math.min(12, week));
  const phaseIndex = normalized <= 4 ? 0 : normalized <= 8 ? 1 : 2;
  const localWeek = normalized <= 4 ? normalized : normalized <= 8 ? normalized - 4 : normalized - 8;
  return { phaseIndex, localWeek };
}

function buildWorkout(week, day) {
  const { phaseIndex, localWeek } = getPhase(week);
  const phase = phases[phaseIndex];
  const base = programs[day];
  const timeBoost = phase.timeBonus + Math.max(0, localWeek - 1);
  const repBoost = phase.repBonus + (localWeek >= 3 ? 1 : 0);
  const rest = Math.max(8, phase.rest - (localWeek >= 3 ? 5 : 0));

  const scale = (exercise) => {
    if (exercise.type === "timer") {
      return { ...exercise, value: Math.max(15, exercise.value + timeBoost), sets: phase.sets, rest };
    }
    return { ...exercise, value: Math.max(6, exercise.value + repBoost), sets: phase.sets, rest };
  };

  return {
    phase,
    localWeek,
    title: base.title,
    warmup: base.warmup.map(scale),
    main: base.main.map(scale),
    finisher: scale(base.finisher),
  };
}

function Stat({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
      <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-slate-300">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-sm font-bold text-white sm:text-base">{value}</div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-base font-black text-slate-900 sm:text-lg">{title}</h2>
        <p className="text-xs text-slate-500 sm:text-sm">{subtitle}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5" />
    </div>
  );
}

function ExerciseCard({ exercise, completed, onToggle, isActive, hint }) {
  const isTimed = exercise.type === "timer";
  return (
    <div className={`rounded-3xl border p-3 sm:p-4 shadow-sm transition ${completed ? "border-emerald-400 bg-emerald-50/70" : "border-slate-200 bg-white"}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center self-center rounded-3xl bg-slate-950 text-white shadow-inner sm:h-24 sm:w-24 sm:self-auto">
          {exerciseArt[exercise.art] || exerciseArt.mobility}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <div>
              <div className="text-base font-semibold text-slate-900 sm:text-lg">{exercise.name}</div>
              <div className="text-xs text-slate-600 sm:text-sm">
                {isTimed ? `${exercise.value} s por ronda` : `${exercise.value} reps por ronda`}
                {exercise.sets ? ` · ${exercise.sets} series` : ""}
                {exercise.rest ? ` · descanso ${exercise.rest} s` : ""}
              </div>
            </div>
            <button
              onClick={onToggle}
              className={`w-full rounded-full px-3 py-2 text-sm font-medium transition sm:w-auto ${completed ? "bg-emerald-600 text-white" : isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-800"}`}
            >
              {completed ? "Chuleado" : isActive ? "En marcha" : "Marcar"}
            </button>
          </div>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-xs text-slate-700 sm:text-sm">
            <div className="font-semibold text-slate-900">Cómo escalar</div>
            <div>{exercise.scale}</div>
          </div>
          <div className="mt-3 text-[10px] uppercase tracking-wide text-slate-500 sm:text-xs">{hint}</div>
        </div>
      </div>
    </div>
  );
}

export default function RoutineGamifiedTracker() {
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState(1);
  const [running, setRunning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const [doneMap, setDoneMap] = useState({});
  const [totalSessions, setTotalSessions] = useState(0);
  const [mode, setMode] = useState("discipline");
  const [compactMode, setCompactMode] = useState(true);

  const workout = useMemo(() => buildWorkout(week, day), [week, day]);
  const allExercises = useMemo(() => {
    const warm = workout.warmup.map((e) => ({ ...e, block: "Warm-up", sets: 1, round: 1 }));
    const main = workout.main.flatMap((e) => Array.from({ length: e.sets }, (_, i) => ({ ...e, block: "Main", round: i + 1 })));
    const fin = Array.from({ length: workout.finisher.sets }, (_, i) => ({ ...workout.finisher, block: "Finisher", round: i + 1 }));
    return [...warm, ...main, ...fin];
  }, [workout]);
  const currentExercise = allExercises[selectedIndex];

  useEffect(() => {
    if (!currentExercise) return;
    setSecondsLeft(currentExercise.type === "timer" ? currentExercise.value : 0);
    setRepCount(currentExercise.type === "reps" ? currentExercise.value : 0);
    setRunning(false);
  }, [currentExercise?.name, currentExercise?.value]);

  useEffect(() => {
    if (!running || !currentExercise || currentExercise.type !== "timer") return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, currentExercise]);

  const phaseProgress = Math.round(((week - 1) / 11) * 100);
  const completedExercises = Object.values(doneMap).filter(Boolean).length;
  const workoutProgress = Math.round((completedExercises / allExercises.length) * 100);

  const menu = [
    { title: "Desayuno post-entreno", items: ["2 huevos", "arepa pequeña o pan integral", "fruta", "agua"] },
    { title: "Almuerzo", items: ["proteína magra", "arroz o papa", "ensalada grande", "agua"] },
    { title: "Cena ligera", items: ["yogur natural o huevo", "verduras", "fruta si hay hambre", "evita gaseosas"] },
  ];

  const toggleDone = (key) => setDoneMap((prev) => ({ ...prev, [key]: !prev[key] }));

  const nextExercise = () => {
    if (selectedIndex < allExercises.length - 1) {
      setSelectedIndex((i) => i + 1);
      return;
    }
    setRunning(false);
    setSelectedIndex(0);
  };

  const completeSession = () => {
    setDoneMap((prev) => ({ ...prev, [`session-${week}-${day}`]: true }));
    setTotalSessions((n) => n + 1);
    setSelectedIndex(0);
    setRunning(false);

    if (day < 4) {
      setDay((d) => d + 1);
    } else {
      setDay(1);
      setWeek((w) => {
        const next = Math.min(12, w + 1);
        if (next === 12) setMode("elite");
        return next;
      });
    }
  };

  const failSession = () => {
    setRunning(false);
    setMode("discipline");
    setSelectedIndex(0);
    setDoneMap({});
    alert("❌ Fallaste. Reinicia el bloque y vuelve al punto de control.");
  };

  const startPause = () => {
    if (!currentExercise || currentExercise.type !== "timer") return;
    setRunning((r) => !r);
  };

  const resetCurrent = () => {
    if (!currentExercise) return;
    setRunning(false);
    setSecondsLeft(currentExercise.type === "timer" ? currentExercise.value : 0);
    setRepCount(currentExercise.type === "reps" ? currentExercise.value : 0);
  };

  const incRep = () => {
    if (!currentExercise || currentExercise.type !== "reps") return;
    setRepCount((r) => Math.max(0, r - 1));
  };

  const decRep = () => {
    if (!currentExercise || currentExercise.type !== "reps") return;
    setRepCount((r) => r + 1);
  };

  return (
    <div className={`min-h-screen p-2 sm:p-4 text-slate-900 ${mode === "elite" ? "bg-gradient-to-b from-red-950 via-slate-950 to-slate-100" : "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100"}`}>
      <div className={`mx-auto max-w-6xl space-y-3 sm:space-y-4 ${compactMode ? "scale-[0.98] origin-top sm:scale-100" : ""}`}>
        <div className="rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-slate-950 p-4 sm:p-5 text-white shadow-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] sm:text-sm">
                <Trophy className="h-4 w-4" />
                Modo ARTEFACT · Disciplina extrema · Móvil
              </div>
              <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl md:text-5xl">Quest de Cumplimiento</h1>
              <p className="mt-2 max-w-2xl text-xs text-slate-300 sm:text-sm md:text-base">
                Sin gimnasio, sin equipo, sin excusas. Marca cada ejercicio, controla tu tiempo y deja que la progresión suba sola cada semana.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm sm:gap-3 md:grid-cols-4">
              <Stat label="Semana" value={`#${week}`} icon={<TimerReset className="h-4 w-4" />} />
              <Stat label="Fase" value={workout.phase.name} icon={<ShieldCheck className="h-4 w-4" />} />
              <Stat label="Avance" value={`${phaseProgress}%`} icon={<Flame className="h-4 w-4" />} />
              <Stat label="Workout" value={`${workoutProgress}%`} icon={<CheckCircle2 className="h-4 w-4" />} />
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <section className="space-y-4 rounded-[1.5rem] sm:rounded-[2rem] bg-white p-3 sm:p-5 shadow-xl">
            <div className="grid gap-3 md:grid-cols-3">
              <label className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Semana 1–12</div>
                <input type="range" min="1" max="12" value={week} onChange={(e) => setWeek(Number(e.target.value))} className="mt-3 w-full" />
                <div className="mt-1 text-sm font-medium text-slate-700">Seleccionada: semana {week}</div>
              </label>

              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Progresión automática</div>
                <div className="mt-2 text-sm font-medium text-slate-700">Día {day}/4</div>
                <div className="mt-1 text-xs text-slate-500">Al completar 4 días, la semana sube sola.</div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Día</div>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((d) => (
                    <button key={d} onClick={() => setDay(d)} className={`rounded-xl px-3 py-2 text-sm font-semibold ${day === d ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-900">
                <Dumbbell className="h-5 w-5" />
                <h2 className="text-lg font-bold sm:text-xl">{workout.title}</h2>
              </div>
              <p className="mt-1 text-sm text-slate-600">Bloque diseñado para peso corporal + mochila + body crunch + movilidad silenciosa.</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
              <div className="grid gap-3 md:grid-cols-3">
                {phases.map((phase, idx) => (
                  <div key={phase.name} className={`rounded-2xl p-3 ${idx === getPhase(week).phaseIndex ? "bg-slate-950 text-white" : "bg-white text-slate-700"}`}>
                    <div className="text-xs uppercase tracking-wide">{phase.weeks}</div>
                    <div className="mt-1 font-bold text-sm sm:text-base">{phase.name}</div>
                    <div className="mt-1 text-xs opacity-80">{phase.rule}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionHeader title="Calentamiento" subtitle="Hazlo una sola vez antes de empezar." />
              {workout.warmup.map((e, idx) => (
                <ExerciseCard
                  key={`warm-${idx}`}
                  exercise={e}
                  completed={!!doneMap[`warm-${day}-${idx}`]}
                  onToggle={() => toggleDone(`warm-${day}-${idx}`)}
                  isActive={selectedIndex === idx}
                  hint="Prepara articulaciones, respiración y postura."
                />
              ))}
            </div>

            <div className="space-y-4">
              <SectionHeader title="Trabajo principal" subtitle="Completa las series indicadas y marca cada bloque." />
              {workout.main.map((e, idx) => (
                <ExerciseCard
                  key={`main-${idx}`}
                  exercise={e}
                  completed={!!doneMap[`main-${day}-${idx}`]}
                  onToggle={() => toggleDone(`main-${day}-${idx}`)}
                  isActive={currentExercise?.name === e.name}
                  hint={`Series: ${e.sets} · descanso: ${e.rest} s`}
                />
              ))}
            </div>

            <div className="space-y-4">
              <SectionHeader title="Finisher" subtitle="Corto, limpio y efectivo." />
              <ExerciseCard
                exercise={workout.finisher}
                completed={!!doneMap[`fin-${day}`]}
                onToggle={() => toggleDone(`fin-${day}`)}
                isActive={currentExercise?.name === workout.finisher.name}
                hint={`Series: ${workout.finisher.sets} · descanso: ${workout.finisher.rest} s`}
              />
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-[1.5rem] sm:rounded-[2rem] bg-white p-3 sm:p-5 shadow-xl">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5" />
                <h2 className="text-lg font-bold sm:text-xl">Cronómetro / contador</h2>
              </div>

              <div className="mt-4 rounded-[1.5rem] sm:rounded-[2rem] bg-slate-950 p-4 sm:p-5 text-white">
                <div className="text-[10px] sm:text-sm uppercase tracking-[0.2em] text-slate-400">Ejercicio activo</div>
                <div className="mt-2 text-xl font-black sm:text-2xl">{currentExercise?.name || "Selecciona un ejercicio"}</div>
                <div className="mt-1 text-xs text-slate-300 sm:text-sm">
                  {currentExercise?.type === "timer" ? "Usa el cronómetro para trabajar por tiempo." : "Usa el contador para ir marcando repeticiones."}
                </div>
                <div className="mt-4 flex items-center justify-center rounded-[1.5rem] bg-white/10 p-4 sm:p-6">
                  {currentExercise?.type === "timer" ? (
                    <div className="text-center">
                      <div className="text-5xl font-black tracking-tight sm:text-6xl">{secondsLeft}s</div>
                      <div className="mt-1 text-xs text-slate-300 sm:text-sm">Cuenta regresiva</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-5xl font-black tracking-tight sm:text-6xl">{repCount}</div>
                      <div className="mt-1 text-xs text-slate-300 sm:text-sm">Repeticiones restantes</div>
                    </div>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                  <button onClick={startPause} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950">
                    {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {running ? "Pausar" : "Iniciar"}
                  </button>
                  <button onClick={resetCurrent} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-700 px-4 py-3 font-semibold text-white">
                    <RotateCcw className="h-4 w-4" />
                    Reiniciar
                  </button>
                  <button onClick={nextExercise} className="rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950">
                    Siguiente
                  </button>
                </div>

                {currentExercise?.type === "reps" && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button onClick={incRep} className="rounded-2xl bg-white/15 px-4 py-3 font-semibold text-white">
                      -1 rep
                    </button>
                    <button onClick={decRep} className="rounded-2xl bg-white/15 px-4 py-3 font-semibold text-white">
                      +1 rep
                    </button>
                  </div>
                )}

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button onClick={completeSession} className="flex-1 rounded-2xl bg-white px-4 py-3 font-bold text-slate-950">
                    <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
                    Completar sesión
                  </button>
                  <button onClick={failSession} className="rounded-2xl bg-red-600 px-4 py-3 font-bold text-white">
                    <AlertTriangle className="mr-2 inline-block h-4 w-4" />
                    Fallé
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-[1.5rem] sm:rounded-[2rem] bg-white p-3 sm:p-5 shadow-xl">
              <div className="flex items-center gap-2">
                <Soup className="h-5 w-5" />
                <h2 className="text-lg font-bold sm:text-xl">Menú sugerido</h2>
              </div>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">Sencillo, útil y compatible con entrenamiento diario.</p>

              <div className="mt-4 space-y-3">
                {menu.map((block) => (
                  <div key={block.title} className="rounded-2xl border border-slate-200 p-4">
                    <div className="font-semibold text-slate-900">{block.title}</div>
                    <ul className="mt-2 space-y-1 text-xs text-slate-600 sm:text-sm">
                      {block.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] sm:rounded-[2rem] bg-white p-3 sm:p-5 shadow-xl">
              <div className="flex items-center gap-2">
                <Footprints className="h-5 w-5" />
                <h2 className="text-lg font-bold sm:text-xl">Tracker del mes</h2>
              </div>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">{completedExercises} bloques chuleados · {totalSessions} sesiones completas.</p>
              <div className="mt-4 grid grid-cols-6 gap-1 sm:grid-cols-7 sm:gap-2">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
                  <div key={n} className={`rounded-lg p-2 text-center text-[10px] font-semibold sm:rounded-xl sm:text-sm ${n <= totalSessions ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {n}
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
