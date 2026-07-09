import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit {
  logs: any[] = [];
  loading = false;
  error = '';
  selectedApi = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.loading = true;
    this.error = '';
    
    const request = this.selectedApi 
      ? this.apiService.getLogsByApiName(this.selectedApi)
      : this.apiService.getAllLogs();

    request.subscribe({
      next: (response) => {
        if (response.success) {
          this.logs = response.data || [];
        } else {
          this.error = response.message || 'Error al cargar logs';
        }
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error?.error || err?.error?.message;
        this.error = apiError
          ? `No se pudo cargar el historial: ${apiError}`
          : 'No se pudo conectar con el backend en el puerto 8081.';
        this.loading = false;
      }
    });
  }

  formatJson(value: unknown): string {
    if (!value) {
      return '';
    }

    if (typeof value !== 'string') {
      return JSON.stringify(value, null, 2);
    }

    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }
}
