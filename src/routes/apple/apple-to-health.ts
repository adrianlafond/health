import type { Health, HealthError, User } from '$lib/types/health';
import type { AppleHealth, Me } from './apple-health.types';
import { parseString as parseXml } from 'xml2js'

/**
 * Converts an export XML file from Apple Health to a Health object.
 */
export async function appleToHealth(xml: string): Promise<Health | HealthError> {
  const json: AppleHealth | HealthError = await parseXmlToJson(xml)
  return 'error' in json ? json : {
    error: false,
    date: new Date(json.ExportDate[0].$.value),
    user: getUser(json.Me[0].$),
    bloodPressure: json.Correlation
      .filter(item => item.$.type === 'HKCorrelationTypeIdentifierBloodPressure')
      .map(item => ({
        date: new Date(item.$.creationDate),
        systolic: +(item.Record.find(record => record.$.type === 'HKQuantityTypeIdentifierBloodPressureSystolic')?.$.value || 0),
        diastolic: +(item.Record.find(record => record.$.type === 'HKQuantityTypeIdentifierBloodPressureDiastolic')?.$.value || 0),
      }))
  }
}

const gender = {
  HKBiologicalSexMale: 'male',
  HKBiologicalSexFemale: 'female',
  HKBiologicalSexOther: 'other'
} as const

const bloodType = {
  HKBloodTypeAPositive: 'A+',
  HKBloodTypeANegative: 'A-',
  HKBloodTypeBPositive: 'B+',
  HKBloodTypeBNegative: 'B-',
  HKBloodTypeABPositive: 'AB+',
  HKBloodTypeABNegative: 'AB-',
  HKBloodTypeOPositive: 'O+',
  HKBloodTypeONegative: 'O-'
} as const

// <Me HKCharacteristicTypeIdentifierDateOfBirth="1973-08-10"
// HKCharacteristicTypeIdentifierBiologicalSex="HKBiologicalSexMale"
// HKCharacteristicTypeIdentifierBloodType="HKBloodTypeANegative" HKCharacteristicTypeIdentifierFitzpatrickSkinType="HKFitzpatrickSkinTypeNotSet" HKCharacteristicTypeIdentifierCardioFitnessMedicationsUse="None"/>

function getUser(user: Me): User {
  const dob = user.HKCharacteristicTypeIdentifierDateOfBirth.split('-')
  return {
    dob: dob.length ? {
      year: +dob[0] || undefined,
      month: +dob[1] || undefined,
      date: +dob[2] || undefined,
    } : undefined,
    gender: gender[user.HKCharacteristicTypeIdentifierBiologicalSex],
    bloodType: bloodType[user.HKCharacteristicTypeIdentifierBloodType],
  }
}

function parseXmlToJson(xml: string): Promise<AppleHealth | HealthError> {
  let errorMessage = 'XML could not be transformed'
  return new Promise((resolve) => {
    try {
      parseXml(xml, (error: Error | null, json: { HealthData: AppleHealth }) => {
        errorMessage = error?.message || errorMessage
        if (error) {
          resolve({
            error: true,
            message: errorMessage
          })
        } else {
          resolve(json.HealthData)
        }
      })
    } catch {
      resolve({
        error: true,
        message: errorMessage
      })
    }
  })
}
