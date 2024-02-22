/**
 * retourne les données de tous les streams ou vidéos
 */
export async function fetchDiffusionData() {
  const res = await fetch('http://docketu.iutnc.univ-lorraine.fr:35305/diffusions');
  return await res.json();
}

export async function fetchDiffusionDataWithID(id: string) {
  const res = await fetch(`http://docketu.iutnc.univ-lorraine.fr:35305/diffusions/${id}`);
  return await res.json();
}
