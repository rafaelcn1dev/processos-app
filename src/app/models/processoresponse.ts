import { Processo } from './processo';

export interface ProcessoResponse {
    content: Processo[];
    pageable: any;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    sort: any;
    numberOfElements: number;
    empty: boolean;
}