import { render, screen } from './test-utils';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('Renders correctly', () => {
    render(<App />);
    expect(screen.getByTestId('AuthScreen')).toBeInTheDocument();
  });

  it('Routing to login works correctly', () => {
    render(<App />);

    userEvent.click(screen.getByRole('button', { name: /Log In/i }));
    expect(
      screen.getByRole('heading', { name: /Log in/i })
    ).toBeInTheDocument();
  });

  it('Routing to signup works correctly', () => {
    render(<App />);

    userEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    expect(
      screen.getByRole('heading', { name: /Sign up/i })
    ).toBeInTheDocument();
  });

  it('Routing to home works correctly', () => {
    render(<App />, { isAuth: true, route: '/home' });
    expect(screen.getByRole('heading', { name: /Home/i })).toBeInTheDocument();
  });

  it('Login workflow', async () => {
    render(<App />, { route: '/login' });
    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    expect(submitBtn).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Log in/i })
    ).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/Email:/i), 'bob@gmail.com');
    userEvent.type(screen.getByLabelText(/Password:/i), 'bobob');
    userEvent.click(submitBtn);

    expect(
      await screen.findByRole('heading', { name: /Home/i })
    ).toBeInTheDocument();
  });

  it('Signup workflow', async () => {
    render(<App />, { route: '/signup' });
    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    expect(submitBtn).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Sign up/i })
    ).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/Username:/i), 'bobob');
    userEvent.type(screen.getByLabelText(/Email:/i), 'bob@gmail.com');
    userEvent.type(screen.getByLabelText(/Password:/i), 'bobob');
    userEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(
      await screen.findByRole('heading', { name: /Home/i })
    ).toBeInTheDocument();
  });
});
