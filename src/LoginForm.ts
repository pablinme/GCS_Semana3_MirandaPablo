import { LoginCredentials, FormErrors, LoginResponse } from './auth.types';

export class LoginFormController {
  public credentials: LoginCredentials = { email: '', password: '' };
  public errors: FormErrors = {};
  public isLoading: boolean = false;

  private apiUrl: string = 'https://tudominio.com';

  constructor() {}

  public validateForm(): boolean {
    this.errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.credentials.email) {
      this.errors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(this.credentials.email)) {
      this.errors.email = 'El formato del correo no es válido.';
    }

    if (!this.credentials.password) {
      this.errors.password = 'La contraseña es obligatoria.';
    } else if (this.credentials.password.length < 8) {
      this.errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    return Object.keys(this.errors).length === 0;
  }

  public async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.validateForm()) {
      this.renderErrors();
      return;
    }

    this.isLoading = true;
    this.updateLoadingState(true);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(this.credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales incorrectas u error en el servidor.');
      }

      const data: LoginResponse = await response.json();
      this.handleLoginSuccess(data);

    } catch (error: any) {
      this.errors.apiError = error.message || 'Error de conexión. Inténtalo de nuevo.';
      this.renderErrors();
    } finally {
      this.isLoading = false;
      this.updateLoadingState(false);
    }
  }

  private handleLoginSuccess(data: LoginResponse): void {
    console.log('Autenticación exitosa. Token recibido:', data.accessToken);
  }

  // Métodos auxiliares para interactuar con el DOM / Vista HTML
  private renderErrors(): void {
    console.warn('Errores del formulario activos:', this.errors);
  }

  private updateLoadingState(loading: boolean): void {
    console.log(`Cargando... [${loading}]`);
  }
}
