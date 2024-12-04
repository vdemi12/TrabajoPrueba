import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeasonsPage } from './seasons.page';

describe('SeasonsPage', () => {
  let component: SeasonsPage;
  let fixture: ComponentFixture<SeasonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
