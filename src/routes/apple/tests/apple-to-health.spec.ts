import { describe, it, expect } from 'vitest';
import { appleToHealth } from '../apple-to-health';

const testXmlStart = `
<?xml version="1.0" encoding="UTF-8"?>
<!-- HealthKit Export Version: 13 -->
<!DOCTYPE HealthData [
<!ELEMENT Record ((MetadataEntry|HeartRateVariabilityMetadataList)*)>
<!ATTLIST Record
  type          CDATA #REQUIRED
  unit          CDATA #IMPLIED
  value         CDATA #IMPLIED
  sourceName    CDATA #REQUIRED
  sourceVersion CDATA #IMPLIED
  device        CDATA #IMPLIED
  creationDate  CDATA #IMPLIED
  startDate     CDATA #REQUIRED
  endDate       CDATA #REQUIRED
>
<!-- Note: Any Records that appear as children of a correlation also appear as top-level records in this document. -->
<!ELEMENT Correlation ((MetadataEntry|Record)*)>
<!ATTLIST Correlation
  type          CDATA #REQUIRED
  sourceName    CDATA #REQUIRED
  sourceVersion CDATA #IMPLIED
  device        CDATA #IMPLIED
  creationDate  CDATA #IMPLIED
  startDate     CDATA #REQUIRED
  endDate       CDATA #REQUIRED
>
]>
<HealthData locale="en_US">
 <ExportDate value="2024-06-08 14:12:17 -0400"/>
 <Me HKCharacteristicTypeIdentifierDateOfBirth="1999-10-31" HKCharacteristicTypeIdentifierBiologicalSex="HKBiologicalSexMale" HKCharacteristicTypeIdentifierBloodType="HKBloodTypeANegative" HKCharacteristicTypeIdentifierFitzpatrickSkinType="HKFitzpatrickSkinTypeNotSet" HKCharacteristicTypeIdentifierCardioFitnessMedicationsUse="None"/>
`

const testXmlRecords = `
 <Record type="HKQuantityTypeIdentifierHeight" sourceName="Health" sourceVersion="12.2" unit="ft" creationDate="2019-04-20 21:15:57 -0400" startDate="2019-04-20 21:15:57 -0400" endDate="2019-04-20 21:15:57 -0400" value="6"/>
 <Record type="HKQuantityTypeIdentifierBodyMass" sourceName="Health" sourceVersion="16.5.1" unit="lb" creationDate="2023-07-23 10:35:40 -0400" startDate="2023-07-23 10:35:00 -0400" endDate="2023-07-23 10:35:00 -0400" value="200">
  <MetadataEntry key="HKWasUserEntered" value="1"/>
 </Record>
 <Record type="HKQuantityTypeIdentifierBodyMass" sourceName="Connect" sourceVersion="2" unit="lb" creationDate="2022-08-31 23:00:53 -0400" startDate="2022-08-31 00:00:00 -0400" endDate="2022-08-31 00:00:00 -0400" value="198"/>
 <Record type="HKQuantityTypeIdentifierBodyMass" sourceName="Health" sourceVersion="16.1.1" unit="lb" creationDate="2022-11-29 11:23:54 -0400" startDate="2022-11-29 11:23:00 -0400" endDate="2022-11-29 11:23:00 -0400" value="202">
  <MetadataEntry key="HKWasUserEntered" value="1"/>
 </Record>
 <Correlation type="HKCorrelationTypeIdentifierBloodPressure" sourceName="Beurer HealthCoach" sourceVersion="1.3.5.1" creationDate="2024-04-10 19:14:14 -0400" startDate="2023-07-23 09:24:00 -0400" endDate="2023-07-23 09:24:00 -0400">
  <MetadataEntry key="HKExternalUUID" value="IO009******MEA000021"/>
  <Record type="HKQuantityTypeIdentifierBloodPressureSystolic" sourceName="Beurer HealthCoach" sourceVersion="1.3.5.1" unit="mmHg" creationDate="2024-04-10 19:14:14 -0400" startDate="2023-07-23 09:24:00 -0400" endDate="2023-07-23 09:24:00 -0400" value="113">
   <MetadataEntry key="HKExternalUUID" value="IO009******MEA000021"/>
  </Record>
  <Record type="HKQuantityTypeIdentifierBloodPressureDiastolic" sourceName="Beurer HealthCoach" sourceVersion="1.3.5.1" unit="mmHg" creationDate="2024-04-10 19:14:14 -0400" startDate="2023-07-23 09:24:00 -0400" endDate="2023-07-23 09:24:00 -0400" value="66">
   <MetadataEntry key="HKExternalUUID" value="IO009******MEA000021"/>
  </Record>
 </Correlation>
 <Correlation type="HKCorrelationTypeIdentifierBloodPressure" sourceName="Health" sourceVersion="17.5.1" creationDate="2024-06-08 13:14:18 -0400" startDate="2024-06-08 13:14:00 -0400" endDate="2024-06-08 13:14:00 -0400">
  <MetadataEntry key="HKWasUserEntered" value="1"/>
  <Record type="HKQuantityTypeIdentifierBloodPressureDiastolic" sourceName="Health" sourceVersion="17.5.1" unit="mmHg" creationDate="2024-06-08 13:14:18 -0400" startDate="2024-06-08 13:14:00 -0400" endDate="2024-06-08 13:14:00 -0400" value="68">
   <MetadataEntry key="HKWasUserEntered" value="1"/>
  </Record>
  <Record type="HKQuantityTypeIdentifierBloodPressureSystolic" sourceName="Health" sourceVersion="17.5.1" unit="mmHg" creationDate="2024-06-08 13:14:18 -0400" startDate="2024-06-08 13:14:00 -0400" endDate="2024-06-08 13:14:00 -0400" value="97">
   <MetadataEntry key="HKWasUserEntered" value="1"/>
  </Record>
 </Correlation>
`

const testXmlEnd = `
</HealthData>
`

const testXml = `${testXmlStart}${testXmlRecords}${testXmlEnd}`

describe('appleToHealth()', () => {
  describe('error', () => {
    it('returns error as `false` when there is no error', async () => {
      const data = await appleToHealth(testXml)
      expect(data.error).toBe(false)
    })
    it('returns error as `true` when xml is invalid', async () => {
      const data = await appleToHealth('ERROR')
      expect(data.error).toBe(true)
      const message = data.error ? data.message : null
      expect(typeof message).toBe('string')
    })
  })
})
