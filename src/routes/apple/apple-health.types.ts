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

// <Correlation type="HKCorrelationTypeIdentifierBloodPressure" sourceName="Beurer HealthCoach" sourceVersion="1.3.5.1" creationDate="2024-04-10 19:14:14 -0400" startDate="2023-07-23 09:24:00 -0400" endDate="2023-07-23 09:24:00 -0400">
// <MetadataEntry key="HKExternalUUID" value="IO009******MEA000021"/>
// <Record type="HKQuantityTypeIdentifierBloodPressureSystolic" sourceName="Beurer HealthCoach" sourceVersion="1.3.5.1" unit="mmHg" creationDate="2024-04-10 19:14:14 -0400" startDate="2023-07-23 09:24:00 -0400" endDate="2023-07-23 09:24:00 -0400" value="113">
//  <MetadataEntry key="HKExternalUUID" value="IO009******MEA000021"/>
// </Record>
// <Record type="HKQuantityTypeIdentifierBloodPressureDiastolic" sourceName="Beurer HealthCoach" sourceVersion="1.3.5.1" unit="mmHg" creationDate="2024-04-10 19:14:14 -0400" startDate="2023-07-23 09:24:00 -0400" endDate="2023-07-23 09:24:00 -0400" value="66">
//  <MetadataEntry key="HKExternalUUID" value="IO009******MEA000021"/>
// </Record>
// </Correlation>

// <Record type="HKQuantityTypeIdentifierHeight" sourceName="Health" sourceVersion="12.2" unit="ft" creationDate="2019-04-20 21:15:57 -0400" startDate="2019-04-20 21:15:57 -0400" endDate="2019-04-20 21:15:57 -0400" value="5.33333"/>

export interface AppleHealth {
  ExportDate: { $: ExportDate }[]
  Me: { $: Me }[]
  Correlation: {
    $: {
      type: 'HKCorrelationTypeIdentifierBloodPressure'
      creationDate: string
    }
    Record: {
      $: {
        type: 'HKQuantityTypeIdentifierBloodPressureSystolic' | 'HKQuantityTypeIdentifierBloodPressureDiastolic'
        value: string | number
      }
    }[]
  }[]
}
