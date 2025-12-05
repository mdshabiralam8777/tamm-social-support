// profanity.ts
const BLOCK_WORDS = [
  // Common profanity (basic)
  "fuck",
  "fck",
  "fuk",
  "fuc",
  "fucking",
  "fucker",
  "motherfucker",
  "mf",
  "mofo",
  "shit",
  "sh1t",
  "sh!t",
  "shitt",
  "bullshit",
  "shitty",
  "bitch",
  "b1tch",
  "b!tch",
  "bitches",
  "bitching",
  "ass",
  "arse",
  "asshole",
  "arsehole",
  "asshat",
  "asswipe",
  "bastard",
  "bastards",
  "cunt",
  "c*nt",
  "c0nt",
  "cunts",
  "dick",
  "d1ck",
  "d!ck",
  "dickhead",
  "dicks",
  "pussy",
  "pussies",
  "puss",
  "puzzy",
  "cock",
  "c0ck",
  "c*ck",
  "cocks",
  "cocksucker",

  // Slurs and hate speech
  "nigger",
  "nigga",
  "n1gg",
  "n1gga",
  "n*gg",
  "n*gga",
  "niggas",
  "niggers",
  "fag",
  "faggot",
  "f@ggot",
  "fagg",
  "fagot",
  "retard",
  "retarded",
  "r3tard",
  "r*tard",
  "chink",
  "spic",
  "kike",
  "gook",
  "wetback",
  "tranny",
  "shemale",
  "ladyboy",

  // Sexual references
  "whore",
  "sex",
  "hoe",
  "ho",
  "slut",
  "skank",
  "hooker",
  "prostitute",
  "rape",
  "rapist",
  "raping",
  "raped",
  "pedo",
  "pedophile",
  "childmolester",
  "incest",
  "incestuous",
  "molest",
  "molester",

  // Derogatory terms
  "idiot",
  "moron",
  "imbecile",
  "stupid",
  "dumb",
  "dumbass",
  "retard",
  "fatso",
  "lardass",
  "obese",
  "fatass",
  "ugly",
  "hideous",
  "freak",
  "loser",
  "failure",
  "worthless",
  "scum",
  "trash",
  "garbage",
  "vermin",

  // Threatening/violent language
  "kill",
  "killing",
  "murder",
  "murderer",
  "die",
  "dying",
  "death",
  "stab",
  "stabbing",
  "shoot",
  "shooting",
  "gun",
  "guns",
  "suicide",
  "suicidal",
  "hang",
  "hanging",
  "rope",
  "beat",
  "beating",
  "attack",
  "attacking",
  "bomb",
  "explode",
  "terrorist",
  "terrorism",

  // Common bypass variations (leet speak)
  "@ss",
  "@$$",
  "4ss",
  "a$$",
  "a55",
  "4r5e",
  "5hit",
  "5h1t",
  "5h!t",
  "d1ck",
  "d!ck",
  "d!ckhead",
  "p0rn",
  "pr0n",
  "xxx",
  "wank",
  "wanker",
  "w4nk",
  "jerk",
  "jerkoff",
  "jerkoff",
  "tits",
  "titties",
  "boobs",
  "breasts",
  "boobies",

  // Common offensive phrases (partial)
  "suck my",
  "suck your",
  "suck his",
  "suck her",
  "lick my",
  "lick your",
  "eat my",
  "eat your",
  "blow me",
  "blow job",
  "go to hell",
  "burn in hell",
  "you suck",
  "you're dead",
  "i'll kill",

  // Regional/cultural variations
  "bloody",
  "bugger",
  "wanker",
  "tosser",
  "knob",
  "bellend",
  "twat",
  "berk",
  "git",
  "puta",
  "cabron",
  "coño",
  "mierda",
  "chinga",
  "scheiße",
  "arschloch",
  "hurensohn",
  "merde",
  "putain",
  "connard",
  "salope",
  "kurwa",
  "chuj",
  "pizda",

  // Additional strong profanity
  "scumbag",
  "douche",
  "douchebag",
  "douchecanoe",
  "screw",
  "screwing",
  "screwed",
  "bastard",
  "sonofabitch",
  "sob",
  "crap",
  "crappy",
  "craps",
  "damn",
  "goddamn",
  "damnit",
  "hell",
  "heck",
  "satan",
  "devil",
  "demon",

  // Numbers used as letters
  "4ss",
  "a55",
  "5hit",
  "5h1t",
  "d1ck",
  "d1ckhead",
  "f4ggot",
  "n1gg",
  "n1gga",
  "r3tard",
  "f4t",
  "l0ser",
  "m0ron",
  "h0e",
  "wh0re",
];

// Expanded detection function with better matching
export function containsAbusive(text: string): boolean {
  const lowered = text.toLowerCase().trim();

  // Remove common separators and normalize text
  const normalized = lowered
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ") // Replace punctuation with spaces
    .replace(/\s+/g, " ") // Normalize spaces
    .trim();

  // Check for whole word matches using word boundaries
  return BLOCK_WORDS.some((badWord) => {
    // Escape special regex characters in the bad word
    const escapedWord = badWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Use word boundary (\b) to match complete words only
    const regex = new RegExp(`\\b${escapedWord}\\b`, "i");
    return regex.test(normalized);
  });
}

// Alternative more aggressive detection function
export function containsAbusiveStrict(text: string): boolean {
  const lowered = text.toLowerCase();

  // Create patterns for common character substitutions
  const leetPatterns = [
    /[a@4][s$5]{2,}/gi, // ass variations
    /[s$5][h#]i[t7]/gi, // shit variations
    /[fF][uUvV@][cCkK]/gi, // fuck variations
    /[bB][i1!][tT7][cC][hH]/gi, // bitch variations
    /[nN][i1!]+[gG6]+[e3a@]?[rR]?/gi, // n-word variations
  ];

  // Check direct words
  if (BLOCK_WORDS.some((bad) => lowered.includes(bad))) return true;

  // Check leet patterns
  return leetPatterns.some((pattern) => pattern.test(lowered));
}
