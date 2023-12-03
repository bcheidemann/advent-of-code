import { Rectangle } from "./rectangle.ts";

export type NumberEntity = {
  type: "number";
  value: number;
  rect: Rectangle;
};

export type SymbolEntity = {
  type: "symbol";
  value: string;
  rect: Rectangle;
};

export type Entity = NumberEntity | SymbolEntity;

export type Position = { x: number; y: number };

export class Parser {
  private input: string[];
  public entities: Entity[] = [];

  constructor(
    input: string,
    private strategy: Strategy = new DefaultStrategy(),
    private x: number = 0,
    private y: number = 0,
  ) {
    this.input = input.split("\n");
  }

  public parse(): Entity[] {
    while (!this.isAtEnd()) {
      this.readToken();
    }
    return this.entities;
  }

  public readToken(): void {
    this.strategy.handleToken(this, this.input[this.y][this.x]);
  }

  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  public isAtEnd(): boolean {
    return this.y === this.input.length - 1 &&
      this.x === this.input[this.y].length - 1;
  }

  public advance(): void {
    if (this.x === this.input[this.y].length - 1) {
      this.x = 0;
      this.y++;
    } else {
      this.x++;
    }
  }

  public getPosition(): Position {
    return { x: this.x, y: this.y };
  }

  public getTokenAt(position: Position): string {
    return this.input[position.y][position.x];
  }
}

abstract class Strategy {
  abstract handleToken(parser: Parser, token: string): void;
}

class DefaultStrategy extends Strategy {
  handleToken(parser: Parser, token: string): void {
    switch (true) {
      case token === ".":
        parser.advance();
        break;
      case /\d/.test(token):
        parser.setStrategy(new NumberStrategy(parser.getPosition()));
        break;
      default:
        parser.setStrategy(new SymbolStrategy());
        break;
    }
  }
}

class NumberStrategy extends Strategy {
  private number = "";
  private endPosition: Position;
  constructor(
    private startPosition: Position,
  ) {
    super();
    this.endPosition = {
      x: startPosition.x + 1,
      y: startPosition.y + 1,
    };
  }

  handleToken(parser: Parser, token: string): void {
    switch (true) {
      case /\d/.test(token):
        this.handleDigit(parser, token);
        break;
      default:
        this.handleNonDigit(parser);
        break;
    }
  }

  handleDigit(parser: Parser, digit: string): void {
    if (parser.getPosition().y > this.startPosition.y) {
      parser.setStrategy(new DefaultStrategy());
      return;
    }
    this.number += digit;
    this.endPosition = {
      x: parser.getPosition().x + 1,
      y: parser.getPosition().y + 1,
    };
    parser.advance();
  }

  handleNonDigit(parser: Parser): void {
    parser.setStrategy(new DefaultStrategy());
    const rect = new Rectangle(
      this.startPosition.x,
      this.startPosition.y,
      this.endPosition.x - this.startPosition.x,
      this.endPosition.y - this.startPosition.y,
    );
    const entity: Entity = {
      type: "number",
      value: parseInt(this.number),
      rect,
    };
    parser.entities.push(entity);
  }
}

class SymbolStrategy extends Strategy {
  handleToken(parser: Parser, token: string): void {
    const rect = new Rectangle(
      parser.getPosition().x - 1,
      parser.getPosition().y - 1,
      3,
      3,
    );
    const entity: Entity = {
      type: "symbol",
      value: token,
      rect,
    };
    parser.entities.push(entity);
    parser.advance();
    parser.setStrategy(new DefaultStrategy());
  }
}
