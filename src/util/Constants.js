// Even if this variable is never used, keep it as a reference for all the potential rarity values
export const RARITIES = [
    "common",
    "uncommon",
    "rare",
    "amazing rare",
    "ultra rare",
    "secret rare"
]

export const SORT_OPTIONS = [
    {value: 1, label: "Default"},
    {value: 2, label: "Newest"},
    {value: 3, label: "Rarity (Low)"},
    {value: 4, label: "Rarity (High)"}
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
    "cards": "/api/cards/index.php",
    "sets": "/api/sets/index.php",
    "login": "/api/auth/login.php",
    "logout": "/api/auth/logout.php",
    "register": "/api/auth/register.php"
}