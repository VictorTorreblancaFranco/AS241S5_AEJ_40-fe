import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-text-to-image',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-to-image.component.html',
  styleUrl: './text-to-image.component.css'
})
export class TextToImageComponent {
  prompt = '';
  styleId = 4;
  size = '1-1';
  loading = false;
  error = '';
  successMessage = '';
  images: string[] = [];

  constructor(private apiService: ApiService) {}

  generateImage() {
    if (!this.prompt.trim()) {
      this.error = 'Por favor ingresa un prompt';
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';
    this.images = [];

    const request = {
      prompt: this.prompt,
      styleId: this.styleId,
      size: this.size
    };

    this.apiService.generateImage(request).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.successMessage = response.message || 'Imagen generada exitosamente';
          
          if (response.data.images && Array.isArray(response.data.images)) {
            this.images = response.data.images;
          } else {
            this.error = 'La API respondió pero no devolvió URLs de imágenes';
          }
        } else {
          this.error = response.message || 'Error al generar la imagen';
        }
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error?.error || err?.error?.message;
        this.error = apiError
          ? `No se pudo generar la imagen: ${apiError}`
          : 'No se pudo conectar con el backend en el puerto 8081.';
        this.loading = false;
      }
    });
  }

  downloadImage(imageUrl: string, index: number) {
    window.open(imageUrl, '_blank');
  }

  onImageError(imageUrl: string, index: number) {
    console.error(`Error cargando imagen ${index + 1}: ${imageUrl}`);
  }
}
