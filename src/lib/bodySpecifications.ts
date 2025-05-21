// Body specifications with gender-aware options

export const bodySpecifications = {
  build: ['slim', 'athletic', 'average', 'muscular', 'petite', 'curvy', 'stocky', 'lean'],
  height: ['tall', 'average height', 'short', 'very tall', 'petite', 'specific height (e.g., 1.85m)'],
  details: ['detailed skin texture', 'smooth skin', 'weathered skin', 'glowing skin', 'sun-kissed skin', 'porcelain skin']
};

// Gender-specific physical features
export const physicalFeaturesByGender = {
  male: {
    hair: ['short dark hair', 'buzz cut', 'quiff', 'man bun', 'bald', 'receding hairline', 'beard', 'mustache', 'goatee', 'clean-shaven', 'salt-and-pepper beard', 'full beard', 'stubble'],
    build: ['muscular', 'athletic', 'lean', 'stocky', 'slim', 'broad-shouldered', 'tall', 'average build']
  },
  female: {
    hair: ['long blonde hair', 'short bob', 'curly hair', 'straight hair', 'pixie cut', 'braided hair', 'updo', 'ponytail', 'loose waves', 'bangs', 'shoulder-length', 'wavy hair'],
    build: ['slim', 'athletic', 'curvy', 'petite', 'tall', 'average build', 'hourglass', 'pear-shaped']
  },
  person: {
    hair: ['short hair', 'long hair', 'curly hair', 'straight hair', 'natural hair', 'styled hair', 'colorful hair'],
    build: ['slim', 'athletic', 'average', 'tall', 'short', 'unique build']
  }
};

// Gender-specific clothing options
export const clothingByGender = {
  male: {
    casual: ['t-shirt', 'jeans', 'hoodie', 'chinos', 'polo shirt', 'sweater', 'casual shirt'],
    formal: ['suit', 'blazer', 'dress shirt', 'tie', 'tuxedo', 'formal pants', 'vest'],
    accessories: ['watch', 'cap', 'sunglasses', 'belt', 'cufflinks']
  },
  female: {
    casual: ['dress', 'jeans', 'blouse', 'skirt', 'sweater', 'cardigan', 'casual top'],
    formal: ['evening gown', 'business suit', 'cocktail dress', 'formal blouse', 'blazer'],
    accessories: ['jewelry', 'handbag', 'scarf', 'heels', 'earrings', 'necklace']
  },
  person: {
    casual: ['clothing', 'comfortable outfit', 'casual wear', 'everyday clothes'],
    formal: ['formal attire', 'professional clothing', 'elegant outfit'],
    accessories: ['accessories', 'personal items']
  }
};