
export enum Lapso {
  PRIMERO = 'Primer Lapso',
  SEGUNDO = 'Segundo Lapso',
  TERCERO = 'Tercer Lapso'
}

export interface Task {
  id: string;
  materia: string;
  actividad: string;
  fecha: string; // ISO string
  porcentaje: number;
  lapso: Lapso;
  completada: boolean;
  nota?: number; // 1-20
}

export interface ExtractedTask {
  materia: string;
  actividad: string;
  fecha: string;
  porcentaje: number;
}
