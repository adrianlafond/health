export interface ExportDate {
  value: string;
}

export interface Me {
  HKCharacteristicTypeIdentifierDateOfBirth: string
  HKCharacteristicTypeIdentifierBiologicalSex:
    | 'HKBiologicalSexMale'
    | 'HKBiologicalSexFemale'
    | 'HKBiologicalSexOther'
  HKCharacteristicTypeIdentifierBloodType:
    | 'HKBloodTypeAPositive'
    | 'HKBloodTypeANegative'
    | 'HKBloodTypeBPositive'
    | 'HKBloodTypeBNegative'
    | 'HKBloodTypeABPositive'
    | 'HKBloodTypeABNegative'
    | 'HKBloodTypeOPositive'
    | 'HKBloodTypeONegative'
}

export interface AppleHealth {
  ExportDate: { $: ExportDate }[]
  Me: { $: Me }[]
}
