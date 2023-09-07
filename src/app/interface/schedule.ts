export interface Schedule {
    name: string,
    local: string,
    professional: string,
    date: string,
    time: string,
    done: boolean,
    canceled: boolean,
    data: {
        weight: string,
        bf: string,
        weight_mass: string
    }
}