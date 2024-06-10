function timeNumToString(num: number) {
  return num.toString().padStart(2, "0")
}

export class DisplayTime {
  private hours!: number;
  private minutes!: number;
  private seconds!: number;

  public hourString!: string;
  public minuteString!: string;
  public secondString!: string;

  constructor(time: number) {
    this.updateTimeValues(time);
  }

  getHours(): number {
    return this.hours;
  }

  getMinutes(): number {
    return this.minutes;
  }

  getSeconds(): number {
    return this.seconds;
  }

  private updateTimeValues(time: number): void {
    time = Math.max(0, time);  // Ensure time is non-negative
    this.hours = Math.floor(time / 3600000);
    this.minutes = Math.floor((time % 3600000) / 60000);
    this.seconds = Math.ceil((time % 60000) / 1000);
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;
    }
    if (this.minutes === 60) {
      this.minutes = 0;
      this.hours++;
    }
    this.updateTimeStrings();
  }

  private updateTimeStrings(): void {
    this.hourString = timeNumToString(this.hours);
    this.minuteString = timeNumToString(this.minutes);
    this.secondString = timeNumToString(this.seconds);
  }

  public toString(): string {
    return `${this.hours ? this.hourString + ':' : ''}${this.minuteString}:${this.secondString}`;
  }

  public getMS(): number {
    return (this.hours * 3600 + this.minutes * 60 + this.seconds) * 1000;
  }

  public setTimeComponent(component: "hours" | "minutes" | "seconds", value: number | string): void {
    if (component === "hours") {
      this.hours = typeof value === 'number' ? value : parseInt(value);
    } else if (component === "minutes") {
      this.minutes = typeof value === 'number' ? value : parseInt(value);
    } else if (component === "seconds") {
      this.seconds = typeof value === 'number' ? value : parseInt(value);
    }
    this.updateTimeStrings();
  }
}

export const displayTime = (time: number): string => {
  if ((!time) || time < 0) time = 0;
  const Time = new DisplayTime(time);
  return Time.toString();
}