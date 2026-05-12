
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
  'look': {
    text: "Foxy sees something! Look! A magic butterfly!",
    emoji: "🦊🦋",
    question: "Can you find it? Look!",
    actionInstruction: "Tap the word 'look'!",
    type: 'spot'
  },
  'here': {
    text: "We are at the garden. It is here! Look here!",
    emoji: "🌈🌻",
    question: "Is it here? Yes!",
    actionInstruction: "Tap the word 'here'!",
    type: 'find'
  },
  'go': {
    text: "The butterfly is flying! We must go! Let's go!",
    emoji: "💨🦊",
    question: "Are you ready? Go!",
    actionInstruction: "Tap the word 'go'!",
    type: 'race'
  }
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
    'make': ['m', 'a', 'k', 'e']
  };
  return patterns[word.toLowerCase()] || word.split('');
};
