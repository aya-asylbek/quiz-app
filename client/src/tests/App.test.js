import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

vi.mock('./components/GameSetup', () => ({
  __esModule: true,
  default: () => <div>GameSetup Mock</div>,
}));

vi.mock('./components/GamePlay', () => ({
  __esModule: true,
  default: () => <div>GamePlay Mock</div>,
}));

vi.mock('./components/GameResult', () => ({
  __esModule: true,
  default: () => <div>GameResult Mock</div>,
}));

describe('App', () => {
  test('renders setup screen initially', () => {
    render(<App />);

    expect(screen.getByText('GameSetup Mock')).toBeInTheDocument();
  });

  test('transitions to play stage after clicking start game', async () => {
    const startGameMock = vi.fn();
    render(<App />);

    fireEvent.click(screen.getByText('Start Game'));  
    expect(startGameMock).toHaveBeenCalled();
  });

  test('renders GamePlay screen after starting the game', async () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Start Game')); 
    
    expect(screen.getByText('GamePlay Mock')).toBeInTheDocument();
  });
});
