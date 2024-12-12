import { nanoid } from 'nanoid';
import { useState, FC } from 'react';
import './App.css';
import Form from './components/Structure';
import Clock from './components/Watch';

interface ClockType {
  id: string;
  name: string;
  userTimezone: string;
}

const App: FC = () => {
  const [clocks, setClocks] = useState<ClockType[]>([]);

  const handleFormSubmit = (form: { name: string; userTimezone: string }): void => {
    setClocks((prevState) => [...prevState, {
      id: nanoid(),
      name: form.name,
      userTimezone: form.userTimezone,
    }]);
  };

  const getClockIndex = (id: string): number => {
    const index = clocks.findIndex((clock) => clock.id === id);
    return index;
  };

  const handleDeleteClick = (id: string): void => {
    const index = getClockIndex(id);
    const updatedClocks = [
      ...clocks.slice(0, index),
      ...clocks.slice(index + 1),
    ];
    setClocks(updatedClocks);
  };

  return (
    <div className="App-container">
      <Form onFormSubmit={handleFormSubmit} />
      <div className="App-clocks-container">
        {clocks.map((clock) => {
          return (
            <Clock
              key={clock.id}
              id={clock.id}
              name={clock.name}
              userTimezone={clock.userTimezone}
              onDeleteClick={handleDeleteClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;