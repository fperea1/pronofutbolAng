import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuinielasComponent } from './quinielas.component';

describe('QuinielasComponent', () => {
  let component: QuinielasComponent;
  let fixture: ComponentFixture<QuinielasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuinielasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuinielasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
