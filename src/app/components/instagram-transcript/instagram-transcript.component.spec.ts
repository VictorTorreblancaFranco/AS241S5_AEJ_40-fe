import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { InstagramTranscriptComponent } from './instagram-transcript.component';

describe('InstagramTranscriptComponent', () => {
  let component: InstagramTranscriptComponent;
  let fixture: ComponentFixture<InstagramTranscriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstagramTranscriptComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstagramTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
