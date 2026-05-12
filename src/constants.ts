
export interface StorySegment {
  id: string;
  word: string;
  text: string;
  emoji: string;
  question: string;
  actionInstruction: string;
  type: 'spot' | 'race' | 'find';
}

export const SIGHT_WORDS_BY_LEVEL: Record<string, string[]> = {
  'Level 1 (Age 5)': [
    'a', 'I', 'am', 'and', 'are', 'at', 'be', 'big', 'blue', 'can', 'come', 'dad', 'do', 'down', 'for', 'funny', 
    'go', 'has', 'have', 'he', 'here', 'in', 'is', 'it', 'jump', 'little', 'look', 'me', 'mom', 'my', 'not', 
    'on', 'one', 'play', 'red', 'run', 'said', 'see', 'she', 'the', 'three', 'to', 'two', 'up', 'we', 'where', 
    'yellow', 'you', 'yes'
  ],
  'Level 2 (Age 6)': [
    'after', 'again', 'all', 'an', 'any', 'as', 'ask', 'away', 'because', 'been', 'before', 'best', 'both', 'boy', 
    'by', 'call', 'came', 'could', 'day', 'did', 'eat', 'find', 'first', 'from', 'girl', 'give', 'going', 'good', 
    'had', 'help', 'her', 'him', 'his', 'how', 'just', 'know', 'like', 'live', 'long', 'made', 'make', 'many', 
    'new', 'no', 'now', 'of', 'off', 'old', 'once', 'open', 'or', 'our', 'out', 'over', 'put', 'ran', 'ride', 
    'saw', 'say', 'school', 'some', 'stop', 'take', 'tell', 'than', 'that', 'them', 'then', 'there', 'they', 
    'think', 'this', 'too', 'under', 'use', 'very', 'walk', 'want', 'was', 'well', 'went', 'what', 'when', 
    'white', 'who', 'will', 'with', 'would', 'your'
  ],
  'Level 3 (Age 7)': [
    'always', 'around', 'better', 'bring', 'carry', 'clean', 'cut', 'done', 'draw', 'drink', 'eight', 'every', 
    'fall', 'far', 'fast', 'full', 'found', 'fly', 'grow', 'hold', 'hot', 'hurt', 'keep', 'kind', 'laugh', 
    'light', 'much', 'myself', 'never', 'only', 'own', 'pick', 'pretty', 'pull', 'read', 'right', 'seven', 
    'shall', 'show', 'six', 'small', 'start', 'ten', 'today', 'together', 'try', 'warm', 'wish', 'work', 'write'
  ],
  'Level 4 (Age 8)': [
    'across', 'against', 'answer', 'anything', 'beautiful', 'begin', 'build', 'busy', 'careful', 'children', 
    'different', 'early', 'earth', 'example', 'family', 'friend', 'important', 'knew', 'listen', 'money', 
    'morning', 'number', 'people', 'picture', 'ready', 'remember', 'sentence', 'sometimes', 'though', 'through', 
    'together', 'usually', 'woman', 'women', 'young'
  ]
};

