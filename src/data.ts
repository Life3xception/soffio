/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DaySchedule, EnergyLevel } from './types';

export const MOTIVATIONAL_MESSAGES = [
  "Anche 10 minuti di movimento oggi valgono. Non serve fare tutto perfetto.",
  "La costanza batte l'intensità. Una piccola camminata è una vittoria enorme.",
  "Muoversi poco è sempre meglio che aspettare la giornata ideale.",
  "Il tuo corpo lavora sodo per te tutto il giorno. Offrigli un momento di respiro.",
  "Alzarsi dalla sedia anche solo per allungare le braccia è un atto di rispetto per se stessi.",
  "La quiete e l'azione si completano. Oggi ascolta solo ciò di cui hai bisogno.",
  "Oggi non devi dimostrare niente a nessuno. Muoviti solo per sentirti bene.",
  "Non c'è colpa nel riposo. Scegliere di saltare oggi è una scelta consapevole.",
  "Piccole respirazioni, piccoli passi. Questa è la vera continuità sostenibile.",
  "Staccare gli occhi dallo schermo per 5 minuti ricarica più di quanto pensi."
];

export const INITIAL_WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    id: 'lun',
    dayName: 'Lunedì',
    energyRecommendation: {
      scarico: [
        { id: 'lun_s1', name: 'Allungamento polsi e avambracci (anti-tastiera)', durationMin: 5, completed: false, skipped: false, category: 'stretching', alternativeName: 'Pugni aperti e chiusi per riattivare la circolazione' },
        { id: 'lun_s2', name: 'Passeggiata lenta senza telefono nel palazzo', durationMin: 10, completed: false, skipped: false, category: 'movimento', alternativeName: 'Bere un bicchiere d\'acqua in terrazzo' },
        { id: 'lun_s3', name: 'Tecnica di rilassamento oculare (regola 20-20-20)', durationMin: 4, completed: false, skipped: false, category: 'mente' }
      ],
      normale: [
        { id: 'lun_n1', name: 'Camminata rigenerante post-lavoro', durationMin: 20, completed: false, skipped: false, category: 'movimento', alternativeName: 'Passeggiata nel parco vicino casa' },
        { id: 'lun_n2', name: 'Mobilizzazione spalle, collo e torace', durationMin: 8, completed: false, skipped: false, category: 'stretching', alternativeName: 'Allungamento intercostale alla sedia' },
        { id: 'lun_n3', name: 'Pausa di respirazione quadrata (Box Breathing)', durationMin: 5, completed: false, skipped: false, category: 'mente' }
      ],
      energico: [
        { id: 'lun_e1', name: 'Corsa leggera o camminata a passo svelto', durationMin: 25, completed: false, skipped: false, category: 'movimento' },
        { id: 'lun_e2', name: 'Rafforzamento leggero: piegamenti alla parete e squat dolci', durationMin: 12, completed: false, skipped: false, category: 'movimento', alternativeName: 'Plank morbida per risvegliare il core' },
        { id: 'lun_e3', name: 'Stretching profondo catena posteriore e anche', durationMin: 8, completed: false, skipped: false, category: 'stretching' }
      ]
    }
  },
  {
    id: 'mar',
    dayName: 'Martedì',
    energyRecommendation: {
      scarico: [
        { id: 'mar_s1', name: 'Spalle all\'indietro e rotazioni dolci del collo', durationMin: 5, completed: false, skipped: false, category: 'stretching', alternativeName: 'Auto-massaggio leggero trapezio e nuca' },
        { id: 'mar_s2', name: 'Passeggiata distensiva post-pranzo', durationMin: 15, completed: false, skipped: false, category: 'movimento' },
        { id: 'mar_s3', name: 'Respirazione addominale con mano sulla pancia', durationMin: 5, completed: false, skipped: false, category: 'mente' }
      ],
      normale: [
        { id: 'mar_n1', name: 'Corestretching: movimenti sedia e gatto/mucca', durationMin: 10, completed: false, skipped: false, category: 'stretching', alternativeName: 'Allungamenti morbidi a gambe divaricate' },
        { id: 'mar_n2', name: 'Camminata attiva a blocchi di 5 min nel quartiere', durationMin: 20, completed: false, skipped: false, category: 'movimento' },
        { id: 'mar_n3', name: 'Tisana calda in completo silenzio (no schermi)', durationMin: 10, completed: false, skipped: false, category: 'sonno' }
      ],
      energico: [
        { id: 'mar_e1', name: 'Routine di yoga dinamico focalizzato sul bacino', durationMin: 20, completed: false, skipped: false, category: 'mente' },
        { id: 'mar_e2', name: 'Allenamento corpo libero aerobico (saltelli e affondi dolci)', durationMin: 15, completed: false, skipped: false, category: 'movimento' },
        { id: 'mar_e3', name: 'Sblocco articolare completo stando in piedi', durationMin: 10, completed: false, skipped: false, category: 'stretching' }
      ]
    }
  },
  {
    id: 'mer',
    dayName: 'Mercoledì',
    energyRecommendation: {
      scarico: [
        { id: 'mer_s1', name: 'Allungamento lombare da seduti (flessione avanti)', durationMin: 6, completed: false, skipped: false, category: 'stretching', alternativeName: 'Torsioni gentili del busto da seduti' },
        { id: 'mer_s2', name: 'Cinque salite e discese di scale a passo calmo', durationMin: 5, completed: false, skipped: false, category: 'movimento' },
        { id: 'mer_s3', name: '5 minuti di silenzio con occhi chiusi e mani calde sopra', durationMin: 5, completed: false, skipped: false, category: 'mente' }
      ],
      normale: [
        { id: 'mer_n1', name: 'Stretching gambe, polpacci e tendine d\'Achille', durationMin: 10, completed: false, skipped: false, category: 'stretching' },
        { id: 'mer_n2', name: 'Passeggiata serale per eliminare le tossine mentali', durationMin: 25, completed: false, skipped: false, category: 'movimento' },
        { id: 'mer_n3', name: 'Lasciare lo smartphone spento 30 minuti prima di coricarsi', durationMin: 30, completed: false, skipped: false, category: 'sonno' }
      ],
      energico: [
        { id: 'mer_e1', name: 'Circuito risveglio muscolare: ponte glutei e sollevamenti gambe', durationMin: 15, completed: false, skipped: false, category: 'movimento' },
        { id: 'mer_e2', name: 'Camminata veloce in pendenza leggera', durationMin: 25, completed: false, skipped: false, category: 'movimento' },
        { id: 'mer_e3', name: 'Stretching profondo per psoas e flessori dell\'anca', durationMin: 10, completed: false, skipped: false, category: 'stretching' }
      ]
    }
  },
  {
    id: 'gio',
    dayName: 'Giovedì',
    energyRecommendation: {
      scarico: [
        { id: 'gio_s1', name: 'Rotazione cuffia rotatoria con braccia a cactus', durationMin: 5, completed: false, skipped: false, category: 'stretching', alternativeName: 'Incrociare le dita e spingere i palmi avanti' },
        { id: 'gio_s2', name: 'Camminata lenta in cortile o giardino', durationMin: 12, completed: false, skipped: false, category: 'movimento' },
        { id: 'gio_s3', name: 'Respirazione rilassante 4-7-8 prima di pranzare', durationMin: 4, completed: false, skipped: false, category: 'mente' }
      ],
      normale: [
        { id: 'gio_n1', name: 'Stretching completo piriforme e glutei', durationMin: 10, completed: false, skipped: false, category: 'stretching', alternativeName: 'Allungamento adduttori a terra' },
        { id: 'gio_n2', name: 'Andare a fare la spesa o sbrigare commissioni a piedi', durationMin: 20, completed: false, skipped: false, category: 'movimento' },
        { id: 'gio_n3', name: 'Sgranchirsi sollevandosi sulle punte dei piedi (25 ripetizioni)', durationMin: 5, completed: false, skipped: false, category: 'movimento' }
      ],
      energico: [
        { id: 'gio_e1', name: 'Passeggiata a passo molto svelto o corsa controllata', durationMin: 30, completed: false, skipped: false, category: 'movimento' },
        { id: 'gio_e2', name: 'Routine di allungamento integrale dinamico', durationMin: 15, completed: false, skipped: false, category: 'stretching' },
        { id: 'gio_e3', name: 'Sessione di respirazione profonda focalizzata sulla presenza', durationMin: 8, completed: false, skipped: false, category: 'mente' }
      ]
    }
  },
  {
    id: 'ven',
    dayName: 'Venerdì',
    energyRecommendation: {
      scarico: [
        { id: 'ven_s1', name: 'Semplici rotazioni dei piedi e delle caviglie', durationMin: 5, completed: false, skipped: false, category: 'movimento', alternativeName: 'Alzare piano i talloni alternati rimanendo seduti' },
        { id: 'ven_s2', name: 'Allungamento dolce delle braccia verso l\'alto', durationMin: 5, completed: false, skipped: false, category: 'stretching' },
        { id: 'ven_s3', name: 'Scrivere brevemente come ti senti oggi senza giudizio', durationMin: 5, completed: false, skipped: false, category: 'mente' }
      ],
      normale: [
        { id: 'ven_n1', name: 'Camminata distensiva per accogliere il fine settimana', durationMin: 25, completed: false, skipped: false, category: 'movimento' },
        { id: 'ven_n2', name: 'Stretching lombare e glutei sdraiati a terra', durationMin: 10, completed: false, skipped: false, category: 'stretching' },
        { id: 'ven_n3', name: 'Doccia tiepida consapevole al buio o con luce soffusa', durationMin: 10, completed: false, skipped: false, category: 'mente' }
      ],
      energico: [
        { id: 'ven_e1', name: 'Piccola sessione fitness di tonificazione sedia/parete', durationMin: 15, completed: false, skipped: false, category: 'movimento' },
        { id: 'ven_e2', name: 'Camminata sostenuta all\'aria aperta scoprendo vie nuove', durationMin: 30, completed: false, skipped: false, category: 'movimento' },
        { id: 'ven_e3', name: 'Allungamento profondo in torsione vertebrale sdraiati', durationMin: 10, completed: false, skipped: false, category: 'stretching' }
      ]
    }
  },
  {
    id: 'sab',
    dayName: 'Sabato',
    energyRecommendation: {
      scarico: [
        { id: 'sab_s1', name: 'Stretching calmo per l\'apertura del petto', durationMin: 8, completed: false, skipped: false, category: 'stretching' },
        { id: 'sab_s2', name: 'Stare fuori all\'ombra o al sole leggero per qualche minuto', durationMin: 15, completed: false, skipped: false, category: 'mente' },
        { id: 'sab_s3', name: 'Un sonnellino restaurativo pomeridiano rigenerante', durationMin: 20, completed: false, skipped: false, category: 'sonno' }
      ],
      normale: [
        { id: 'sab_n1', name: 'Camminata libera nella natura o in centro storico', durationMin: 40, completed: false, skipped: false, category: 'movimento' },
        { id: 'sab_n2', name: 'Mobilizzazione anche della sedia (apertura a farfalla)', durationMin: 10, completed: false, skipped: false, category: 'stretching' },
        { id: 'sab_n3', name: 'Praticare un hobby analogico senza schermi o notifiche', durationMin: 30, completed: false, skipped: false, category: 'mente' }
      ],
      energico: [
        { id: 'sab_e1', name: 'Uscita a piedi più lunga o escursione rilassante', durationMin: 60, completed: false, skipped: false, category: 'movimento' },
        { id: 'sab_e2', name: 'Pratica yoga di fluidità o pilates molto leggero', durationMin: 25, completed: false, skipped: false, category: 'stretching' },
        { id: 'sab_e3', name: 'Meditazione meditata camminando a piedi scalzi su prato o sabbia', durationMin: 15, completed: false, skipped: false, category: 'mente' }
      ]
    }
  },
  {
    id: 'dom',
    dayName: 'Domenica',
    energyRecommendation: {
      scarico: [
        { id: 'dom_s1', name: 'Gambe sollevate contro la parete (Scarico lombare e circolatorio)', durationMin: 10, completed: false, skipped: false, category: 'stretching' },
        { id: 'dom_s2', name: 'Lettura di un capitolo di un libro cartaceo prima di dormire', durationMin: 15, completed: false, skipped: false, category: 'sonno' },
        { id: 'dom_s3', name: 'Esercizio rinfrescante di micro-respiro toracico', durationMin: 5, completed: false, skipped: false, category: 'mente' }
      ],
      normale: [
        { id: 'dom_n1', name: 'Camminata defaticante domenicale senza fretta', durationMin: 30, completed: false, skipped: false, category: 'movimento' },
        { id: 'dom_n2', name: 'Stretching totale corpo: collo, spalle, bacino e gambe', durationMin: 15, completed: false, skipped: false, category: 'stretching' },
        { id: 'dom_n3', name: 'Auto-riflessione della settimana scrivendo tre cose piacevoli', durationMin: 10, completed: false, skipped: false, category: 'mente' }
      ],
      energico: [
        { id: 'dom_e1', name: 'Esplorazione a piedi in un raggio di 4 km', durationMin: 45, completed: false, skipped: false, category: 'movimento' },
        { id: 'dom_e2', name: 'Routine risveglio core e allungamenti profondi a terra', durationMin: 20, completed: false, skipped: false, category: 'stretching' },
        { id: 'dom_e3', name: 'Camminata meditativa silenziosa per connettersi col respiro', durationMin: 20, completed: false, skipped: false, category: 'mente' }
      ]
    }
  }
];

export function getDayIdFromIndex(index: number): string {
  const days = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
  return days[index];
}

export function getItalianDayName(id: string): string {
  switch (id) {
    case 'lun': return 'Lunedì';
    case 'mar': return 'Martedì';
    case 'mer': return 'Mercoledì';
    case 'gio': return 'Giovedì';
    case 'ven': return 'Venerdì';
    case 'sab': return 'Sabato';
    case 'dom': return 'Domenica';
    default: return '';
  }
}
