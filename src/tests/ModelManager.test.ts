import ModelManager from "../models/ModelManager";
import { ModelConfig, ModelType, ModelId } from "../types";

test("initializes ModelManager with default values if no initial configuration is provided", () => {
  const manager = new ModelManager<"text">();
  const config = manager.build();

  expect(config.id).toBe("");
  expect(config.type).toBe("");
  expect(config.version).toBe("1.0");
  expect(config.parameters).toEqual({});
  expect(config.metadata).toEqual({});
});

test("sets an ID using setId", () => {
  const manager = new ModelManager<"text">();
  manager.setId("model-123" as ModelId);
  const config = manager.build();

  expect(config.id).toBe("model-123");
});

test("throws an error when setting an invalid ID", () => {
  const manager = new ModelManager<"text">();
  expect(() => manager.setId("" as ModelId)).toThrow("Invalid ID provided.");
});

test("sets a version using setVersion", () => {
  const manager = new ModelManager<"text">();
  manager.setVersion("2.0");
  const config = manager.build();

  expect(config.version).toBe("2.0");
});

test("throws an error when setting an invalid version", () => {
  const manager = new ModelManager<"text">();
  expect(() => manager.setVersion("")).toThrow("Invalid version provided.");
});

test("sets parameters using setParameters", () => {
  const manager = new ModelManager<"text">();
  const parameters = { maxTokens: 100, temperature: 0.7 };
  manager.setParameters(parameters);
  const config = manager.build();

  expect(config.parameters).toEqual(parameters);
});

test("throws an error when setting invalid parameters", () => {
  const manager = new ModelManager<"text">();
  expect(() =>
    manager.setParameters(null as unknown as ModelType["text"])
  ).toThrow("Invalid parameters provided.");
});

test("adds metadata using addMetadata", () => {
  const manager = new ModelManager<"text">();
  manager.addMetadata("author", "AI Team");
  manager.addMetadata("purpose", "Chatbot");

  const config = manager.build();
  expect(config.metadata).toEqual({
    author: "AI Team",
    purpose: "Chatbot",
  });
});

test("initializes ModelManager with a provided initial configuration", () => {
  const initialConfig: ModelConfig<"text"> = {
    id: "model-1" as ModelId,
    type: "text",
    parameters: { maxTokens: 200, temperature: 0.8 },
    version: "1.1",
    metadata: { createdBy: "Developer" },
  };

  const manager = new ModelManager<"text">(initialConfig);
  const config = manager.build();

  expect(config).toEqual(initialConfig);
});

test("overwrites metadata when the same key is added", () => {
  const manager = new ModelManager<"text">();
  manager.addMetadata("author", "AI Team");
  manager.addMetadata("author", "Updated Team");

  const config = manager.build();
  expect(config.metadata).toEqual({
    author: "Updated Team",
  });
});
