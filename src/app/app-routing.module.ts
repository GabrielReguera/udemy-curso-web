import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { TecnicoListComponent } from "./components/tecnico/tecnico-list/tecnico-list.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "tecnicos", component: TecnicoListComponent },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
