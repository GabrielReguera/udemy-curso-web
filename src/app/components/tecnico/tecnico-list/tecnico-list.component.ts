import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-list",
  templateUrl: "./tecnico-list.component.html",
  styleUrls: ["./tecnico-list.component.css"],
})
export class TecnicoListComponent implements OnInit {
  ELEMENT_DATA: Tecnico[] = [
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
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private tecnicoService: TecnicoService,
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
    this.tecnicoService.findAll().subscribe((rs) => {
      this.ELEMENT_DATA = rs;
      this.dataSource = new MatTableDataSource<Tecnico>(rs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(id: any): void {
    this.tecnicoService.delete(id).subscribe({
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
      complete: () =>
        (this.dataSource.data = this.dataSource.data.filter(
          (u: Tecnico) => u.id !== id
        )),
    });
  }
}
