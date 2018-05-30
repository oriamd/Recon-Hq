import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTargetDialogComponent } from './new-target-dialog.component';

describe('NewTargetDialogComponent', () => {
  let component: NewTargetDialogComponent;
  let fixture: ComponentFixture<NewTargetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTargetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTargetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
