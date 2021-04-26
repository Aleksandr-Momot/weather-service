
export interface Country {
    city: string;
}

export interface Weather {
    LocalizedName: string;
    Temperature: number;
    Metric: number;
    Value: number;
    Unit: string;
    WeatherText: string;
    Key: string;
}

export interface WeatherFive {
    LocalizedName: string;
    DailyForecasts: any;
    Temperature: number;
    Metric: number;
    Value: number;
    Unit: string;
    WeatherText: string;
}


