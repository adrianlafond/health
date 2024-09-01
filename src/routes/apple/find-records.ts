import { parseString as parseXml } from 'xml2js'

// <!ATTLIST Record
//   type          CDATA #REQUIRED
//   unit          CDATA #IMPLIED
//   value         CDATA #IMPLIED
//   sourceName    CDATA #REQUIRED
//   sourceVersion CDATA #IMPLIED
//   device        CDATA #IMPLIED
//   creationDate  CDATA #IMPLIED
//   startDate     CDATA #REQUIRED
//   endDate       CDATA #REQUIRED
// >

export interface AppleHealthRecord {
  type: string;
  unit?: string;
  value?: string;
  sourceName: string;
  sourceVersion?: string;
  device?: string;
  creationDate?: string;
  startDate: string;
  endDate: string;
}

const healthTypeMap = {
  'blood-pressure': 'HKCorrelationTypeIdentifierBloodPressure',
  systolic: 'HKQuantityTypeIdentifierBloodPressureSystolic',
  diastolic: 'HKQuantityTypeIdentifierBloodPressureDiastolic',
};

export type HeathRecordType = keyof typeof healthTypeMap;

export function findRecords(xml: string, type: HeathRecordType): AppleHealthRecord[] | AppleHealthRecord[][] {
  parseXml(xml, (err: Error | null, result) => {
    console.log(result)
  })
  const records: AppleHealthRecord[] = []
  if (type === 'blood-pressure') {
    const match = xml.match(/(<Correlation(.*)>)/gi)
    if (match) {
      match.forEach(node => {
        const attrs = getAttributes(node)
        if (attrs.type === healthTypeMap['blood-pressure']) {
          findRecords(node, 'systolic')
        }
      })
    }
  } else if (type === 'systolic') {
    const match = xml.match(/(<Record(.*)>)/gi)
    if (match) {
      match.forEach(node => {
        const attrs = getAttributes<AppleHealthRecord>(node)
        // console.log(attrs);
        if (attrs.type === type) {
          records.push(attrs)
        }
      })
    }
  }
  return records
}

function getAttributes<T = { [key: string]: string }>(node: string): T {
  const result: { [key: string]: string } = {}
  const attrs = node.match(/\w+=".+?(?=")/gi)
  attrs?.forEach(attr => {
    const [key, value] = attr.split('="')
    result[key] = value
  })
  return result as T
}