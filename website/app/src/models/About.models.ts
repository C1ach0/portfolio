
export interface ICS {
    status: string;
    from: string;
    start: string;
    end?: string;
    description: string;
    link?: string;
}

export interface AboutAll {
    links: {
        [key: string]: string|null;
    };
    devYearsStart: string;
    skills: string[];
    careers: ICS[];
    schools: ICS[];
}