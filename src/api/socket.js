let socket;

// Створюємо об'єкт-спостерігач
export const messageObserver = {
  handlers: [],

  // Додаємо обробник повідомлень
  subscribe(handler) {
    this.handlers.push(handler);
  },

  // Видаляємо обробник повідомлень
  unsubscribe(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  },

  // Викликаємо всі обробники повідомлень
  notify(message) {
    this.handlers.forEach((handler) => handler(message));
  },
};

export function setupSocket() {
  socket = new WebSocket('ws://localhost:3001');

  socket.onopen = () => {
    console.log('Підключено до вебсокета.');
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('message: ', message);
    messageObserver.notify(message);
  };

  socket.onclose = () => {
    console.log("З'єднання з вебсокетом закрите.");
  };
}

export function getSocket() {
  return socket;
}
