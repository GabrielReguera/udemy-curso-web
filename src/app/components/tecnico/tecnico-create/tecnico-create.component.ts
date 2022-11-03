import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-create",
  templateUrl: "./tecnico-create.component.html",
  styleUrls: ["./tecnico-create.component.css"],
})
export class TecnicoCreateComponent implements OnInit {
  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.minLength(11));
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.tecnicoService.create(this.tecnico).subscribe({
      next: () => {
        this.toast.success("Técninco cadastrado com sucesso", "Cadastro");
        this.router.navigate(["tecnicos"]);
      },
      error: (e) => {
        if (e.error.errors) {
          e.error.errors.forEach((element) => {
            this.toast.error(element.message, "Error");
          });
        } else {
          this.toast.error(e.error.message);
        }
      },
    });
  }

  addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
