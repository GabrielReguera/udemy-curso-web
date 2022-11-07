import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";

@Component({
  selector: "app-chamado-read",
  templateUrl: "./chamado-read.component.html",
  styleUrls: ["./chamado-read.component.css"],
})
export class ChamadoReadComponent implements OnInit {
  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
    nomeCliente: "",
    nomeTecnico: "",
  };
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  constructor(
    private chamdoService: ChamadoService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chamdoService
      .findById(this.route.snapshot.paramMap.get("id"))
      .subscribe({
        next: (rs) => (this.chamado = rs),
        error: (e) =>
          this.toast.error("Erro ao listar Chamado " + e.error.error),
      });
  }

  retornaStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "EM ANDAMENTO";
    } else {
      return "ENCERRADO";
    }
  }

  retornaPrioriadade(pri: any): string {
    if (pri == "0") {
      return "BAIXA";
    } else if (pri == "1") {
      return "MÉDIA";
    } else {
      return "ALTA";
    }
  }
}
