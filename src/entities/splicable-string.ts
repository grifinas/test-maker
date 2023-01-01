export interface Location {
  end: number;
  start: number;
}

interface Modifications extends Location {
  length: number;
  type: ModificationType;
}

enum ModificationType {
  Add,
  Remove,
  Replace,
}

export class SplicableString {
  private input: string;
  private modifications: Modifications[] = [];

  constructor(readonly original: string) {
    this.input = original;
  }

  add(content: string, from = 0): this {
    return this.splice({ start: from, end: from }, content);
  }

  remove(location: Location): this {
    return this.splice(location, '');
  }

  splice(location: Location, replace: string): this {
    const realLocation = this.resolveRealLocation(location);
    this.input =
      this.input.substring(0, realLocation.start) +
      replace +
      this.input.substring(realLocation.end);
    this.modifications.push({
      ...location,
      length: replace.length,
      type: this.resolveModificationType(location, replace),
    });
    return this;
  }

  result(): string {
    return this.input;
  }

  private resolveModificationType(
    location: Location,
    replace: string,
  ): ModificationType {
    if (location.start === location.end) {
      return ModificationType.Add;
    }

    return replace.length ? ModificationType.Replace : ModificationType.Remove;
  }

  private resolveRealLocation(location: Location): Location {
    const relevantModifications = this.modifications.filter((modification) => {
      switch (modification.type) {
        case ModificationType.Add:
          return modification.start <= location.start;
        case ModificationType.Remove:
        case ModificationType.Replace:
          return modification.start < location.end;
      }
    });

    const violatingChunk = relevantModifications.find((modification) => {
      if (modification.type === ModificationType.Remove) {
        return modification.end > location.start;
      }

      return (
        modification.start < location.start && modification.end > location.start
      );
    });

    if (violatingChunk) {
      throw new Error(`Violated Chunk ${JSON.stringify(violatingChunk)}`);
    }

    const offset = relevantModifications.reduce((acc: number, current) => {
      return acc + current.length - (current.end - current.start);
    }, 0);

    return {
      start: location.start + offset,
      end: location.end + offset,
    };
  }
}
