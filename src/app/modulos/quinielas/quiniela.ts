import { Liga } from '../ligas/liga';

export interface Quiniela {

    id: number;
    numero: number;
    nombre: string;
    fecha: Date;
    actualizada: Boolean;
    liga: Liga;
}
