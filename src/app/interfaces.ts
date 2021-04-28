
export interface Country {
    city: string;
}

export interface Weather {
    Temperature: number;
    Metric: number;
    Value: number;
    Unit: string;
    WeatherText: string;
    Key: string;
}

export interface WeatherFive {
    DailyForecasts: any;
    Temperature: number;
    Metric: number;
    Value: number;
    Unit: string;
    WeatherText: string;
}

export interface LocaleName {
    LocalizedName: string;
}

