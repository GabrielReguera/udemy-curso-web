import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";
import { ClienteService } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-create.component.html",
  styleUrls: ["./chamado-create.component.css"],
})
export class ChamadoCreateComponent implements OnInit {
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
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.clienteService.findAll().subscribe((rs) => {
      this.clientes = rs;
    });
    this.tecnicoService.findAll().subscribe((rs) => {
      this.tecnicos = rs;
    });
  }

  create(): void {
    this.chamdoService.create(this.chamado).subscribe({
      next: (rs) => this.toast.success("Chamado Criado com sucesso", "Create"),
      error: (e) => this.toast.error("Erro ao cadastrar chamado" + e.error),
      complete: () =>
        (this.chamado = {
          prioridade: "",
          status: "",
          titulo: "",
          observacoes: "",
          tecnico: "",
          cliente: "",
          nomeCliente: "",
          nomeTecnico: "",
        }),
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
}
