import { ModelId, ModelConfig, ModelType } from "./models";

// Define an event type for model events with type-safe inference
export type ModelEvent<T extends keyof ModelType> = {
  modelId: ModelId;
  eventType: "deployment.started" | "deployment.finished" | "error";
  config: ModelConfig<T>;
  timestamp: Date;
};
