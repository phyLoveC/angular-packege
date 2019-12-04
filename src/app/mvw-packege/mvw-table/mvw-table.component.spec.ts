import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvwTableComponent } from './mvw-table.component';

describe('MvwTableComponent', () => {
  let component: MvwTableComponent;
  let fixture: ComponentFixture<MvwTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvwTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvwTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
