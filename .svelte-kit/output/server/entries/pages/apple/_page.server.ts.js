import { f as fail } from "../../../chunks/index.js";
import { parseString } from "xml2js";
async function appleToHealth(xml) {
  const json = await parseXmlToJson(xml);
  return {
    error: false,
    date: new Date(json.ExportDate[0].$.value),
    user: getUser(json.Me[0].$)
  };
}
const gender = {
  HKBiologicalSexMale: "male",
  HKBiologicalSexFemale: "female",
  HKBiologicalSexOther: "other"
};
const bloodType = {
  HKBloodTypeAPositive: "A+",
  HKBloodTypeANegative: "A-",
  HKBloodTypeBPositive: "B+",
  HKBloodTypeBNegative: "B-",
  HKBloodTypeABPositive: "AB+",
  HKBloodTypeABNegative: "AB-",
  HKBloodTypeOPositive: "O+",
  HKBloodTypeONegative: "O-"
};
function getUser(user) {
  const dob = user.HKCharacteristicTypeIdentifierDateOfBirth.split("-");
  return {
    dob: dob.length ? {
      year: +dob[0] || void 0,
      month: +dob[1] || void 0,
      date: +dob[2] || void 0
    } : void 0,
    gender: gender[user.HKCharacteristicTypeIdentifierBiologicalSex],
    bloodType: bloodType[user.HKCharacteristicTypeIdentifierBloodType]
  };
}
function parseXmlToJson(xml) {
  return new Promise((resolve, reject) => {
    try {
      parseString(xml, (error, json) => {
        if (error) {
          reject(error);
        } else {
          resolve(json.HealthData);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
const actions = {
  upload: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    const file = formData.file;
    if (!file.name || file.name === "undefined") {
      return fail(400, {
        error: true,
        message: "You need to upload a file, dumbass"
      });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const xml = buffer.toString("utf8");
    const data = await appleToHealth(xml);
    return { data };
  }
};
export {
  actions
};
