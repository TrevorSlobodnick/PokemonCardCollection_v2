export const isEmptyObj = (obj) => {
    if(Object.keys(obj).length === 0){
        return true
    }
    else{
        return false
    }
}

export const getCardId = (setId, number) => {
    return setId + "-" + number;
}

/**
 * Determines the numeric value of a given rarity
 * @param {string} rarity - the rarity as a string
 */
export const rarityToInt = (rarity) => {
    const lRarity = rarity.toLowerCase();
    switch (lRarity) {
        case "common":
            return 1;
        case "uncommon":
            return 2;
        case "rare":
            return 3;
        case "amazing rare":
            return 4;
        case "ultra rare":
            return 5;
        case "secret rare":
            return 6;
        default:
            console.log(lRarity);
            throw new Error("Unknown Rarity");
    }
}