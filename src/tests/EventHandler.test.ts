import EventHandler from "../models/EventHandler";
import { ModelEvent, ModelType, ModelId, ModelConfig } from "../types";

// Mock data for testing
const mockConfig: ModelConfig<"text"> = {
  id: "model-1" as ModelId,
  type: "text",
  parameters: { maxTokens: 100, temperature: 0.7 },
  version: "1.0",
  metadata: { author: "AI Team" },
};

test("registers and triggers an event listener for 'deployment.started'", () => {
  const eventHandler = new EventHandler<"text">();
  const mockCallback = jest.fn();

  // Register the mock callback for 'deployment.started'
  eventHandler.on("deployment.started", mockCallback);

  // Trigger the 'deployment.started' event
  const event: ModelEvent<"text"> = {
    modelId: "model-1" as ModelId,
    eventType: "deployment.started",
    config: mockConfig,
    timestamp: new Date(),
  };
  eventHandler.trigger(event);

  // Ensure the callback was called once with the correct event data
  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(mockCallback).toHaveBeenCalledWith(event);
});

test("registers and triggers multiple listeners for the same event", () => {
  const eventHandler = new EventHandler<"text">();
  const mockCallback1 = jest.fn();
  const mockCallback2 = jest.fn();

  // Register two callbacks for 'deployment.started'
  eventHandler.on("deployment.started", mockCallback1);
  eventHandler.on("deployment.started", mockCallback2);

  // Trigger the 'deployment.started' event
  const event: ModelEvent<"text"> = {
    modelId: "model-1" as ModelId,
    eventType: "deployment.started",
    config: mockConfig,
    timestamp: new Date(),
  };
  eventHandler.trigger(event);

  // Ensure both callbacks were called once with the correct event data
  expect(mockCallback1).toHaveBeenCalledTimes(1);
  expect(mockCallback1).toHaveBeenCalledWith(event);
  expect(mockCallback2).toHaveBeenCalledTimes(1);
  expect(mockCallback2).toHaveBeenCalledWith(event);
});

test("does not call listeners for unregistered events", () => {
  const eventHandler = new EventHandler<"text">();
  const mockCallback = jest.fn();

  // Register the mock callback for 'deployment.started'
  eventHandler.on("deployment.started", mockCallback);

  // Trigger a different event 'deployment.finished'
  const finishedEvent: ModelEvent<"text"> = {
    modelId: "model-1" as ModelId,
    eventType: "deployment.finished",
    config: mockConfig,
    timestamp: new Date(),
  };
  eventHandler.trigger(finishedEvent);

  // Ensure the callback was not called since 'deployment.finished' was triggered, not 'deployment.started'
  expect(mockCallback).not.toHaveBeenCalled();
});

test("registers and triggers an 'error' event", () => {
  const eventHandler = new EventHandler<"text">();
  const mockCallback = jest.fn();

  eventHandler.on("error", mockCallback);

  const errorEvent: ModelEvent<"text"> = {
    modelId: "model-1" as ModelId,
    eventType: "error",
    config: mockConfig,
    timestamp: new Date(),
  };
  eventHandler.trigger(errorEvent);

  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(mockCallback).toHaveBeenCalledWith(errorEvent);
});

test("does not throw errors when triggering an event with no listeners", () => {
  const eventHandler = new EventHandler<"text">();

  const event: ModelEvent<"text"> = {
    modelId: "model-1" as ModelId,
    eventType: "deployment.started",
    config: mockConfig,
    timestamp: new Date(),
  };

  expect(() => eventHandler.trigger(event)).not.toThrow();
});
