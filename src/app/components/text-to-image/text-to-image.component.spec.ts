import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TextToImageComponent } from './text-to-image.component';

describe('TextToImageComponent', () => {
  let component: TextToImageComponent;
  let fixture: ComponentFixture<TextToImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextToImageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextToImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
