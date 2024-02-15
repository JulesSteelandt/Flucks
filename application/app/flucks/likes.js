export function formatAbonnements(nbAbonnements) {
    if (nbAbonnements.length >= 10) {
        return "999M";
    } else if (nbAbonnements.length >= 7) {
        return nbAbonnements.substring(0, nbAbonnements.length - 6) + "M";
    } else if (nbAbonnements.length >= 4) {
        return nbAbonnements.substring(0, nbAbonnements.length - 3) + "k";
    } else {
        return nbAbonnements;
    }
}