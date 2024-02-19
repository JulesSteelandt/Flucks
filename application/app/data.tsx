/**
 * retourne les données de tous les streams ou vidéos
 */
export async function fetchDiffusionData() {
    const res = await fetch('http://docketu.iutnc.univ-lorraine.fr:35305/diffusions', {cache: 'no-cache'});
    return await res.json();
}

export async function fetchDiffusionDataWithID(id) {
    const res = await fetch('http://docketu.iutnc.univ-lorraine.fr:35305/diffusions/' + id, {cache: 'no-cache'});
    return await res.json();
}

