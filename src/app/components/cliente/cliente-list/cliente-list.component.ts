import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-list",
  templateUrl: "./cliente-list.component.html",
  styleUrls: ["./cliente-list.component.css"],
})
export class ClienteListComponent implements OnInit {
  ELEMENT_DATA: Cliente[] = [
    {
      id: 1,
      nome: "vladimir",
      cpf: "123123123",
      email: "aaaa@a.com",
      senha: "1233212",
      perfis: ["0"],
      dataCriacao: "31/10/2022",
    },
  ];

  displayedColumns: string[] = ["id", "name", "progress", "fruit", "acoes"];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private clienteService: ClienteService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAll() {
    this.clienteService.findAll().subscribe((rs) => {
      this.ELEMENT_DATA = rs;
      this.dataSource = new MatTableDataSource<Cliente>(rs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(id: any): void {
    this.clienteService.delete(id).subscribe({
      next: () => {
        this.toast.success("Técninco Deletado com sucesso", "Delete");
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

}
