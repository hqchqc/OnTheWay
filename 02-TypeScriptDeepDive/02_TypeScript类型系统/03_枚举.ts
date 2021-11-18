enum CardSuit {
  Clubs,
  Diamonds,
  Hearts,
  Spades,
}

let Card = CardSuit.Clubs;

// Card = "hello"; // Error: string 不能赋值给 `CardSuit` 类型
// 这些枚举都是数组类型，因此被称为数字类型枚举

enum Color {
  Red = 9,
  Green,
  Blue,
}

let col = Color.Red;
col = 0; // 有效的，这也是 Color.Red

enum AnimalFlags {
  None = 0,
  HasClaws = 1 << 0,
  CanFly = 1 << 1,
}

interface Animal {
  flags: AnimalFlags;
  [key: string]: any;
}

function printAnimalAbilities(animal: Animal) {
  let animalFlags = animal.flags;

  if (animalFlags & AnimalFlags.HasClaws) {
    console.log("animal has claws");
  }

  if (animalFlags & AnimalFlags.CanFly) {
    console.log("animal has can fly");
  }

  if (animalFlags & AnimalFlags.None) {
    console.log("nothing");
  }
}

let animal = {
  flags: AnimalFlags.None,
};

printAnimalAbilities(animal); // nothing

animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws

animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing

animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly

export enum EvidenceTypeEnum {
  UNKNOWN = "",
  PASSPORT_VISA = "passport_visa",
  PASSPORT = "passport",
  SIGHTED_STUDENT_CARD = "sighted_tertiary_edu_id",
  SIGHTED_KEYPASS_CARD = "sighted_keypass_card",
  SIGHTED_PROOF_OF_AGE_CARD = "sighted_proof_of_age_card",
}
const value = "passport" as EvidenceTypeEnum;

if (value === EvidenceTypeEnum.PASSPORT) {
  console.log(value);
}

const enum Tristate {
  False,
  True,
  Unkmown,
}

const lie = Tristate.False;
