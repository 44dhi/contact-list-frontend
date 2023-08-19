import { Contacts } from "./interfaces"


export const filterContactsByAlphabet = (contacts: Contacts[]) => {
  var firstLetterArray: any = []

  for(var i = 0; i < contacts.length; i++) {
    var firstLetter = contacts[i].first_name.charAt(0)

    if(!firstLetterArray.includes(firstLetter)) {
      firstLetterArray.push(firstLetter)
    }
  }

  return firstLetterArray.sort()
}