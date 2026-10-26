import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DetalhesLancamento, TipoLancamento } from '../dados-lancamentos';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../../commmon/components/header/header';
import { LancamentoService } from '../lancamento-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PageResult } from '../../common/pagination/page-result';
import { DetalhesCategoria } from '../../categorias/dados-categoria';

interface FiltrosForm{
  mes: FormControl<string>;
  tipo: FormControl<TipoLancamento | ''>;
  categoriaId: FormControl<string>;
}

@Component({
  selector: 'app-listagem-lancamentos',
  imports: [ CommonModule, RouterLink, ReactiveFormsModule, Header],
  templateUrl: './listagem-lancamentos.html',
  styleUrl: './listagem-lancamentos.scss',
})
export class ListagemLancamentos implements OnInit {

  service = inject(LancamentoService);
  toast = inject(ToastrService);

  listagem$!: Observable<PageResult<DetalhesLancamento>>;
  categorias: DetalhesCategoria[] = [];
  paginaAtual = 0;
  tamanhoPagina = 10;

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup<FiltrosForm>({
      mes: new FormControl<string>('', {nonNullable: true}),
      tipo: new FormControl<TipoLancamento | ''>('', {nonNullable: true}),
      categoriaId: new FormControl<string>('', {nonNullable: true})
    });

    this.listarLancamentos();
  }

  listarLancamentos(){
    const mes = this.form.get('mes')?.value;
    const tipo = this.form.get('tipo')?.value;
    const categoriaId = this.form.get('categoriaId')?.value;

    this.listagem$ = this.service.listar({
      page: this.paginaAtual,
      size: this.tamanhoPagina,
      mes: mes || undefined,
      tipo: tipo || undefined,
      categoriaId: categoriaId || undefined
    });
  }

  aplicarFiltros(){
    console.log(this.form.value);
    this.paginaAtual = 0;
    //this.listarLancamentos();
  }

  limparFiltros(){
    this.form.reset();
  }

}
