import { Rol } from './rol'

export interface Usuario {

    id: number;
    nombre: string;
	username: string;
    //password?: string;
    email: string;
    fechaAlta: Date;
    fechaDesactivacion: Date;
    activo: Boolean;
    roles: Rol[];
}