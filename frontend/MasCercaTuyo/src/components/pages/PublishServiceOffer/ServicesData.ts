export interface TiempoEstimado 
{
    value: string;
    label: string;
}

export interface Status 
{
    value: string;
    label: string;
}

export interface Plazos 
{
    value: string;
    label: string;
}

export interface Category 
{
    value: string;
    label: string;
}

export interface ProviderOffer
{
  categoria: string,
  descripcion: string,
  estado: string,
  tiempoEstimado:string,
  costo: number,
  idUsuario: number,
  latitude?: number,
  longitude?: number
}

export interface ClientRequestService
{
  categoria: string,
  descripcion: string,
  plazos: string,
  solicitanteId: number,
  latitude?: number,
  longitude?: number
}


export const tiempos: TiempoEstimado[] = [
    { value: '0.5', label: '1/2 Hora' },
    { value: '1', label: '1 Hora' },
    { value: '1.5', label: '1 Hora y media' },
    { value: '2', label: '2 Horas' },
    { value: '2.5', label: '2 Horas y media' },
    { value: '3', label: '3 Horas' }
  ];
  
  
export const estados: Status[] = 
[
  { value: 'disponible', label: 'Disponible' },
  { value: 'ocupado', label: 'Ocupado' },
  { value: 'inactivo', label: 'Inactivo' }
];

export const statusClasses = 
{
  disponible: 'text-emerald-500 font-semibold',
  ocupado: 'text-yellow-600 font-semibold',
  inactivo: 'text-neutral-600 font-semibold',
} as { [key: string]: string }

  
  export const plazos: Plazos[] = [
    { value: 'urgente', label: 'Urgente' },
    { value: '3_dias_de_espera', label: '3 días de espera' },
    { value: '1_semana_de_espera', label: '1 semana de espera'},
    { value: 'sin_plazo_de_espera', label: 'Sin plazo de espera'}

  ];
  
  
  export const categories: Category[] = [
    { value: 'actividadFisica', label: 'Actividad física' },
    { value: 'alimentacion', label: 'Alimentación' },
    { value: 'asesoriaDelHogar', label: 'Asesora del hogar' },
    { value: 'bellezaYEstetica', label: 'Belleza y estética' },
    { value: 'cerrajero', label: 'Cerrajero' },
    { value: 'construccion', label: 'Construcción' },
    { value: 'cuidadoresDeAdultosMayores', label: 'Cuidadores de adultos mayores' },
    { value: 'cuidadoresDeNinos', label: 'Cuidadores de niños(as)' },
    { value: 'controlDePlagas', label: 'Control de plagas' },
    { value: 'educacion', label: 'Educación' },
    { value: 'electricista', label: 'Electricista' },
    { value: 'eventos', label: 'Eventos' },
    { value: 'instalacionDeSistemasDeSeguridad', label: 'Instalación de sistemas de seguridad' },
    { value: 'instalacionDeArtefactosDomesticos', label: 'Instalación de artefactos domésticos' },
    { value: 'jardineria', label: 'Jardinería' },
    { value: 'limpiezaYAseo', label: 'Limpieza y aseo' },
    { value: 'mascotas', label: 'Mascotas' },
    { value: 'mudanzaOFletes', label: 'Mudanza o fletes' },
    { value: 'pintura', label: 'Pintura' },
    { value: 'plomeria', label: 'Plomería'},
    { value: 'mecanica', label: 'Mecánica'},
    { value: 'reparaciones', label: 'Reparaciones'},
    { value: 'carpinteria', label: 'carpintería' },
    { value: 'reparacionesDeElectrodomesticos', label: 'Reparaciones de electrodomésticos' },
    { value: 'otro', label: 'Otro' }
];