import { RouterModule, Routes } from "@angular/router";
import { ListThoughtComponent } from "./list-thought.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: ListThoughtComponent
  }
]
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ListThoughtComponent]
})

export class ListThoughtRoutingModule { }
