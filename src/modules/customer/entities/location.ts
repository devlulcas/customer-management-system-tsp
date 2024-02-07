export class Location {
  constructor(public readonly x: number, public readonly y: number) {}

  // Calcula a distância entre duas localizações em um plano cartesiano usando o teorema de Pitágoras
  distanceTo(location: Location): number {
    return Math.sqrt(
      Math.pow(this.x - location.x, 2) + Math.pow(this.y - location.y, 2)
    );
  }

  toJSONSerializable() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
