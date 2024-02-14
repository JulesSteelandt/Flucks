/**
 * retourne les données de tous les streams ou vidéos
 */
export async function fetchDiffusionData() {
    const res = await fetch('http://docketu.iutnc.univ-lorraine.fr:35305/diffusions');
    return await res.json();
}

