export interface IPatient {
    id: number
    name: string
    cpf: string
    email: string
    dateOfBirth: Date
    gender: "MASCULINO" | "FEMININO"
    telephone: number
    height: number
    weight: number
    observation?: string
}
