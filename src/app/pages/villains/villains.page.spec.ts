import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VillainsPage } from './villains.page';

describe('VillainsPage', () => {
  let component: VillainsPage;
  let fixture: ComponentFixture<VillainsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
