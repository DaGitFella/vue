export interface Categoria {
    id: number,
    categoria: string
}

export interface MensagemEnviar {
    titulo: string,
    autor?: string,
    texto: string,
    categoria: Categoria,
    dataHoraIso: Date
}

export interface MensagemReceber {
    id: number,
    titulo: string,
    autor?: string,
    texto: string,
    categoria: Categoria,
    dataHoraIso: Date
}
