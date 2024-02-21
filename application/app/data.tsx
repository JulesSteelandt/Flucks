import {API_DIFFUSIONS} from '@/app/utils/appGlobal';

/**
 * retourne les données de tous les streams ou vidéos
 */
export async function fetchDiffusionData() {
  const res = await fetch(API_DIFFUSIONS);
  return await res.json();
}

export async function fetchDiffusionDataWithID(id: string) {
  const res = await fetch(`${API_DIFFUSIONS}/${id}`);
  return await res.json();
}
