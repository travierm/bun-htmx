export class ServiceContainer {
  private services: Map<string, any> = new Map();

  public register<T>(name: string, service: T): void {
    this.services.set(name, service);
  }

  public resolve<T>(name: string): T {
    const service = this.services.get(name);

    if (!service) {
      throw new Error(`Service ${name} not found`);
    }

    return service as T;
  }
}
