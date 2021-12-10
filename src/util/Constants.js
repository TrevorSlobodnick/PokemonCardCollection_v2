export const VALID_SORT_VALUES = [
    "rarity",
    "alpha",
    "price",
    "set",
    "recent"
]
export const VALID_SEARCHTYPE_VALUES = [
    "name",
    "set"
]

export const SORT_OPTIONS = [
    { "label" : "Rarity", "value" : "rarity" },
    { "label" : "A-Z", "value" : "alpha" },
    { "label" : "Price", "value" : "price" },
    { "label" : "Set", "value" : "set" },
    { "label" : "New \u2192 Old", "value" : "newold" },
    { "label" : "Old \u2192 New", "value" : "oldnew" }
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