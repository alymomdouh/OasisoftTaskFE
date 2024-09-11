import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { LiveTodoService } from '../../services/live-todo.service';
import { LiveTodoModel } from '../../models/to-do';

@Component({
  selector: 'app-list-live-todo',
  standalone: true,
  imports: [TableModule, CommonModule],
  providers: [LiveTodoService],
  templateUrl: './list-live-todo.component.html',
  styleUrl: './list-live-todo.component.css'
})
export class ListLiveTodoComponent implements OnInit {
  liveToDoList!: LiveTodoModel[];
  constructor(private _liveTodoService: LiveTodoService) { }
  ngOnInit() {
    this._liveTodoService.GetListLiveToDo().subscribe((items) => (this.liveToDoList = items));
  }
}  
