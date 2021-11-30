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

export const VARIANTS = [
    {value: "Holo", label: "Holo"},
    {value: "Reverse Holo", label: "Reverse Holo"},
    {value: "Half Art", label: "Half Art"},
    {value: "Full Art", label: "Full Art"},
    {value: "Secret Rare", label: "Secret Rare"},
    {value: "Rainbow Secret Rare", label: "Rainbow Secret Rare"},
    {value: "Promo", label: "Promo"}
]