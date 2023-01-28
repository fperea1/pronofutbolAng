import { Liga } from '../ligas/liga';

export interface Arbitro {

    id: number;
    nombre: string;
    ganadosLocal: number;
    empatados: number;
    ganadosVisitante: number;
    liga: Liga;
}
