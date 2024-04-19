import { Feature } from './feature';
export class PlanResponse {
  constructor(
    public id: string,
    public name: string,
    public typePlan: string,
    public startDate: string,
    public endDate: string,
    public value: number,
    public createdAt: string,
    public updatedAt: string,
    public monitoreoTiempoReal: boolean,
    public alertasRiesgo: boolean,
    public comunicacionEntrenador: boolean,
    public sesionesVirtuales: number,
    public masajes: boolean,
    public cuidadoPosEjercicio: boolean,
    public features: Feature[]
  ) { }
}
