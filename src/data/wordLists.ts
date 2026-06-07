export type Theme =
  | 'animals'
  | 'countries'
  | 'sports'
  | 'fruits'
  | 'colors'
  | 'vehicles'
  | 'music'
  | 'space'
  | 'jobs'

export interface WordTheme {
  label: string
  words: string[]
}

export const wordThemes: Record<Theme, WordTheme> = {
  animals: {
    label: 'Animals',
    words: [
      'CAT', 'DOG', 'ELEPHANT', 'GIRAFFE', 'LION',
      'TIGER', 'BEAR', 'WOLF', 'FOX', 'RABBIT',
      'DUCK', 'ROOSTER', 'COW', 'HORSE', 'SNAKE',
      'EAGLE', 'FISH', 'DOLPHIN', 'WHALE', 'SHARK',
      'PENGUIN', 'PARROT', 'CROCODILE', 'CHEETAH', 'GORILLA',
      'KANGAROO', 'FLAMINGO', 'OCTOPUS', 'LOBSTER', 'PANTHER',
      'LEOPARD', 'PEACOCK', 'OWL', 'SPARROW', 'SALMON',
      'TURTLE', 'HEDGEHOG', 'JAGUAR', 'PANDA', 'ZEBRA',
    ],
  },
  countries: {
    label: 'Countries',
    words: [
      'BRAZIL', 'GERMANY', 'FRANCE', 'ITALY', 'SPAIN',
      'PORTUGAL', 'JAPAN', 'CHINA', 'INDIA', 'RUSSIA',
      'CANADA', 'MEXICO', 'CHILE', 'PERU', 'ARGENTINA',
      'NIGERIA', 'EGYPT', 'KENYA', 'GHANA', 'ANGOLA',
      'TURKEY', 'GREECE', 'SWEDEN', 'NORWAY', 'DENMARK',
      'FINLAND', 'BELGIUM', 'AUSTRIA', 'UKRAINE', 'POLAND',
      'COLOMBIA', 'VENEZUELA', 'BOLIVIA', 'ECUADOR', 'PARAGUAY',
      'ETHIOPIA', 'TANZANIA', 'SENEGAL', 'MOROCCO', 'CUBA',
    ],
  },
  sports: {
    label: 'Sports',
    words: [
      'SOCCER', 'BASKETBALL', 'VOLLEYBALL', 'TENNIS', 'SWIMMING',
      'CYCLING', 'BOXING', 'JUDO', 'KARATE', 'GOLF',
      'RUGBY', 'POLO', 'ROWING', 'SAILING', 'SURFING',
      'ATHLETICS', 'GYMNASTICS', 'FENCING', 'EQUESTRIAN', 'TRIATHLON',
      'ARCHERY', 'WRESTLING', 'SKIING', 'SNOWBOARD', 'HANDBALL',
      'BADMINTON', 'SQUASH', 'CRICKET', 'BASEBALL', 'HOCKEY',
      'SKATING', 'MARATHON', 'TAEKWONDO', 'CLIMBING', 'DIVING',
      'SHOOTING', 'WEIGHTLIFTING', 'PENTATHLON', 'LACROSSE', 'SOFTBALL',
    ],
  },
  fruits: {
    label: 'Fruits',
    words: [
      'APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'STRAWBERRY',
      'PINEAPPLE', 'MANGO', 'PAPAYA', 'GUAVA', 'CASHEW',
      'KIWI', 'MELON', 'WATERMELON', 'PEAR', 'PEACH',
      'CHERRY', 'LEMON', 'COCONUT', 'FIG', 'PLUM',
      'APRICOT', 'BLUEBERRY', 'RASPBERRY', 'BLACKBERRY', 'POMEGRANATE',
      'MANDARIN', 'TANGERINE', 'LYCHEE', 'AVOCADO', 'CRANBERRY',
      'PASSIONFRUIT', 'JACKFRUIT', 'DRAGONFRUIT', 'PERSIMMON', 'QUINCE',
      'MULBERRY', 'GOOSEBERRY', 'BOYSENBERRY', 'TAMARIND', 'STARFRUIT',
    ],
  },
  colors: {
    label: 'Colors',
    words: [
      'RED', 'BLUE', 'GREEN', 'YELLOW', 'ORANGE',
      'PURPLE', 'PINK', 'BROWN', 'BLACK', 'WHITE',
      'GRAY', 'CYAN', 'MAGENTA', 'VIOLET', 'INDIGO',
      'TURQUOISE', 'CRIMSON', 'SCARLET', 'MAROON', 'BEIGE',
      'TEAL', 'LAVENDER', 'CORAL', 'SILVER', 'GOLD',
      'IVORY', 'NAVY', 'OLIVE', 'SALMON', 'TAN',
      'AMBER', 'JADE', 'EMERALD', 'SAPPHIRE', 'RUBY',
      'BRONZE', 'COPPER', 'LILAC', 'PERIWINKLE', 'CHARTREUSE',
    ],
  },
  vehicles: {
    label: 'Vehicles',
    words: [
      'CAR', 'BUS', 'TRAIN', 'PLANE', 'BOAT',
      'SHIP', 'TRUCK', 'MOTORCYCLE', 'BICYCLE', 'HELICOPTER',
      'SUBMARINE', 'ROCKET', 'SCOOTER', 'TRAM', 'FERRY',
      'YACHT', 'AMBULANCE', 'TAXI', 'VAN', 'JEEP',
      'BULLDOZER', 'TRACTOR', 'TANKER', 'BLIMP', 'GLIDER',
      'CANOE', 'KAYAK', 'CATAMARAN', 'HOVERCRAFT', 'MONORAIL',
      'CABLE', 'GONDOLA', 'RICKSHAW', 'BUGGY', 'LIMOUSINE',
      'SKATEBOARD', 'SNOWMOBILE', 'PARAGLIDER', 'AIRSHIP', 'DRONE',
    ],
  },
  music: {
    label: 'Music',
    words: [
      'GUITAR', 'PIANO', 'VIOLIN', 'DRUMS', 'TRUMPET',
      'FLUTE', 'SAXOPHONE', 'CELLO', 'HARP', 'CLARINET',
      'TROMBONE', 'ACCORDION', 'BANJO', 'UKULELE', 'BASS',
      'KEYBOARD', 'OBOE', 'TUBA', 'MANDOLIN', 'HARMONICA',
      'XYLOPHONE', 'TAMBOURINE', 'TRIANGLE', 'MARIMBA', 'VIOLA',
      'SITAR', 'BAGPIPE', 'DULCIMER', 'LUTE', 'ZITHER',
      'CASTANETS', 'BONGOS', 'CYMBAL', 'RECORDER', 'PICCOLO',
      'FLUGELHORN', 'BASSOON', 'DIDGERIDOO', 'THEREMIN', 'BALALAIKA',
    ],
  },
  space: {
    label: 'Space',
    words: [
      'MOON', 'STAR', 'PLANET', 'COMET', 'GALAXY',
      'ASTEROID', 'NEBULA', 'SATELLITE', 'ROCKET', 'ORBIT',
      'MERCURY', 'VENUS', 'MARS', 'JUPITER', 'SATURN',
      'URANUS', 'NEPTUNE', 'PLUTO', 'SUPERNOVA', 'COSMOS',
      'ECLIPSE', 'METEOR', 'PULSAR', 'QUASAR', 'SOLAR',
      'GRAVITY', 'AURORA', 'CRATER', 'TELESCOPE', 'ASTRONAUT',
      'SHUTTLE', 'STATION', 'CAPSULE', 'LAUNCH', 'PROBE',
      'HORIZON', 'ZENITH', 'EQUINOX', 'SOLSTICE', 'WORMHOLE',
    ],
  },
  jobs: {
    label: 'Jobs',
    words: [
      'DOCTOR', 'NURSE', 'TEACHER', 'ENGINEER', 'LAWYER',
      'PILOT', 'CHEF', 'POLICE', 'SOLDIER', 'FARMER',
      'ARTIST', 'WRITER', 'SCIENTIST', 'ARCHITECT', 'PLUMBER',
      'CARPENTER', 'MECHANIC', 'FIREFIGHTER', 'JUDGE', 'DENTIST',
      'PHARMACIST', 'ACCOUNTANT', 'ECONOMIST', 'BIOLOGIST', 'CHEMIST',
      'PHYSICIST', 'SURGEON', 'THERAPIST', 'JOURNALIST', 'DIRECTOR',
      'PROGRAMMER', 'DESIGNER', 'ELECTRICIAN', 'LIBRARIAN', 'TRANSLATOR',
      'ASTRONOMER', 'GEOLOGIST', 'BOTANIST', 'ZOOLOGIST', 'PSYCHOLOGIST',
    ],
  },
}

export const themes = Object.keys(wordThemes) as Theme[]
