import { Testimonial } from '../types/global';
import { genericNames, genericLastNames, genericTexts } from '../data/genericTestimonialData'; // Updated import path

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomWeightGain = (): string => `+${Math.floor(Math.random() * 10) + 5}kg`; // +5kg to +14kg

const getRandomRating = (): number => {
  const rand = Math.random() * 100; // Generate a number between 0 and 100
  if (rand < 70) { // 70% chance for 5 stars
    return 5;
  } else if (rand < 70 + 25) { // 25% chance for 4 stars
    return 4;
  } else if (rand < 70 + 3) { // 3% chance for 3 stars
    return 3;
  } else { // 2% chance for 1 star
    return 1;
  }
};

// Helper function to format name as "Initial. Lastname"
export const formatNameInitialLastName = (fullName: string): string => {
  if (!fullName) return '';
  const parts = fullName.split(' ');
  if (parts.length > 1) {
    return `${parts[0][0]}. ${parts[parts.length - 1]}`;
  }
  return fullName; // Fallback if only one word
};

export const generateTestimonials = (count: number): Testimonial[] => {
  const generated: Testimonial[] = Array.from({ length: count }, (_, i) => {
    const nameObj = getRandomElement(genericNames); // genericNames still contains first names
    const lastNameHy = getRandomElement(genericLastNames.hy);
    const lastNameRu = getRandomElement(genericLastNames.ru);
    const lastNameEn = getRandomElement(genericLastNames.en);

    return {
      id: `generated-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 9)}`, // Unique ID for generated testimonials
      name: formatNameInitialLastName(`${nameObj.hy} ${lastNameHy}`),
      nameRu: formatNameInitialLastName(`${nameObj.ru} ${lastNameRu}`),
      nameEn: formatNameInitialLastName(`${nameObj.en} ${lastNameEn}`),
      image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`,
      rating: getRandomRating(),
      result: getRandomWeightGain(),
      textHy: getRandomElement(genericTexts).hy, // Pick a random text
      textRu: getRandomElement(genericTexts).ru,
      textEn: getRandomElement(genericTexts).en,
    };
  });

  return generated;
};