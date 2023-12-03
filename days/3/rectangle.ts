export class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
  ) {}

  intersects(rect: Rectangle): boolean {
    const y1 = this.y;
    const y2 = rect.y;

    const x1 = this.x;
    const x2 = rect.x;

    const h1 = this.height;
    const h2 = rect.height;

    const w1 = this.width;
    const w2 = rect.width;

    return (
      y2 + h2 - y1 > 0 &&
      y2 - y1 - h1 < 0 &&
      x2 + w2 - x1 > 0 &&
      x2 - x1 - w1 < 0
    );
  }
}
