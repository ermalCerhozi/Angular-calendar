import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSceduleComponent } from './preview-scedule.component';

describe('PreviewSceduleComponent', () => {
  let component: PreviewSceduleComponent;
  let fixture: ComponentFixture<PreviewSceduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewSceduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewSceduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
