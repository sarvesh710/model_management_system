import { ModelType, ModelEvent } from "../types";

class EventHandler<T extends keyof ModelType> {
  private listeners: {
    [K in ModelEvent<T>["eventType"]]?: ((event: ModelEvent<T>) => void)[];
  } = {};

  on(
    event: ModelEvent<T>["eventType"],
    callback: (event: ModelEvent<T>) => void
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  // Trigger an event and call all registered listeners
  trigger(event: ModelEvent<T>): void {
    if (!event || !event.eventType) {
      throw new Error("Invalid event data provided.");
    }

    const eventListeners = this.listeners[event.eventType];
    if (!eventListeners || eventListeners.length === 0) {
      console.warn(`No listeners registered for event: ${event.eventType}`);
      return;
    }

    eventListeners.forEach((callback) => callback(event));
  }
}

export default EventHandler;
