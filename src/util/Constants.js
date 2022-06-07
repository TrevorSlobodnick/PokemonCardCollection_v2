export const SORT_OPTIONS = [
    {value: 1, label: "Default"},
    {value: 2, label: "Newest"},
    {value: 3, label: "Rarity"},
]

export const SEARCH_TYPE_OPTIONS = [
    { "label" : "Name", "value" : "name" },
    { "label" : "Set", "value" : "set" }
]

export const GRADING_COMPANIES = [
    {value: "PSA", label: "PSA (Professional Sports Authenticator)"},
    {value: "BGS", label: "BGS (Beckett Grading Services)"},
    {value: "CGC", label: "CGC (Certified Guaranty Company)"},
]

export const ENDPOINTS = {
    // "cards": "https://tslobodnick.ca/projects/pokemon-card-collection/api/cards/index.php",
    // "sets": "https://tslobodnick.ca/projects/pokemon-card-collection/api/sets/index.php",
    // "login": "https://tslobodnick.ca/projects/pokemon-card-collection/api/auth/login.php",
    // "logout": "https://tslobodnick.ca/projects/pokemon-card-collection/api/auth/logout.php",
    // "register": "https://tslobodnick.ca/projects/pokemon-card-collection/api/auth/register.php"
    "cards": "api/cards/index.php",
    "sets": "/api/sets/index.php",
    "login": "/api/auth/login.php",
    "logout": "/api/auth/logout.php",
    "register": "/api/auth/register.php"
}