import { ModelConfig, ModelBuilder, ModelType, ModelId } from "../types";

class ModelManager<T extends keyof ModelType> implements ModelBuilder<T> {
  private config: ModelConfig<T>;

  constructor(initialConfig?: ModelConfig<T>) {
    // Initial configuration
    this.config = initialConfig || {
      id: "" as ModelId, // Placeholder for ID
      type: "" as T, // Placeholder for type
      parameters: {} as ModelType[T], // Placeholder for parameters
      version: "1.0", // Default version
      metadata: {}, // Default empty metadata
    };
  }

  setId(id: ModelId): this {
    if (!id) {
      throw new Error("Invalid ID provided.");
    }

    this.config.id = id;
    return this;
  }

  setVersion(version: string): this {
    if (!version) {
      throw new Error("Invalid version provided.");
    }
    this.config.version = version;
    return this;
  }

  setParameters(params: ModelType[T]): this {
    if (!params) {
      throw new Error("Invalid parameters provided.");
    }
    this.config.parameters = params;
    return this;
  }

  addMetadata<K extends string, V>(key: K, value: V): this {
    if (!key) {
      throw new Error("Invalid metadata key provided.");
    }

    if (!this.config.metadata) {
      this.config.metadata = {};
    }

    this.config.metadata[key] = value;
    return this;
  }

  build(): ModelConfig<T> {
    return this.config;
  }
}

export default ModelManager;
