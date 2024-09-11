import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TodoService } from '../../services/todo.service';
import { MessageService } from 'primeng/api';
import { ListToDo } from '../../models/to-do';
import { settings } from '../../../shared/Constants/settings';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-list-todo',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, DialogModule, FormsModule, ReactiveFormsModule, CheckboxModule, ToastModule],
  providers: [TodoService, MessageService],
  templateUrl: './list-todo.component.html',
  styleUrl: './list-todo.component.css'
})
export class ListTodoComponent implements OnInit {

  toDoList!: ListToDo[];
  pageSize = settings.pageSize;
  totalRecords = 0;
  constructor(
    private messageService: MessageService,
    private _todoService: TodoService,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit() {
    this.initializeListOptionForm();
    this.LoadData();
  }
  LoadData() {
    this._todoService.GetList().subscribe((items) => (this.toDoList = items));
  }
  showCreateFormDialog = false;
  showCreateForm() {
    this.showCreateFormDialog = true;
  }
  selectedItem?: ListToDo;
  showDeleteFormDialog = false;
  showdelete(item: ListToDo) {
    this.selectedItem = item;
    this.showDeleteFormDialog = true;
  }
  confirmDelete() {
    if (this.selectedItem != undefined && this.selectedItem.id) {
      this.showDeleteFormDialog = false;
      this._todoService.Delete(this.selectedItem.id).subscribe(
        {
          next: (value: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: "deleted Successfully", life: 3000 });
          },
          error: (err: any) => {
            this.messageService.add({ severity: 'warn', summary: "Error", detail: err.error, life: 3000 });
          }, complete: () => {
            this.selectedItem = undefined;
            this.LoadData();
          }
        }
      );
    }
  }
  showUpdateFormDialog = false;
  showUpdate(item: ListToDo) {
    this.selectedItem = item;
    this.showUpdateFormDialog = true;
    this.toDoForm.patchValue(this.selectedItem);
  }
  showDetailsFormDialog = false;
  showDetails(item: ListToDo) {
    this.selectedItem = item;
    this.toDoForm.patchValue(this.selectedItem);
    this.showDetailsFormDialog = true;
  }
  closeItem() {
    this.toDoForm.reset();
    this.showDetailsFormDialog = false;
    this.showUpdateFormDialog = false;
    this.showDeleteFormDialog = false;
    this.showCreateFormDialog = false;
    this.selectedItem = undefined;
  }

  toDoForm!: FormGroup;
  initializeListOptionForm() {
    this.toDoForm = this.formBuilder.group({
      title: ['', Validators.required],
      //userId: [0, Validators.required],
      completed: [false],
    });
  }
  get toDoFormControls() {
    return this.toDoForm.controls;
  }
  submittedtoDoForm = false;
  saveForm() {
    debugger
    this.submittedtoDoForm = true;
    if (this.toDoForm.invalid) {
      return;
    }
    if (this.selectedItem && this.selectedItem.id) {
      this._todoService.Update(this.selectedItem.id, this.toDoForm.value).subscribe({
        next: (value: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "updated Successfully", life: 3000 });
        },
        error: (err: any) => {
          this.messageService.add({ severity: 'warn', summary: "Error", detail: err.error, life: 3000 });
        }, complete: () => {
          this.closeItem();
          this.LoadData();
        }
      });
    }
    else {
      debugger
      this._todoService.Create(this.toDoForm.value).subscribe({
        next: (result: ListToDo) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "created Successfully", life: 3000 });
        },
        error: (err: any) => {
          this.messageService.add({ severity: 'warn', summary: "Error", detail: err.error, life: 3000 });
        }, complete: () => {
          this.closeItem();
          this.LoadData();
        }
      });
    }
  }
}
