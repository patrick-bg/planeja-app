export class ResumoFinanceiro {
    receitas!: number;
    despesas!: number;
    saldo!: number;
}

export class DespesaCategoriaResumo {
    categoria!: string;
    valor!: number;
}

export class Dashboard {
    mes!: string;
    resumo!: string;
    despesasPorCategoria!: DespesaCategoriaResumo[];
}