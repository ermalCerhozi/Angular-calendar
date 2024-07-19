import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSceduleComponent } from './edit-scedule.component';

describe('EditSceduleComponent', () => {
  let component: EditSceduleComponent;
  let fixture: ComponentFixture<EditSceduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSceduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSceduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
