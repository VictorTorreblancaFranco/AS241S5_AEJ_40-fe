import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-instagram-transcript',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instagram-transcript.component.html',
  styleUrl: './instagram-transcript.component.css'
})
export class InstagramTranscriptComponent {
  videoUrl = '';
  language = '';
  loading = false;
  error = '';
  transcript = '';
  segments: string[] = [];

  constructor(private apiService: ApiService) {}

  getTranscript() {
    if (!this.videoUrl.trim()) {
      this.error = 'Por favor ingresa la URL de un Reel de Instagram';
      return;
    }

    this.loading = true;
    this.error = '';
    this.transcript = '';
    this.segments = [];

    this.apiService.getTranscript({ videoUrl: this.videoUrl, language: this.language }).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.transcript = response.data.transcript || 'No se encontro una transcripcion legible';
          this.segments = response.data.segments || [];
        } else {
          this.error = response.message || 'Error al transcribir el video';
        }
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error?.error || err?.error?.message;
        this.error = apiError
          ? `No se pudo transcribir el video: ${apiError}`
          : 'No se pudo conectar con el backend en el puerto 8081.';
        this.loading = false;
      }
    });
  }
}
