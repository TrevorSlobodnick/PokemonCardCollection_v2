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

export const HOST = "https://tslobodnick.ca";
export const PATH = "/projects/pokemon-card-collection";
export const HOMEPAGE = HOST + PATH;

export const ENDPOINTS = {
    "cards": HOMEPAGE + "/api/cards/index.php",
    "sets": HOMEPAGE + "/api/sets/index.php",
    "login": HOMEPAGE + "/api/auth/login.php",
    "logout": HOMEPAGE + "/api/auth/logout.php",
    "register": HOMEPAGE + "/api/auth/register.php"
}