import { LoginFormController } from '../src/LoginForm';

describe('LoginFormController - Pruebas Unitarias', () => {
  let controller: LoginFormController;

  beforeEach(() => {
    controller = new LoginFormController();
    jest.restoreAllMocks();
  });

  // ----------------------------------------------------
  // TEST CASO 1: Validación local del formulario
  // ----------------------------------------------------
  it('debe fallar la validación si el email es inválido y la contraseña es muy corta', () => {
    controller.credentials.email = 'correo-invalido';
    controller.credentials.password = '123';

    const isValid = controller.validateForm();

    expect(isValid).toBe(false);
    expect(controller.errors.email).toBe('El formato del correo no es válido.');
    expect(controller.errors.password).toBe('La contraseña debe tener al menos 8 caracteres.');
  });

  it('debe pasar la validación si las credenciales cumplen con las reglas básicas', () => {
    controller.credentials.email = 'usuario@dominio.com';
    controller.credentials.password = 'passwordSeguro123';

    const isValid = controller.validateForm();

    expect(isValid).toBe(true);
    expect(Object.keys(controller.errors).length).toBe(0);
  });

  // ----------------------------------------------------
  // TEST CASO 2: Comportamiento del API Client
  // ----------------------------------------------------
  it('debe manejar correctamente un error 401 (Credenciales incorrectas) del servidor', async () => {
    controller.credentials.email = 'usuario@dominio.com';
    controller.credentials.password = 'passwordSeguro123';

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Credenciales inválidas.' }),
    });

    const mockEvent = { preventDefault: jest.fn() } as unknown as Event;

    await controller.handleSubmit(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(controller.isLoading).toBe(false); // Debe apagarse el spinner al terminar
    expect(controller.errors.apiError).toBe('Credenciales inválidas.');
  });
});
