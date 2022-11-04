import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";
import { ClienteService } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-chamado-update",
  templateUrl: "./chamado-update.component.html",
  styleUrls: ["./chamado-update.component.css"],
})
export class ChamadoUpdateComponent implements OnInit {
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

  titulo: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  prioridade: FormControl = new FormControl(null, Validators.required);
  observacoes: FormControl = new FormControl(null, Validators.required);
  cliente: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);

  constructor(
    private chamdoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clienteService.findAll().subscribe((rs) => {
      this.clientes = rs;
    });
    this.tecnicoService.findAll().subscribe((rs) => {
      this.tecnicos = rs;
    });
    this.chamdoService
      .findById(this.route.snapshot.paramMap.get("id"))
      .subscribe({
        next: (rs) => (this.chamado = rs),
        error: (e) => this.toast.error("Erro ao listar Chamado " + e.error.error),
      });
  }

  update(): void {
    this.chamdoService.update(this.chamado).subscribe({
      next: () => {
        this.toast.success("Chamado Atualizado com sucesso", "Create");
        this.router.navigate(["chamados"]);
      },
      error: (e) => this.toast.error("Erro ao atualizar chamado" + e.error),
    });
  }

  validaCampos(): boolean {
    return (
      this.titulo.valid &&
      this.status.valid &&
      this.prioridade.valid &&
      this.observacoes.valid &&
      this.cliente.valid &&
      this.tecnico.valid
    );
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