export const STORY_TEMPLATES: Record<string, Omit<StorySegment, 'word' | 'id'>> = {
  'a': { text: "Peppa jumps in a muddy puddle.", emoji: "🐷💦", question: "Can you find 'a'?", actionInstruction: "Tap the word 'a'!", type: 'spot' },
  'I': { text: "I am Peppa Pig.", emoji: "🐷👋", question: "Where is 'I'?", actionInstruction: "Tap the word 'I'!", type: 'spot' },
  'am': { text: "I am playing with George.", emoji: "🐷🦖", question: "Find 'am'!", actionInstruction: "Tap the word 'am'!", type: 'spot' },
  'and': { text: "Peppa and George love spaghetti.", emoji: "🍝🐷", question: "Find 'and'!", actionInstruction: "Tap the word 'and'!", type: 'spot' },
  'are': { text: "Look, we are at the playgroup!", emoji: "🏫🐷", question: "Where is 'are'?", actionInstruction: "Tap the word 'are'!", type: 'spot' },
  'at': { text: "Suzy Sheep is at the door.", emoji: "🐏🏠", question: "Find 'at'!", actionInstruction: "Tap the word 'at'!", type: 'spot' },
  'be': { text: "It is fun to be a doctor.", emoji: "🩺🐷", question: "Find 'be'!", actionInstruction: "Tap the word 'be'!", type: 'spot' },
  'big': { text: "Daddy Pig has a big tummy.", emoji: "🐷🥣", question: "Where is 'big'?", actionInstruction: "Tap the word 'big'!", type: 'spot' },
  'blue': { text: "George has a blue dinosaur.", emoji: "🦖💙", question: "Find 'blue'!", actionInstruction: "Tap the word 'blue'!", type: 'spot' },
  'can': { text: "Can you jump really high like Peppa?", emoji: "🐷⬆️", question: "Find 'can'!", actionInstruction: "Tap the word 'can'!", type: 'spot' },
  'come': { text: "Come and play in the garden!", emoji: "🏡🐷", question: "Find 'come'!", actionInstruction: "Tap the word 'come'!", type: 'spot' },
  'dad': { text: "Peppa loves her dad very much.", emoji: "👨‍👩‍👧‍👦🐷", question: "Where is 'dad'?", actionInstruction: "Tap the word 'dad'!", type: 'spot' },
  'do': { text: "What do you like to play?", emoji: "🪁🐷", question: "Find 'do'!", actionInstruction: "Tap the word 'do'!", type: 'spot' },
  'down': { text: "Slide down the big red slide!", emoji: "🛝🐷", question: "Find 'down'!", actionInstruction: "Tap the word 'down'!", type: 'spot' },
  'for': { text: "This cake is for Granny Pig.", emoji: "🎂🐷", question: "Find 'for'!", actionInstruction: "Tap the word 'for'!", type: 'spot' },
  'funny': { text: "Daddy Pig is very funny.", emoji: "😂🐷", question: "Find 'funny'!", actionInstruction: "Tap the word 'funny'!", type: 'spot' },
  'go': { text: "We go to the park every day.", emoji: "🌳🐷", question: "Find 'go'!", actionInstruction: "Tap the word 'go'!", type: 'spot' },
  'has': { text: "George has his favorite toy.", emoji: "🧸🐷", question: "Find 'has'!", actionInstruction: "Tap the word 'has'!", type: 'spot' },
  'have': { text: "We have fun in the rain.", emoji: "🌧️🐷", question: "Find 'have'!", actionInstruction: "Tap the word 'have'!", type: 'spot' },
  'he': { text: "He is my little brother.", emoji: "👦🐷", question: "Find 'he'!", actionInstruction: "Tap the word 'he'!", type: 'spot' },
  'here': { text: "Look, the ice cream van is here!", emoji: "🍦🐷", question: "Find 'here'!", actionInstruction: "Tap the word 'here'!", type: 'spot' },
  'in': { text: "The ducks live in the pond.", emoji: "🦆💧", question: "Find 'in'!", actionInstruction: "Tap the word 'in'!", type: 'spot' },
  'is': { text: "Everything is pink and happy.", emoji: "💖🐷", question: "Find 'is'!", actionInstruction: "Tap the word 'is'!", type: 'spot' },
  'it': { text: "I like it when it rains.", emoji: "☔🐷", question: "Find 'it'!", actionInstruction: "Tap the word 'it'!", type: 'spot' },
  'jump': { text: "Everyone loves to jump in puddles.", emoji: "🐷💦", question: "Find 'jump'!", actionInstruction: "Tap the word 'jump'!", type: 'spot' },
  'little': { text: "George is Peppa's little brother.", emoji: "👶🐷", question: "Find 'little'!", actionInstruction: "Tap the word 'little'!", type: 'spot' },
  'look': { text: "Look at the colorful rainbow!", emoji: "🌈🐷", question: "Find 'look'!", actionInstruction: "Tap the word 'look'!", type: 'spot' },
  'me': { text: "Follow me to the windy hill!", emoji: "🌬️🐷", question: "Find 'me'!", actionInstruction: "Tap the word 'me'!", type: 'spot' },
  'mom': { text: "Mummy Pig is very smart.", emoji: "👩‍🏫🐷", question: "Find 'mom'!", actionInstruction: "Tap the word 'mom'!", type: 'spot' },
  'my': { text: "Teddy is my best friend.", emoji: "🧸🐷", question: "Find 'my'!", actionInstruction: "Tap the word 'my'!", type: 'spot' },
  'not': { text: "It is not bedtime yet!", emoji: "⏰🐷", question: "Find 'not'!", actionInstruction: "Tap the word 'not'!", type: 'spot' },
  'on': { text: "Put on your yellow boots.", emoji: "👢🐷", question: "Find 'on'!", actionInstruction: "Tap the word 'on'!", type: 'spot' },
  'one': { text: "Peppa has one red balloon.", emoji: "🎈🐷", question: "Find 'one'!", actionInstruction: "Tap the word 'one'!", type: 'spot' },
  'play': { text: "Let's play music together!", emoji: "🎵🐷", question: "Find 'play'!", actionInstruction: "Tap the word 'play'!", type: 'spot' },
  'red': { text: "The car is bright red.", emoji: "🚗🐷", question: "Find 'red'!", actionInstruction: "Tap the word 'red'!", type: 'spot' },
  'run': { text: "Run to the top of the hill!", emoji: "🏃🐷", question: "Find 'run'!", actionInstruction: "Tap the word 'run'!", type: 'spot' },
  'said': { text: "Peppa said hello to her friends.", emoji: "🐷👋", question: "Find 'said'!", actionInstruction: "Tap the word 'said'!", type: 'spot' },
  'see': { text: "I can see the moon.", emoji: "🌙🐷", question: "Find 'see'!", actionInstruction: "Tap the word 'see'!", type: 'spot' },
  'she': { text: "She is wearing a beautiful dress.", emoji: "👗🐷", question: "Find 'she'!", actionInstruction: "Tap the word 'she'!", type: 'spot' },
  'the': { text: "The sun is shining bright.", emoji: "☀️🐷", question: "Find 'the'!", actionInstruction: "Tap the word 'the'!", type: 'spot' },
  'three': { text: "Peppa saw three little birds.", emoji: "🐦🐦🐦", question: "Find 'three'!", actionInstruction: "Tap the word 'three'!", type: 'spot' },
  'to': { text: "We walk to school every day.", emoji: "🏫🐷", question: "Find 'to'!", actionInstruction: "Tap the word 'to'!", type: 'spot' },
  'two': { text: "I have two ears.", emoji: "👂🐷", question: "Find 'two'!", actionInstruction: "Tap the word 'two'!", type: 'spot' },
  'up': { text: "Go up the stairs to bed.", emoji: "🪜🐷", question: "Find 'up'!", actionInstruction: "Tap the word 'up'!", type: 'spot' },
  'we': { text: "We love going on vacation.", emoji: "🏖️🐷", question: "Find 'we'!", actionInstruction: "Tap the word 'we'!", type: 'spot' },
  'where': { text: "Where is Mr. Dinosaur?", emoji: "🦖🐷", question: "Find 'where'!", actionInstruction: "Tap the word 'where'!", type: 'spot' },
  'yellow': { text: "Ducks have yellow beaks.", emoji: "🦆💛", question: "Find 'yellow'!", actionInstruction: "Tap the word 'yellow'!", type: 'spot' },
  'you': { text: "I like you very much.", emoji: "🧡🐷", question: "Find 'you'!", actionInstruction: "Tap the word 'you'!", type: 'spot' },
  'yes': { text: "Yes, I want more pancakes!", emoji: "🥞🐷", question: "Find 'yes'!", actionInstruction: "Tap the word 'yes'!", type: 'spot' },
  'after': { text: "Peppa takes a bath after jumping in mud.", emoji: "🛁🐷", question: "Find 'after'!", actionInstruction: "Tap the word 'after'!", type: 'spot' },
  'again': { text: "Let's play that game again!", emoji: "🎲🐷", question: "Find 'again'!", actionInstruction: "Tap the word 'again'!", type: 'spot' },
  'all': { text: "All of Peppa's friends came to the party.", emoji: "🥳🐷", question: "Find 'all'!", actionInstruction: "Tap the word 'all'!", type: 'spot' },
  'away': { text: "The balloon flew away into the sky.", emoji: "🎈☁️", question: "Find 'away'!", actionInstruction: "Tap the word 'away'!", type: 'spot' },
  'because': { text: "George is happy because he has his dinosaur.", emoji: "🦖🐷", question: "Find 'because'!", actionInstruction: "Tap the word 'because'!", type: 'spot' },
  'best': { text: "Suzy Sheep is Peppa's best friend.", emoji: "🐑🐷", question: "Find 'best'!", actionInstruction: "Tap the word 'best'!", type: 'spot' },
  'could': { text: "Peppa wished she could fly a plane.", emoji: "✈️🐷", question: "Find 'could'!", actionInstruction: "Tap the word 'could'!", type: 'spot' },
  'day': { text: "It is a very sunny day.", emoji: "☀️🐷", question: "Find 'day'!", actionInstruction: "Tap the word 'day'!", type: 'spot' },
  'eat': { text: "We love to eat chocolate cake.", emoji: "🍰🐷", question: "Find 'eat'!", actionInstruction: "Tap the word 'eat'!", type: 'spot' },
  'find': { text: "Help Peppa find her lost shoes.", emoji: "👟🐷", question: "Find 'find'!", actionInstruction: "Tap the word 'find'!", type: 'spot' },
  'first': { text: "Peppa was the first to finish the race.", emoji: "🏆🐷", question: "Find 'first'!", actionInstruction: "Tap the word 'first'!", type: 'spot' },
  'good': { text: "Grandpa Pig has a very good garden.", emoji: "🥬🐷", question: "Find 'good'!", actionInstruction: "Tap the word 'good'!", type: 'spot' },
  'help': { text: "Mummy Pig will help us bake cookies.", emoji: "🍪🐷", question: "Find 'help'!", actionInstruction: "Tap the word 'help'!", type: 'spot' },
  'how': { text: "Do you know how to whistle?", emoji: "😙🎶", question: "Find 'how'!", actionInstruction: "Tap the word 'how'!", type: 'spot' },
  'like': { text: "George and Peppa like to play outside.", emoji: "🌳🐷", question: "Find 'like'!", actionInstruction: "Tap the word 'like'!", type: 'spot' },
  'make': { text: "Let's make a house for the fairies.", emoji: "🧚🐷", question: "Find 'make'!", actionInstruction: "Tap the word 'make'!", type: 'spot' },
  'new': { text: "Peppa has a pair of new red shoes.", emoji: "👟🐷", question: "Find 'new'!", actionInstruction: "Tap the word 'new'!", type: 'spot' },
  'our': { text: "This is our favorite picnic spot.", emoji: "🧺🐷", question: "Find 'our'!", actionInstruction: "Tap the word 'our'!", type: 'spot' },
  'out': { text: "Look out of the window at the rain.", emoji: "🪟🌧️", question: "Find 'out'!", actionInstruction: "Tap the word 'out'!", type: 'spot' },
  'saw': { text: "Grandpa Pig saw a big pumpkin.", emoji: "🎃🐷", question: "Find 'saw'!", actionInstruction: "Tap the word 'saw'!", type: 'spot' },
  'school': { text: "We go to school on the school bus.", emoji: "🚌🏫", question: "Find 'school'!", actionInstruction: "Tap the word 'school'!", type: 'spot' },
  'some': { text: "Can I have some more orange juice?", emoji: "🧃🐷", question: "Find 'some'!", actionInstruction: "Tap the word 'some'!", type: 'spot' },
  'that': { text: "That is a very tall mountain.", emoji: "⛰️🐷", question: "Find 'that'!", actionInstruction: "Tap the word 'that'!", type: 'spot' },
  'there': { text: "There is Granny Pig's house!", emoji: "🏡🐷", question: "Find 'there'!", actionInstruction: "Tap the word 'there'!", type: 'spot' },
  'they': { text: "They are all going to the seaside.", emoji: "🏖️🐷", question: "Find 'they'!", actionInstruction: "Tap the word 'they'!", type: 'spot' },
  'this': { text: "This is my dinosaur, grrr!", emoji: "🦖🐷", question: "Find 'this'!", actionInstruction: "Tap the word 'this'!", type: 'spot' },
  'too': { text: "I want to jump in puddles too!", emoji: "🐷💦", question: "Find 'too'!", actionInstruction: "Tap the word 'too'!", type: 'spot' },
  'was': { text: "Yesterday was a very windy day.", emoji: "🌬️🐷", question: "Find 'was'!", actionInstruction: "Tap the word 'was'!", type: 'spot' },
  'well': { text: "Grand Daddy Dog is feeling very well.", emoji: "🐶👵", question: "Find 'well'!", actionInstruction: "Tap the word 'well'!", type: 'spot' },
  'went': { text: "We went to the zoo to see turtles.", emoji: "🐢🐷", question: "Find 'went'!", actionInstruction: "Tap the word 'went'!", type: 'spot' },
  'what': { text: "What is your favorite color?", emoji: "🎨🐷", question: "Find 'what'!", actionInstruction: "Tap the word 'what'!", type: 'spot' },
  'when': { text: "We laugh when Daddy Pig trips over.", emoji: "😂🐷", question: "Find 'when'!", actionInstruction: "Tap the word 'when'!", type: 'spot' },
  'will': { text: "It will be fun to visit the museum.", emoji: "🏛️🐷", question: "Find 'will'!", actionInstruction: "Tap the word 'will'!", type: 'spot' },
  'with': { text: "Playing with friends is the best.", emoji: "👯🐷", question: "Find 'with'!", actionInstruction: "Tap the word 'with'!", type: 'spot' },
  'work': { text: "Grandpa Pig is busy at work in the shed.", emoji: "🏚️🐷", question: "Find 'work'!", actionInstruction: "Tap the word 'work'!", type: 'spot' },
  'your': { text: "Please tidy up your toys, Peppa.", emoji: "🧸🐷", question: "Find 'your'!", actionInstruction: "Tap the word 'your'!", type: 'spot' },
};

