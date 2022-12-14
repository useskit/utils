export declare function parseDate(date: string): Date;
export declare function isLeapYear(this: Date): boolean;
export declare function getFirstDateInMonth(this: Date): Date;
export declare function getLastDateInMonth(this: Date): Date;
export declare function getFirstDateInQuarter(this: Date): Date;
export declare function getLastDateInQuarter(this: Date): Date;
export declare function getDaysInMonth(this: Date): number;
export declare function addDate(this: Date, offset: number, unit: unitOfTime.All): Date;
export declare function subDate(this: Date, offset: number, unit: unitOfTime.All): Date;
export declare function setLocale(this: Date, locale: string): Date;
export declare function format(this: Date, fmt?: string): string;
