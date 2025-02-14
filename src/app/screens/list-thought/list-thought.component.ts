import { Component, OnInit } from '@angular/core';
import { Thinking } from '../../interfaces/thinking';
import { ThinkingService } from '../../services/thinking.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCommentSlash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ThoughtComponent } from '../../components/thought/thought.component';
import { LoadMoreButtonComponent } from "../../components/shared/load-more-button/load-more-button.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-thought',
  imports: [CommonModule, FormsModule, ThoughtComponent, RouterModule, FontAwesomeModule, LoadMoreButtonComponent],
  templateUrl: './list-thought.component.html',
})
export class ListThoughtComponent implements OnInit {
  listThought: Thinking[] = [];
  arrayFavorites: Thinking[] = [];
  favorites: boolean = false;
  currentPage: number = 1;
  haveMoreThought: boolean = true;
  filter: string = '';
  title: string = 'Meu Mural';
  icons = {
    filter: faMagnifyingGlass,
    commentSplash: faCommentSlash
  };

  constructor(private readonly service: ThinkingService) { }

  ngOnInit(): void {
    this.service.list(this.currentPage, this.filter, this.favorites).subscribe((listThought) => {
      this.listThought = listThought;
    });
  }

  loadMoreThoughts(): void {
    this.service.list(++this.currentPage, this.filter, this.favorites).subscribe((listThought) => {
      this.listThought.push(...listThought);
      if (!listThought.length) {
        this.haveMoreThought = false;
      }
    });
  }

  filterThoughts(): void {
    this.haveMoreThought = true;
    this.currentPage = 1;
    this.listThought = [];
    this.service.list(this.currentPage, this.filter, this.favorites).subscribe((listThought) => {
      this.listThought = listThought;
    });
  }

  reloadComponent(): void {
    this.title = 'Meu Mural';
    this.favorites = false;
    this.currentPage = 1;
    this.haveMoreThought = true;
    this.service.list(this.currentPage, this.filter, this.favorites).subscribe((listThought) => {
      this.listThought = listThought;
    });

  }

  listFavorites(): void {
    this.title = 'Meus Favoritos';
    this.favorites = true;
    this.currentPage = 1;
    this.haveMoreThought = true;
    this.service.list(this.currentPage, this.filter, this.favorites).subscribe((listFavorites) => {
      this.arrayFavorites = listFavorites;
      this.listThought = listFavorites;
    });
  }
}
