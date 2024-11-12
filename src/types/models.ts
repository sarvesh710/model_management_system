// src/types/models.ts

// starter.ts// Branded types for type-safety
type Brand<K, T> = K & { __brand: T };
export type ModelId = Brand<string, "ModelId">;
export type DeploymentId = Brand<string, "DeploymentId">;
export type Metadata = { [key: string]: any }; // Flexible metadata definition

// Model type definitions
export type ModelType = {
  text: {
    maxTokens: number;
    temperature: number;
  };
  image: {
    width: number;
    height: number;
    format: "png" | "jpeg";
  };
  audio: {
    sampleRate: number;
    channels: number;
  };
};

// interface Implementation for ModelConfig
export interface ModelConfig<T extends keyof ModelType> {
  id: ModelId;
  type: T;
  parameters: ModelType[T];
  version: string; // Adds version tracking
  metadata?: Metadata; // Optional metadata for additional context
}

export interface ModelBuilder<T extends keyof ModelType> {
  setId(id: ModelId): this;
  setVersion(version: string): this;
  setParameters(params: ModelType[T]): this;
  addMetadata<K extends string, V>(key: K, value: V): this;
  build(): ModelConfig<T>;
}