export const STORY_DATA: StorySegment[] = [
  {
    id: 'intro',
    word: 'look',
    ...STORY_TEMPLATES['look']
  },
  {
    id: 'race-1',
    word: 'go',
    ...STORY_TEMPLATES['go']
  },
  {
    id: 'discovery-1',
    word: 'here',
    ...STORY_TEMPLATES['here']
  }
];

export const getPhonemes = (word: string): string[] => {
  // Simple fallback for unknown words: split by letter or common patterns
  const patterns: Record<string, string[]> = {
    'look': ['l', 'oo', 'k'],
    'here': ['h', 'e', 'r', 'e'],
    'go': ['g', 'o'],
    'see': ['s', 'ee'],
    'the': ['th', 'e'],
    'play': ['pl', 'ay'],
    'find': ['f', 'i', 'n', 'd'],
    'jump': ['j', 'u', 'm', 'p'],
    'make': ['m', 'a', 'k', 'e'],
    'down': ['d', 'ow', 'n'],
    'blue': ['bl', 'ue'],
    'three': ['thr', 'ee'],
    'said': ['s', 'ai', 'd'],
    'little': ['l', 'i', 'tt', 'le'],
    'yellow': ['y', 'e', 'll', 'ow'],
    'where': ['wh', 'e', 're'],
    'school': ['sch', 'oo', 'l'],
    'what': ['wh', 'a', 't'],
    'when': ['wh', 'e', 'n'],
    'with': ['w', 'i', 'th'],
    'they': ['th', 'ey'],
    'there': ['th', 'e', 're']
  };
  return patterns[word.toLowerCase()] || word.split('');
};
