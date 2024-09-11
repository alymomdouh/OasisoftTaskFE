import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLiveTodoComponent } from './list-live-todo.component';

describe('ListLiveTodoComponent', () => {
  let component: ListLiveTodoComponent;
  let fixture: ComponentFixture<ListLiveTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLiveTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListLiveTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
